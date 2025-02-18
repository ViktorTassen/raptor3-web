import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGIN = 'chrome-extension://hppldficdejbndpbkdipddeaaeeobfck'; // Replace with your actual extension ID


interface Vehicle {
  year: string;
  make: string;
  model: string;
  trim?: string[];
}

interface MarketValue {
  provider: string,
  listings: any
  price: any;
}

interface AutoDevListing {
  price: string;
  // Add other fields as needed
}

interface AutoDevResponse {
  listings: AutoDevListing[];
}

interface VinAuditPrices {
  average: string;
  below: string;
}

interface VinAuditResponse {
  success: boolean;
  prices: VinAuditPrices;
}

export async function GET(request: NextRequest): Promise<NextResponse> {


  try {
    const DEV_AUTO_API_KEY = process.env.DEV_AUTO_API_KEY;
    const VINAUDIT_API_KEY = process.env.VINAUDIT_API_KEY;
    const AUTO_API_BASE_URL = 'https://auto.dev/api';

    if (!DEV_AUTO_API_KEY || !VINAUDIT_API_KEY) {
      throw new Error('Missing API keys in environment variables');
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const trim = searchParams.get('trim');

    if (!year || !make || !model) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Try Auto.dev API first
    try {
      const marketValue = await getAutoDevMarketValue({
        year,
        make,
        model,
        trim,
        apiKey: DEV_AUTO_API_KEY,
        baseUrl: AUTO_API_BASE_URL
      });
      
      if (marketValue) {
        return NextResponse.json(marketValue);
      }
    } catch (error) {
      console.error('[Server] Auto.dev API error:', error);
      // Continue to fallback if Auto.dev fails
    }

    // Fallback to VinAudit API
    try {
      const marketValue = await getVinAuditMarketValue({
        year,
        make,
        model,
        trim, // VinAudit only accepts single trim
        apiKey: VINAUDIT_API_KEY
      });
      
      if (marketValue) {
        return NextResponse.json(marketValue);
      }
    } catch (error) {
      console.error('[Server] VinAudit API error:', error);
      throw error; // Re-throw if both APIs fail
    }

    return NextResponse.json(
      { error: 'No market value data available' },
      { status: 404 }
    );

  } catch (error) {
    console.error('[Server] Error fetching market value:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function getAutoDevMarketValue({
  year,
  make,
  model,
  trim,
  apiKey,
  baseUrl
}: {
  year: string;
  make: string;
  model: string;
  trim?: string[];
  apiKey: string;
  baseUrl: string;
}): Promise<MarketValue | null> {
  const searchParams = new URLSearchParams({
    apikey: apiKey,
    year_min: year,
    year_max: year,
    make: make,
    model: model
  });

  if (trim) {
    searchParams.append('trim[]', trim)
  }

  console.log('url autodev:', `${baseUrl}/listings?${searchParams.toString()}&sort_filter=price:asc`)

  const response = await fetch(`${baseUrl}/listings?${searchParams.toString()}&sort_filter=price:asc`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Auto.dev API error! status: ${response.status}`);
  }

  const data = await response.json() as AutoDevResponse;
  
  if (!data?.records?.length) {
    return null;
  }
  console.log("data.records.length", data.records.length)

  // Calculate prices from listings
  const prices = data.records
    .map((record: AutoDevListing) => parseInt(record.price.replace(/[^0-9]/g, '')))
    .filter((price: number) => !isNaN(price))
    .sort((a, b) => a - b);

  console.log("prices", prices)
  if (prices.length === 0) {
    return null;
  }

  const averagePrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(0);
  console.log('averagePrice', averagePrice)

  return {
    provider: "records",
    listings: data?.records,
    price: averagePrice
  };
}

async function getVinAuditMarketValue({
  year,
  make,
  model,
  trim,
  apiKey
}: {
  year: string;
  make: string;
  model: string;
  trim?: string;
  apiKey: string;
}): Promise<MarketValue | null> {
  // Create ID string
  const id = [
    year,
    make.toLowerCase().replace(/\s/g, '_'),
    model.toLowerCase().replace(/\s/g, '_').replace(/-/g, ''),
    trim ? trim.toLowerCase().replace(/\s/g, '_').replace(/-/g, '') : ''
  ].filter(Boolean).join('_');

  const url = `https://marketvalues.vinaudit.com/getmarketvalue.php?key=${apiKey}&id=${id}`;
  console.log('url vinaudit:', url)
  const response = await fetch(url);
  const data = await response.json() as VinAuditResponse;

  if (!response.ok) {
    throw new Error(`VinAudit API error! status: ${response.status}`);
  }

  if (!data.success || !data.prices) {
    return null;
  }

  const averagePrice = ((parseInt(data.prices.average) + parseInt(data.prices.below)) / 2).toFixed(0);
  return {
    provider: "aud",
    listings: null,
    price: averagePrice
  };
}



export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');

  if (origin !== ALLOWED_ORIGIN) {
    return NextResponse.json({ error: 'CORS not allowed' }, { status: 403 });
  }

  const response = new NextResponse(null, { status: 200 });

  return response;
}