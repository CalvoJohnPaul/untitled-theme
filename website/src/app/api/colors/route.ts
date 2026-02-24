import {PaginatedOptionsDefinition} from '@/definitions';
import {getColors} from '@/utils/getColors';
import {searchParamsToObject} from '@/utils/searchParamsToObject';
import {type NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
	const search = searchParamsToObject(request.nextUrl.searchParams);
	const colors = await getColors(PaginatedOptionsDefinition.parse(search));
	return NextResponse.json(colors);
}
