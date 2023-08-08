import Heading from '@/components/Heading'
import ShareButtons from '@/components/ShareButtons'
import { getReview, getSlugs } from '@/lib/reviews'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

interface ReviewPageParams {
	slug: string
}

interface ReviewPageProps {
	params: ReviewPageParams
}

// export const dynamic = 'force-dynamic'

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
	const slugs = await getSlugs()
	return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
	const review = await getReview(slug)
	if (!review) {
		notFound()
	}
	return {
		title: review.title,
	}
}

const ReviewPage = async ({ params: { slug } }: ReviewPageProps) => {
	const review = await getReview(slug)
	if (!review) {
		notFound()
	}

	return (
		<div>
			<Heading>{review.title}</Heading>
			<p className="font-semibold pb-3">{review.subtitle}</p>
			<div className="flex gap-3 items-baseline">
				<p className="italic pb-2">{review.date}</p>
				<ShareButtons />
			</div>
			<Image src={review.image} priority width={640} height={360} alt="" className="mb-2 rounded" />
			<article
				dangerouslySetInnerHTML={{ __html: review.body }}
				className="max-w-screen-sm prose prose-slate"
			/>
		</div>
	)
}

export default ReviewPage
