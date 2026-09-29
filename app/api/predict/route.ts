import { NextResponse } from 'next/server';

const DRAGONEYE_API_KEY = process.env.NEXT_PUBLIC_DRAGONEYE_API_KEY;
const MODEL_NAME = 'dragoneye/animals';
const API_ENDPOINT = 'https://api.dragoneye.ai/predict';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request) {
  try {
    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Check if it's a preflight request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers });
    }

    const formData = await request.formData();
    const imageFile = formData.get('image_file');
    
    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400, headers }
      );
    }

    // Create new FormData with correct field names
    const apiFormData = new FormData();
    apiFormData.append('model_name', MODEL_NAME);
    apiFormData.append('image_file', imageFile);
    
    // Forward the request to DragonEye API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DRAGONEYE_API_KEY}`,
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DragonEye API error:', errorText);
      throw new Error(`DragonEye API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
} 