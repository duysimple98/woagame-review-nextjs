import NavBar from '@/components/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { exo2, orbitron } from './fonts'

export const metadata: Metadata = {
	title: { default: 'Woa Gamer', template: '%s | Woa Gamer' },
	description: 'Only the best games, reviewed for you.',
	icons: {
		icon: '/favicon_1.ico',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
			<body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen" cz-shortcut-listen="true">
				<header>
					<NavBar />
				</header>
				<main className="grow py-3">{children}</main>
				<footer className="border-t py-3 text-center text-slate-500 text-xs">
					Game data and images courtesy of{' '}
					<a href="https://rawg.io/" target="_blank" className="text-orange-800 hover:underline">
						RAWG
					</a>
				</footer>
			</body>
		</html>
	)
}
