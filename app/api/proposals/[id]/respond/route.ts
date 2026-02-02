import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { response } = body;

    if (!response || !['yes', 'no'].includes(response)) {
      return NextResponse.json(
        { error: 'Invalid response. Must be "yes" or "no"' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('proposals')
      .update({
        response,
        responded_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update proposal' },
        { status: 500 }
      );
    }

    return NextResponse.json({ proposal: data });
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
