import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First get the model to check if it exists and get the image path
    const { data: model, error: modelError } = await supabase
      .from('ai_models')
      .select('id')
      .eq('id', params.id)
      .single();

    if (modelError || !model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }

    // Get the image from storage
    const { data: imageData, error: storageError } = await supabase
      .storage
      .from('model-images')
      .download(`${model.id}.jpg`);

    if (storageError) {
      // If no custom image exists, return a placeholder
      return NextResponse.redirect(new URL('/images/model-placeholder.jpg', request.url));
    }

    // Convert the image data to a blob and return it
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

    return new NextResponse(imageData, {
      headers,
    });
  } catch (error) {
    console.error('Error fetching model image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 