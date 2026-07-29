import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const tilesList = data.tiles || data;
    const tile = tilesList.find((t) => t.id === id);

    if (!tile) {
      return NextResponse.json({ error: 'Tile not found' }, { status: 404 });
    }

    return NextResponse.json(tile);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tile details' }, { status: 500 });
  }
}