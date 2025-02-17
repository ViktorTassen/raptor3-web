// app/api/market-value/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Vehicle {
  year: string;
  make: string;
  model: string;
  trim: string;
}

interface MarketValue {
  below: string;
  average: string;
  above: string;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const API_KEY = process.env.VINAUDIT_API_KEY;
    
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

    // Create ID string
    const id = [
      year,
      make.toLowerCase().replace(/\s/g, '_'),
      model.toLowerCase().replace(/\s/g, '_').replace(/-/g, ''),
      (trim || '').toLowerCase().replace(/\s/g, '_').replace(/-/g, '')
    ].filter(Boolean).join('_');

    // Make API request
    const url = `https://marketvalues.vinaudit.com/getmarketvalue.php?key=${API_KEY}&id=${id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch market value' },
        { status: response.status }
      );
    }

    if (data.success && data.prices) {
      const marketValue: MarketValue = {
        below: data.prices.below.toFixed(0),
        average: data.prices.average.toFixed(0),
        above: data.prices.above.toFixed(0)
      };
      return NextResponse.json(marketValue);
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