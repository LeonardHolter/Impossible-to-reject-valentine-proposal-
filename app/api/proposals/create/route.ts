import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderName, crushName } = body;

    if (!senderName || !crushName) {
      return NextResponse.json(
        { error: 'Sender name and crush name are required' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const id = nanoid(10);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('proposals')
      .insert({
        id,
        sender_name: senderName,
        crush_name: crushName,
        response: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create proposal' },
        { status: 500 }
      );
    }

    return NextResponse.json({ proposal: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
