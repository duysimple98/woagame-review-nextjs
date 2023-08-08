import Heading from '@/components/Heading'
import PaginationBar from '@/components/PaginationBar'
import SearchBox from '@/components/SearchBox'
import { getListReviews, getSlugs } from '@/lib/reviews'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface ReviewsPageProps {
	searchParams: { page: string }
}

const PAGE_SIZE = 6

export async function generateMetadata({ searchParams }: ReviewsPageProps): Promise<Metadata> {
	const page = parseParams(searchParams.page)
	if (page <= 1) {
		return {
			title: 'Review',
		}
	}
	return {
		title: 'Review - page ' + page,
	}
}

const ReviewsPage = async ({ searchParams }: ReviewsPageProps) => {
	const page = parseParams(searchParams.page)

	const { reviews, pageCount } = await getListReviews(PAGE_SIZE, page)
	// const searchableReviews = await getSearchableReviews()

	return (
		<>
			<Heading>Reviews Page</Heading>
			<div className="flex justify-between pb-3">
				<PaginationBar page={page} pageCount={pageCount} href="/reviews" />
				<SearchBox />
			</div>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review, index) => (
					<li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl">
						<Link href={`/reviews/${review.slug}`}>
							<Image
								src={review.image}
								priority={index === 0}
								width={320}
								height={180}
								alt=""
								className="mb-2 rounded-t"
							/>
							<h2 className="font-orbitron font-semibold py-1 text-center">{review.title}</h2>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default ReviewsPage

function parseParams(paramValue: string): number {
	if (paramValue) {
		const page = parseInt(paramValue)
		if (isFinite(page) && page > 0) {
			return page
		}
	}
	return 1
}
