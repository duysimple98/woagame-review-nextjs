import Heading from '@/components/Heading'
import ShareButtons from '@/components/ShareButtons'
import { getReview, getSlugs } from '@/lib/reviews'
import { Metadata } from 'next'
import React from 'react'

interface ReviewPageParams {
	slug: string
}

interface ReviewPageProps {
	params: ReviewPageParams
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
	const slugs = await getSlugs()
	return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
	const review = await getReview(slug)
	return {
		title: review.title,
	}
}

const ReviewPage = async ({ params: { slug } }: ReviewPageProps) => {
	const review = await getReview(slug)

	return (
		<div>
			<Heading>{review.title}</Heading>
			<div className="flex gap-3 items-baseline">
				<p className="italic pb-2">{review.date}</p>
				<ShareButtons />
			</div>
			<img src={review.image} width={640} height={360} alt="" className="mb-2 rounded" />
			<article
				dangerouslySetInnerHTML={{ __html: review.body }}
				className="max-w-screen-sm prose prose-slate"
			/>
		</div>
	)
}

export default ReviewPage
