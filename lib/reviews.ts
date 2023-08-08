import { marked } from 'marked'
import qs from 'qs'

export const CACHE_TAG_REVIEWS = 'reviews'

const CMS_URL = 'http://localhost:1337'

interface CmsItem {
	id: number
	attributes: any
}

export interface Review {
	slug: string
	title: string
	subtitle: string
	date: string
	image: string
}

export interface FullReview extends Review {
	body: string
}

export interface PaginatedReviews {
	pageCount: number
	reviews: Review[]
}

export type SearchableReview = Pick<Review, 'slug' | 'title'>

export async function getReview(slug: string): Promise<FullReview | null> {
	const { data } = await fetchListReviews({
		filters: { slug: { $eq: slug } },
		fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
		populate: { image: { fields: ['url'] } },
		pagination: { pageSize: 1, withCount: false },
	})
	if (data.length === 0) {
		return null
	}
	const item = data[0]
	return {
		...toReview(item),
		body: marked(item.attributes.body, { headerIds: false, mangle: false }),
	}
}

export async function getListReviews(pageSize: number, page?: number): Promise<PaginatedReviews> {
	const { data, meta } = await fetchListReviews({
		fields: ['slug', 'title', 'subtitle', 'publishedAt'],
		populate: { image: { fields: ['url'] } },
		sort: ['publishedAt:desc'],
		pagination: { pageSize, page },
	})
	return { pageCount: meta.pagination.pageCount, reviews: data.map(toReview) }
}

export async function searchReviews(query: string): Promise<SearchableReview[]> {
	const { data } = await fetchListReviews({
		filters: { title: { $containsi: query } },
		fields: ['slug', 'title'],
		sort: ['title'],
		pagination: { pageSize: 5 },
	})
	return data.map(({ attributes }: { attributes: any }) => ({
		slug: attributes.slug,
		title: attributes.title,
	}))
}

export async function getSlugs() {
	const { data } = await fetchListReviews({
		fields: ['slug'],
		sort: ['publishedAt:desc'],
		pagination: { pageSize: 100 },
	})
	return data.map((item: CmsItem) => item.attributes.slug)
}

async function fetchListReviews(parameters: any) {
	const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true })
	console.log('getListReviews:', url)
	const response = await fetch(url, {
		next: {
			tags: [CACHE_TAG_REVIEWS],
			// revalidate: 30,
		},
	})
	if (!response.ok) {
		throw new Error(`CMS returned ${response.status} for ${url}`)
	}
	return await response.json()
}

function toReview(item: CmsItem) {
	const { attributes } = item
	return {
		slug: attributes.slug,
		title: attributes.title,
		subtitle: attributes.subtitle,
		date: attributes.publishedAt.slice(0, 'dd-mm-yyyy'.length),
		image: CMS_URL + attributes.image.data.attributes.url,
	}
}
