'use client';

import { ModeToggle } from '@/components/mode-toggle';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';
import { ComponentPreview } from '@/components/component-preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/code-block';
import { Terminal } from 'lucide-react';
import { useState } from 'react';
import { codeExamples } from '@/components/code-examples';

export default function Home() {
	const [apiProgress, setApiProgress] = useState(0);

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

	// Simulation of multiple API requests with random delays and failures.
	const simulateApiRequestsProgress = async (shouldFail = false) => {
		setApiProgress(0);
		const totalRequests = 7;
		let completedRequests = 0;

		const failingRequestId = shouldFail ? Math.floor(Math.random() * totalRequests) + 1 : 0;

		const simulateApiRequest = (id: number) =>
			new Promise<void>((resolve, reject) => {
				const delay = Math.floor(Math.random() * 4000) + 1000;

				setTimeout(() => {
					if (failingRequestId === id) {
						console.log(`Request ${id} failed after ${delay}ms`);
						reject(new Error(`Request ${id} failed`));
					} else {
						console.log(`Request ${id} completed in ${delay}ms`);
						completedRequests++;
						setApiProgress(Math.floor((completedRequests / totalRequests) * 100));
						resolve();
					}
				}, delay);
			});

		await Promise.all(Array.from({ length: totalRequests }, (_, i) => simulateApiRequest(i + 1)));
		setApiProgress(100);
		console.log('All simulated API requests completed');
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
				<main className="flex flex-1 flex-col gap-6">
					<ComponentPreview
						preview={
							<StatefulButton
								onClick={async () => {
									console.log('onClick: clicked');
									await loadingSuccessTest();
								}}
								onComplete={() => console.log('onComplete: completed')}
								onError={(error) => console.error(error)}
							>
								Load
							</StatefulButton>
						}
						code={codeExamples.statefulButtonDemo}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								buttonType="progress"
								progress={apiProgress}
								onClick={async () => {
									console.log('onClick: clicked');
									await simulateApiRequestsProgress();
								}}
								onComplete={() => console.log('onComplete: completed')}
								onError={(error) => console.error(error)}
							>
								Progress
							</StatefulButton>
						}
						code={codeExamples.statefulButtonProgressDemo}
					/>

					<h2 className="mt-12 text-2xl font-medium tracking-tight">Installation</h2>
					<Tabs defaultValue="npm">
						<TabsList>
							<TabsTrigger value="icon" disabled>
								<div className="rounded-[1px] bg-foreground text-background">
									<Terminal className="m-0.5 size-3.5" />
								</div>
							</TabsTrigger>
							<TabsTrigger value="pnpm">pnpm</TabsTrigger>
							<TabsTrigger value="npm">npm</TabsTrigger>
							<TabsTrigger value="yarn">yarn</TabsTrigger>
							<TabsTrigger value="bun">bun</TabsTrigger>
						</TabsList>
						<TabsContent value="pnpm">
							<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
								{`pnpm dlx shadcn@latest add http://localhost:3000/r/stateful-button.json`}
							</CodeBlock>
						</TabsContent>
						<TabsContent value="npm">
							<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
								{`npx shadcn@latest add http://localhost:3000/r/stateful-button.json`}
							</CodeBlock>
						</TabsContent>
						<TabsContent value="yarn">
							<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
								{`yarn shadcn@latest add http://localhost:3000/r/stateful-button.json`}
							</CodeBlock>
						</TabsContent>
						<TabsContent value="bun">
							<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
								{`bunx --bun shadcn@latest add http://localhost:3000/r/stateful-button.json`}
							</CodeBlock>
						</TabsContent>
					</Tabs>

					<h2 className="mt-12 text-2xl font-medium tracking-tight">Usage</h2>
					<CodeBlock lang="tsx" textSize={14} showLineNumbers={false}>
						{`import StatefulButton from '@/components/ui/stateful-button';`}
					</CodeBlock>
					<CodeBlock lang="tsx" textSize={14} showLineNumbers={false}>
						{`<StatefulButton onClick={loading}>Button</StatefulButton>`}
					</CodeBlock>

					<h2 className="mt-12 text-2xl font-medium tracking-tight">Examples</h2>
					<h3 className="mt-4 text-xl font-semibold tracking-tight">Default</h3>
					<p className="leading-relaxed">
						The stateful button automatically handles success and error states based on the outcome of the{' '}
						<code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] outline-none">
							onClick
						</code>{' '}
						event. If the promise resolves, the button enters a success state; if it rejects, it enters an error state.
						The "Default" variant examples below demonstrate both scenarios.
					</p>

					<ComponentPreview
						preview={
							<StatefulButton
								onClick={loadingSuccessTest}
								onComplete={() => console.log('onComplete: completed')}
								onError={(error) => console.error(error)}
							>
								Load
							</StatefulButton>
						}
						code={codeExamples.statefulButtonDefaultSuccess}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								onClick={loadingFailedTest}
								onComplete={() => console.log('onComplete: completed')}
								onError={(error) => console.error(error)}
								className="w-32"
							>
								Load with error
							</StatefulButton>
						}
						code={codeExamples.statefulButtonDefaultError}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								buttonType="progress"
								progress={apiProgress}
								onClick={async () => {
									console.log('onClick: clicked');
									await simulateApiRequestsProgress();
								}}
								onComplete={() => console.log('onComplete: completed')}
								onError={(error) => console.error(error)}
							>
								Progress
							</StatefulButton>
						}
						code={codeExamples.statefulButtonDefaultProgressSuccess}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								buttonType="progress"
								progress={apiProgress}
								onClick={async () => {
									console.log('onClick: clicked');
									await simulateApiRequestsProgress(true);
								}}
								onComplete={() => console.log('onComplete: completed')}
								onError={(error) => console.error(error)}
								className="w-38"
							>
								Progress with error
							</StatefulButton>
						}
						code={codeExamples.statefulButtonDefaultProgressError}
					/>

					<h3 className="mt-4 text-xl font-semibold tracking-tight">Secondary</h3>
				</main>
			</div>
		</>
	);
}
