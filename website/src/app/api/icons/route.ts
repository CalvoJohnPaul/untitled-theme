import {PaginatedOptionsDefinition} from '@/definitions';
import {getIcons} from '@/utils/getIcons';
import {searchParamsToObject} from '@/utils/searchParamsToObject';
import {type NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
	const search = searchParamsToObject(request.nextUrl.searchParams);
	const icons = await getIcons(PaginatedOptionsDefinition.parse(search));
	return NextResponse.json(icons);
}
