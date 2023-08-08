import Heading from '@/components/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '404 Not Found',
}

export default function NotFoundPage() {
	return (
		<>
			<Heading>Not Found</Heading>
			<p>Oops, the page you requested only exists in a parallel universe.</p>
		</>
	)
}
