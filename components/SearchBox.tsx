'use client'
import { useIsClient } from '@/lib/hooks'
import { SearchableReview, searchReviews } from '@/lib/reviews'
import { Combobox } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface SearchBoxProps {
	reviews: SearchableReview[]
}

export default function SearchBox() {
	const router = useRouter()
	const isClient = useIsClient()
	const [query, setQuery] = useState('')
	const [reviews, setReviews] = useState<SearchableReview[]>([])

	useEffect(() => {
		if (query.length > 1) {
			;(async () => {
				const reviews = await searchReviews(query)
				setReviews(reviews)
			})()
		} else {
			setReviews([])
		}
	}, [query])

	const handleChange = (review: SearchableReview) => {
		router.push(`/reviews/${review.slug}`)
	}

	if (!isClient) {
		return <input type="text" placeholder="Search..." />
	}

	// const filtered = reviews
	// 	.filter((review) => review.title.toLowerCase().includes(query.toLowerCase()))
	// 	.slice(0, 5)

	return (
		<div className="relative w-48">
			<Combobox onChange={handleChange}>
				<Combobox.Input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
					className="border px-2 py-1 rounded w-full"
				/>
				<Combobox.Options className="absolute bg-white py-1">
					{reviews.map((review) => (
						<Combobox.Option value={review} key={review.slug}>
							{({ active }) => (
								<span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>
									{review.title}
								</span>
							)}
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox>
		</div>
	)
}
