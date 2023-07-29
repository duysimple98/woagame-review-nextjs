'use client'
import React, { useState } from 'react'

const ShareLinkButton = () => {
	const [clicked, setClicked] = useState(false)
	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href)
		setClicked(true)
		setTimeout(() => setClicked(false), 1500)
	}
	return (
		<button
			onClick={handleClick}
			className="border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-4 h-4"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
				/>
			</svg>

			{clicked ? 'Link copied!' : 'Share Link'}
		</button>
	)
}

export default ShareLinkButton
