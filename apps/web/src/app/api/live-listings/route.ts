import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveListings } from '@/lib/live-rental-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const city = params.get('city') ?? undefined;
  const province = params.get('province') ?? undefined;
  const limit = Number(params.get('limit') ?? '36');
  const maxPrice = Number(params.get('maxPrice') ?? '0');
  const minBedrooms = Number(params.get('minBedrooms') ?? '-1');

  const { listings, sourceSummary } = await fetchLiveListings({
    city,
    province,
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 120) : 36,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    minBedrooms: Number.isFinite(minBedrooms) && minBedrooms >= 0 ? minBedrooms : undefined,
  });

  return NextResponse.json({
    listings,
    sourceSummary,
    generatedAt: new Date().toISOString(),
  });
}
