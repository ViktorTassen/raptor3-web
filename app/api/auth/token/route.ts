import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

interface OAuthTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

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

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const now = Math.floor(Date.now() / 1000);

  try {
    const body = await request.json();

    // If uid is provided, generate a custom token for extension auth
    if (body.uid) {
      try {
        const auth = getAuth();
        const customToken = await auth.createCustomToken(body.uid);
        return NextResponse.json({ customToken });
      } catch (error) {
        console.error('Error creating custom token:', error);
        return NextResponse.json(
          { error: 'Failed to create custom token' },
          { status: 500 }
        );
      }
    }

    // Handle regular OAuth code exchange
    if (!body.code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: body.code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (response.ok) {
      const {
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken,
      } = (await response.json()) as OAuthTokenResponse;

      return NextResponse.json({
        accessToken,
        expiresAt: now + expiresIn,
        refreshToken,
      });
    }

    const data = await response.json();
    console.error('Request failed:', data);
    return NextResponse.json(data, { status: 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}