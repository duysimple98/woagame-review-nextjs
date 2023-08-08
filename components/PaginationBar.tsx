import Link from 'next/link'
import React from 'react'

export interface PaginationBarProps {
	href: string
	page: number
	pageCount: number
}

const PaginationBar = ({ page, pageCount, href }: PaginationBarProps) => {
	return (
		<div className="flex gap-2 items-center">
			<PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-5 h-5"
				>
					<path
						fillRule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clipRule="evenodd"
					/>
				</svg>
				<span className="sr-only">Previous Page</span>
			</PaginationLink>
			<span>
				Page {page} of {pageCount}
			</span>
			<PaginationLink href={`${href}?page=${page + 1}`} enabled={page < pageCount}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-5 h-5"
				>
					<path
						fillRule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clipRule="evenodd"
					/>
				</svg>
				<span className="sr-only">Next Page</span>
			</PaginationLink>
		</div>
	)
}

export default PaginationBar

interface PaginationLinkProps {
	children: React.ReactNode
	enabled: boolean
	href: string
}

function PaginationLink({ children, href, enabled }: PaginationLinkProps) {
	if (!enabled) {
		return <span className="border cursor-not-allowed text-slate-300 text-sm">{children}</span>
	}
	return (
		<Link
			href={href}
			className="border rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
		>
			{children}
		</Link>
	)
}
