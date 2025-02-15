import { NextRequest, NextResponse } from 'next/server';

interface OAuthTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const now = Math.floor(Date.now() / 1000);

  try {
    const body = await request.json();

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: body.refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      }),
    });

    if (response.ok) {
      const { 
        access_token: accessToken, 
        expires_in: expiresIn 
      } = (await response.json()) as OAuthTokenResponse;

      return NextResponse.json({
        accessToken,
        expiresAt: now + expiresIn,
      });
    }

    // Handle invalid refresh token
    const data = await response.json();
    console.error('Request failed:', data);
    return NextResponse.json(data, { status: 400 });
  } catch (error) {
    console.error('Error with refresh_token request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}