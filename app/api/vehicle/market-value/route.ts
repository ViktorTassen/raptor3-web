import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}


const API_CONFIG = {
  AUTO_DEV: {
    ENABLED: true,
    BASE_URL: 'https://auto.dev/api',
    KEY: process.env.DEV_AUTO_API_KEY
  },
  VIN_AUDIT: {
    KEY: process.env.VINAUDIT_API_KEY
  }
};

// Types
interface Vehicle {
  year: string;
  make: string;
  model: string;
  trim?: string | null;
}

interface MarketValue {
  provider: 'records' | 'aud';
  records: AutoDevRecord[] | null;
  price: string;
}

interface AutoDevRecord {
  make: string;
  price: string;
}

interface AutoDevResponse {
  records: AutoDevRecord[];
}

interface VinAuditResponse {
  success: boolean;
  prices?: {
    average: string;
    below: string;
  };
}

// Helper Functions
function createCorsHeaders(origin: string | null) {
  const allowedOrigin = !origin || ALLOWED_ORIGINS.includes(origin) ? '*' : origin;
  
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

function createResponse(data: unknown, status: number, origin: string | null) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: createCorsHeaders(origin)
  });
}

function formatVinAuditId(vehicle: Vehicle): string {
  const { year, make, model, trim } = vehicle;

  const formatPart = (part: string) => {
    return part
      .toLowerCase()
      .replace(/[\s_]+/g, '')
      .replace(/[\s_]/g, '')
      .replace(/-+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const formattedModel = formatPart(model);
  const formattedTrim = trim ? 
    trim
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .trim() : 
    '';

  const parts = [
    year,
    formatPart(make),
    formattedModel,
    formattedTrim
  ].filter(Boolean);

  return parts.join('_');
}

async function getAutoDevMarketValue({
  year,
  make,
  model,
  trim,
  apiKey,
  baseUrl
}: Vehicle & { apiKey: string; baseUrl: string }): Promise<MarketValue | null> {
  const searchParams = new URLSearchParams({
    apikey: apiKey,
    year_min: year,
    year_max: year,
    make,
    model,
    sort_filter: 'price:asc'
  });

  if (trim) {
    searchParams.append('trim[]', trim);
  }

  const url = `${baseUrl}/listings?${searchParams.toString()}`;
  console.log('Auto.dev URL:', url);

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Auto.dev API error: ${response.status}`);
  }

  const data = await response.json() as AutoDevResponse;
  
  if (!data?.records?.length) {
    return null;
  }

  if (data.records[0].make !== make) {
    return null;
  }

  const prices = data.records
    .map((record: AutoDevRecord) => parseInt(record.price.replace(/[^0-9]/g, '')))
    .filter((price: number) => !isNaN(price));

  if (prices.length === 0) {
    return null;
  }

  const averagePrice = (prices.reduce((a: number, b: number) => a + b, 0) / prices.length).toFixed(0);

  return {
    provider: 'records',
    records: data.records,
    price: averagePrice
  };
}

async function getVinAuditMarketValue({
  year,
  make,
  model,
  trim,
  apiKey
}: Vehicle & { apiKey: string }): Promise<MarketValue | null> {
  const id = formatVinAuditId({ year, make, model, trim });
  console.log('VinAudit ID:', id);

  const url = `https://marketvalues.vinaudit.com/getmarketvalue.php?key=${apiKey}&id=${id}`;
  console.log('VinAudit URL:', url);

  const response = await fetch(url);
  const data = await response.json() as VinAuditResponse;

  if (!response.ok) {
    throw new Error(`VinAudit API error: ${response.status}`);
  }

  if (!data.success || !data.prices) {
    return null;
  }

  const averagePrice = ((parseInt(data.prices.average) + parseInt(data.prices.below)) / 2).toFixed(0);
  
  return {
    provider: 'aud',
    records: null,
    price: averagePrice
  };
}

// Main API Handler
export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get('origin');
  const authHeader = request.headers.get('authorization');
  

  // Verify Firebase Auth token
  if (!authHeader?.startsWith('Bearer ')) {
    return createResponse({ error: 'Missing authorization token' }, 401, origin);
  }

  try {
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    if (!decodedToken.uid) {
      return createResponse({ error: 'Invalid authorization token' }, 401, origin);
    }

    // Get and validate query parameters
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const trim = searchParams.get('trim');

    if (!year || !make || !model) {
      return createResponse({ error: 'Missing required parameters' }, 400, origin);
    }

    // Try Auto.dev API only if enabled
    if (API_CONFIG.AUTO_DEV.ENABLED) {
      try {
        const marketValue = await getAutoDevMarketValue({
          year,
          make,
          model,
          trim,
          apiKey: API_CONFIG.AUTO_DEV.KEY,
          baseUrl: API_CONFIG.AUTO_DEV.BASE_URL
        });
        
        if (marketValue) {
          return createResponse(marketValue, 200, origin);
        }

        if (trim) {
          const marketValueWithoutTrim = await getAutoDevMarketValue({
            year,
            make,
            model,
            apiKey: API_CONFIG.AUTO_DEV.KEY,
            baseUrl: API_CONFIG.AUTO_DEV.BASE_URL
          });

          if (marketValueWithoutTrim) {
            return createResponse(marketValueWithoutTrim, 200, origin);
          }
        }
      } catch (error) {
        console.error('[Server] Auto.dev API error:', error);
      }
    }

    // Use VinAudit API
    try {
      const marketValue = await getVinAuditMarketValue({
        year,
        make,
        model,
        trim,
        apiKey: API_CONFIG.VIN_AUDIT.KEY
      });
      
      if (marketValue) {
        return createResponse(marketValue, 200, origin);
      }
    } catch (error) {
      console.error('[Server] VinAudit API error:', error);
      throw error;
    }

    return createResponse({ error: 'No market value data available' }, 404, origin);
  } catch (error) {
    console.error('[Server] Error:', error);
    return createResponse(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      500,
      origin
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  // For Chrome extensions, we'll skip origin validation if origin is null
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...createCorsHeaders(origin),
      'Access-Control-Max-Age': '86400'
    }
  });
}