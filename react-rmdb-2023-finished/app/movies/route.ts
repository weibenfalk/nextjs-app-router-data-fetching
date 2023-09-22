import { NextResponse } from 'next/server';
// API Urls
import { SEARCH_BASE_URL, POPULAR_BASE_URL } from '../../config';
// Basic fetch function
import { basicFetch } from '../../api/fetchFunctions';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const endpoint = search ? `${SEARCH_BASE_URL}${search}&page=${page}` : `${POPULAR_BASE_URL}&page=${page}`;

  const data = await basicFetch(endpoint);

  return NextResponse.json(data);
}
