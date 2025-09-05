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
		<main className="mx-auto max-w-3xl space-y-18 px-4 pt-2 pb-8">
			<section className="space-y-6">
				<Intro />
				<Demo />
			</section>
			<Installation />
			<Usage />
			<section className="space-y-14">
				<div className="space-y-2">
					<h2 className="text-2xl font-medium tracking-tight">Examples</h2>
					<p className="leading-relaxed text-primary">
						The stateful button automatically handles success and error states based on the outcome of the{' '}
						<code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none">
							onClick
						</code>{' '}
						event. If the promise resolves, the button enters a success state; if it rejects, it enters an error state.
						The "Default" variant examples below demonstrate both scenarios.
					</p>
				</div>
				<DefaultVariant />
				<SecondaryVariant />
				<DestructiveVariant />
				<OutlineVariant />
				<GhostVariant />
			</section>
		</main>
	);
}
