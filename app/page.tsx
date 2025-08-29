'use client';

import { ModeToggle } from '@/components/mode-toggle';
import Intro from '@/app/_docs-sections/intro';
import Demo from '@/app/_docs-sections/demo';
import Installation from '@/app/_docs-sections/installation';
import Usage from '@/app/_docs-sections/usage';
import DefaultVariant from '@/app/_docs-sections/default-variant';

export default function Home() {
	return (
		<>
			<div className="fixed bottom-4 left-4">
				<ModeToggle />
			</div>
			<div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
				<Intro />
				<main className="flex flex-1 flex-col gap-6">
					<Demo />
					<Installation />
					<Usage />

					<h2 className="mt-12 text-2xl font-medium tracking-tight">Examples</h2>
					<DefaultVariant />
					<h3 className="mt-4 text-xl font-semibold tracking-tight">Secondary</h3>
				</main>
			</div>
		</>
	);
}
