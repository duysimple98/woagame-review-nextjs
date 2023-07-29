import Heading from '@/components/Heading'
import { getListReviews, getSlugs } from '@/lib/reviews'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
	title: 'Reviews',
}

const ReviewsPage = async () => {
	const reviews = await getListReviews()
	return (
		<>
			<Heading>Reviews Page</Heading>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review) => (
					<li key={review.slug} className="bg-white border rounded shadow w-80 hover:shadow-xl">
						<Link href={`/reviews/${review.slug}`}>
							<img src={review.image} width={320} height={180} alt="" className="mb-2 rounded-t" />
							<h2 className="font-orbitron font-semibold py-1 text-center">{review.title}</h2>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default ReviewsPage
