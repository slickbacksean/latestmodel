import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

console.error('Supabase URL:', supabaseUrl);
console.error('Supabase Key:', supabaseKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: model, error } = await supabase
      .from('ai_models')
      .select('*')
      .eq('id', params.id)
      .single();

    // Log the model ID being queried
    console.log('Fetching model with ID:', params.id);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(model);
  } catch (error) {
    console.error('Error fetching model:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 