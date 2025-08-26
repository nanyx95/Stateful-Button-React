'use client';

import { ModeToggle } from '@/components/mode-toggle';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';
import useProgress from '@/hooks/use-progress';

export default function Home() {
	const { progress, startProgress } = useProgress();

	// dummy success API call
	const loadingSuccessTest = () => {
		return new Promise((resolve) => {
			setTimeout(resolve, 4000);
		});
	};

	// dummy failed API call
	const loadingFailedTest = () => {
		return new Promise((_, reject) => {
			setTimeout(() => reject(new Error('Error from dummy API call')), 4000);
		});
	};

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
						<h2 className="text-sm text-muted-foreground sm:pl-3">Stateful Button with loading and success state</h2>
						<div className="relative flex min-h-[400px] items-center justify-center">
							<StatefulButton
								buttonType="spinner"
								onClick={async () => {
									console.log('clicked');
									await loadingSuccessTest();
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
							>
								Load
							</StatefulButton>
						</div>
					</div>

					<div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
						<h2 className="text-sm text-muted-foreground sm:pl-3">Stateful Button with loading and error state</h2>
						<div className="relative flex min-h-[400px] items-center justify-center">
							<StatefulButton
								buttonType="spinner"
								onClick={async () => {
									console.log('clicked');
									await loadingFailedTest();
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
							>
								Load
							</StatefulButton>
						</div>
					</div>

					<div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
						<h2 className="text-sm text-muted-foreground sm:pl-3">Stateful Button with progress and success state</h2>
						<div className="relative flex min-h-[400px] items-center justify-center">
							<StatefulButton
								buttonType="progress"
								onClick={async () => {
									console.log('clicked');
									await startProgress(3, 100);
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
								progress={progress}
							>
								Progress
							</StatefulButton>
						</div>
					</div>

					<div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
						<h2 className="text-sm text-muted-foreground sm:pl-3">Stateful Button with progress and error state</h2>
						<div className="relative flex min-h-[400px] items-center justify-center">
							<StatefulButton
								buttonType="progress"
								onClick={async () => {
									console.log('clicked');
									await startProgress(3, 100, () => Math.random() < 0.05);
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
								progress={progress}
							>
								Progress
							</StatefulButton>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
