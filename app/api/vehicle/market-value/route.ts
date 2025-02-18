import { NextRequest, NextResponse } from 'next/server';

interface Vehicle {
  year: string;
  make: string;
  model: string;
  trim?: string[];
}

interface MarketValue {
  price: string;
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
    const trim = searchParams.getAll('trim');

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
        trim: trim[0], // VinAudit only accepts single trim
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

  if (trim?.length) {
    trim.forEach(t => searchParams.append('trim[]', t));
  }

  const response = await fetch(`${baseUrl}/listings?${searchParams}&sort_filter=price:asc`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Auto.dev API error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data?.listings?.length) {
    return null;
  }

  // Calculate prices from listings
  const prices = data.listings
    .map(listing => parseInt(listing.price.replace(/[^0-9]/g, '')))
    .filter(price => !isNaN(price))
    .sort((a, b) => a - b);

  if (prices.length === 0) {
    return null;
  }

  const averagePrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(0);

  return {
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
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`VinAudit API error! status: ${response.status}`);
  }

  if (!data.success || !data.prices) {
    return null;
  }

  const averagePrice = ((parseInt(data.prices.average) + parseInt(data.prices.below)) / 2).toFixed(0);
  return {
    price: averagePrice
  };
}