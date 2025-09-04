'use client';

import Intro from '@/app/_docs-sections/intro';
import Demo from '@/app/_docs-sections/demo';
import Installation from '@/app/_docs-sections/installation';
import Usage from '@/app/_docs-sections/usage';
import DefaultVariant from '@/app/_docs-sections/default-variant';
import SecondaryVariant from '@/app/_docs-sections/secondary-variant';
import DestructiveVariant from '@/app/_docs-sections/destructive-variant';
import OutlineVariant from '@/app/_docs-sections/outline-variant';
import GhostVariant from '@/app/_docs-sections/ghost-variant';

export default function Home() {
	return (
		<>
			<div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
				<Intro />
				<main className="flex flex-1 flex-col gap-6">
					<Demo />
					<Installation />
					<Usage />

					<h2 className="mt-12 text-2xl font-medium tracking-tight">Examples</h2>
					<DefaultVariant />
					<SecondaryVariant />
					<DestructiveVariant />
					<OutlineVariant />
					<GhostVariant />
				</main>
			</div>
		</>
	);
}
