import Heading from '@/components/Heading'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'About',
}

type Props = {}

const AboutPage = (props: Props) => {
	return (
		<>
			<Heading>About Page</Heading>
		</>
	)
}

export default AboutPage
