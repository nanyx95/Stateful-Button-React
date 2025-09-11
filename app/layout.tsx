import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { GithubButton } from '@/components/github-button';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Stateful Button React',
	description:
		'A shadcn/ui button component that provides clear visual feedback with full accessibility support for any asynchronous action.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute="class" disableTransitionOnChange>
					<header>
						<div className="mx-auto max-w-3xl px-4 py-6">
							<div className="flex h-5 items-center justify-end gap-x-2">
								<GithubButton />
								<Separator orientation="vertical" />
								<ModeToggle />
							</div>
						</div>
					</header>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
