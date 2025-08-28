'use client';

import { ModeToggle } from '@/components/mode-toggle';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';
import useProgress from '@/hooks/use-progress';
import { ComponentPreview } from '@/components/component-preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/code-block';
import { Terminal } from 'lucide-react';

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
				<main className="flex flex-1 flex-col gap-6">
					<ComponentPreview
						preview={
							<StatefulButton
								onClick={async () => {
									console.log('clicked');
									await loadingSuccessTest();
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
							>
								Load
							</StatefulButton>
						}
						code={`import StatefulButton from '@/components/ui/stateful-button';

// dummy success API call
const loadingSuccessTest = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
};

<StatefulButton
  onClick={async () => {
    console.log('clicked');
    await loadingSuccessTest();
  }}
  onComplete={() => console.log('completed')}
  onError={(error) => console.error(error)}
>
  Load
</StatefulButton>`}
					/>

					<ComponentPreview
						preview={
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
						}
						code={`import StatefulButton from '@/components/ui/stateful-button';

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
</StatefulButton>`}
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
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
							>
								Load
							</StatefulButton>
						}
						code={`import StatefulButton from '@/components/ui/stateful-button';

// dummy success API call
const loadingSuccessTest = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
};

<StatefulButton
  onClick={async () => {
    console.log('clicked');
    await loadingSuccessTest();
  }}
  onComplete={() => console.log('completed')}
  onError={(error) => console.error(error)}
>
  Load
</StatefulButton>`}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								onClick={loadingFailedTest}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
								className="w-32"
							>
								Load with error
							</StatefulButton>
						}
						code={`import StatefulButton from '@/components/ui/stateful-button';

// dummy failed API call
const loadingFailedTest = () => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Error from dummy API call')), 4000);
  });
};

<StatefulButton
  onClick={loadingFailedTest}
  onComplete={() => console.log('completed')}
  onError={(error) => console.error(error)}
  className="w-32"
>
  Load with error
</StatefulButton>`}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								buttonType="progress"
								progress={progress}
								onClick={async () => {
									console.log('clicked');
									await startProgress(3, 100);
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
							>
								Progress
							</StatefulButton>
						}
						code={`import StatefulButton from '@/components/ui/stateful-button';

<StatefulButton
  buttonType="progress"
  progress={progress}
  onClick={async () => {
    console.log('clicked');
    await startProgress(3, 100);
  }}
  onComplete={() => console.log('completed')}
  onError={(error) => console.error(error)}
>
  Progress
</StatefulButton>`}
					/>

					<ComponentPreview
						preview={
							<StatefulButton
								buttonType="progress"
								progress={progress}
								onClick={async () => {
									console.log('clicked');
									await startProgress(3, 100, (val) => val >= 75, 'Failed at 75%');
								}}
								onComplete={() => console.log('completed')}
								onError={(error) => console.error(error)}
								className="w-38"
							>
								Progress with error
							</StatefulButton>
						}
						code={`import StatefulButton from '@/components/ui/stateful-button';

<StatefulButton
  buttonType="progress"
  progress={progress}
  onClick={async () => {
    console.log('clicked');
    await startProgress(3, 100, (val) => val >= 75, 'Failed at 75%');
  }}
  onComplete={() => console.log('completed')}
  onError={(error) => console.error(error)}
  className="w-38"
>
  Progress with error
</StatefulButton>`}
					/>

					<h3 className="mt-4 text-xl font-semibold tracking-tight">Secondary</h3>

					<div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
						<h2 className="text-sm text-muted-foreground sm:pl-3">
							Stateful Button with progress, success state, and variants
						</h2>
						<div className="relative flex min-h-[400px] items-center justify-center">
							<StatefulButton
								variant="outline"
								size="lg"
								className="w-28"
								buttonType="progress"
								onClick={async () => {
									console.log('clicked');
									await startProgress(7, 100);
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
