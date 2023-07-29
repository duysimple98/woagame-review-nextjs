import Heading from '@/components/Heading'
import { getFeaturedReview } from '@/lib/reviews'
import Link from 'next/link'

export default async function Home() {
	const review = await getFeaturedReview()
	return (
		<>
			<Heading>Woa Gamer</Heading>
			<p className="pb-3">Only the best games, reviewed for you</p>
			<div className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full">
				<Link href={`/reviews/${review.slug}`} className="flex flex-col sm:flex-row">
					<img
						src={review.image}
						width={320}
						height={180}
						alt=""
						className="rounded-t sm:rounded-l sm:rounded-r-none"
					/>
					<h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">{review.title}</h2>
				</Link>
			</div>
		</>
	)
}
