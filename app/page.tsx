import { ModeToggle } from '@/components/mode-toggle';
import { StatefulButton } from '@/registry/new-york/ui/stateful-button/stateful-button';

export default function Home() {
	return (
		<>
			<div className="fixed bottom-4 left-4">
				<ModeToggle />
			</div>
			<div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
				<header className="flex flex-col gap-1">
					<h1 className="text-3xl font-bold tracking-tight">Stateful Button for React</h1>
					<p className="text-muted-foreground">
						A button that can be in different states, such as idle, loading/progress, success, and error. It is useful
						for providing feedback to the user after an action has been performed.
					</p>
				</header>
				<main className="flex flex-1 flex-col gap-8">
					<div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
						<h2 className="text-sm text-muted-foreground sm:pl-3">A simple Stateful Button component</h2>
						<div className="relative flex min-h-[400px] items-center justify-center">
							<StatefulButton></StatefulButton>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
