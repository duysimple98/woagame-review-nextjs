import Link from 'next/link'
import React from 'react'

const NavBar = () => {
	return (
		<nav className="pl-4">
			<ul className="flex gap-2">
				<li>
					<Link className="font-orbitron font-bold text-orange-800 hover:underline" href="/">
						Woa Game
					</Link>
				</li>
				<li className="ml-auto">
					<Link href="/about" className="text-orange-800 hover:underline">
						About
					</Link>
				</li>
				<li>
					<Link href="/reviews" className="text-orange-800 hover:underline">
						Reviews
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
