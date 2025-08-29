'use client';

import { ModeToggle } from '@/components/mode-toggle';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';
import { ComponentPreview } from '@/components/component-preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/code-block';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

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
						code={`import StatefulButton from '@/components/ui/stateful-button';

// Example of a generic API call.
// Replace these with your own fetch, axios, trpc, etc.
const fetchData = async () => {
  const response = await fetch('/api/endpoint');
  if (!response.ok) throw new Error('Request failed');
  return response.json();
};

export default function StatefulButtonDemo() {
  return (
    <StatefulButton
      onClick={async () => {
        // Trigger the API call
        const data = await fetchData();
        // Here you could update state, trigger notifications, or handle data
        console.log('Received data:', data);
      }}
      /* Called when onClick completes successfully */
      onComplete={() => console.log('Operation completed successfully')}
      /* Called if the API call or onClick throws an error */
      onError={(error) => console.error('An error occurred:', error)}
    >
      Load
    </StatefulButton>
  );
}`}
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
						code={`import { useState } from 'react';

import StatefulButton from '@/components/ui/stateful-button';

async function processMultiApiRequests(setProgress: (p: number) => void) {
  const totalApis = 3;
  let completed = 0;

  // Example API calls. Replace these with your own fetch, axios, trpc, etc.
  // You can run them in parallel as shown here or sequentially depending on your workflow.
  const apiCalls = [
    async () => {
      await fetch('/api/endpoint1');
    },
    async () => {
      await fetch('/api/endpoint2');
    },
    async () => {
      await fetch('/api/endpoint3');
    }
  ];

  // Run all APIs in parallel and update progress as each one finishes
  await Promise.all(
    apiCalls.map(async (call) => {
      await call();
      completed++;
      setProgress(Math.floor((completed / totalApis) * 100));
    })
  );

  // Ensure progress ends at 100
  setProgress(100);
}

export function StatefulButtonProgressDemo() {
  const [progress, setProgress] = useState(0);

  return (
    <StatefulButton
      buttonType="progress"
      /* Controlled progress value from 0 to 100 */
      progress={progress}
      /* Triggered when the button is clicked to start async logic */
      onClick={() => processMultiApiRequests(setProgress)}
      /* Called when all async work is done successfully */
      onComplete={() => console.log('All APIs completed')}
      /* Called if any error occurs during async logic */
      onError={(error) => console.error(error)}
    >
      Run APIs
    </StatefulButton>
  );
}`}
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
						code={`import StatefulButton from '@/components/ui/stateful-button';

// dummy success API call
const loadingSuccessTest = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
};

export function StatefulButtonDefaultSuccess() {
  return (
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
  );
}`}
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
						code={`import StatefulButton from '@/components/ui/stateful-button';

// dummy failed API call
const loadingFailedTest = () => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Error from dummy API call')), 4000);
  });
};

export function StatefulButtonDefaultError() {
  return (
    <StatefulButton
      onClick={loadingFailedTest}
      onComplete={() => console.log('onComplete: completed')}
      onError={(error) => console.error(error)}
      className="w-32"
    >
      Load with error
    </StatefulButton>
  );
}`}
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
						code={`import { useState } from 'react';

import StatefulButton from '@/components/ui/stateful-button';

const simulateApiRequestsProgress = async (setProgress: (p: number) => void, shouldFail = false) => {
  // Simulation of multiple API requests with random delays and failures.
  // In a real-world scenario, replace this with your own API calls
  // (parallel, sequential, or whatever fits best).
  setProgress(0);
  const totalRequests = 7;
  let completedRequests = 0;

  const failingRequestId = shouldFail ? Math.floor(Math.random() * totalRequests) + 1 : 0;

  const simulateApiRequest = (id: number) =>
    new Promise<void>((resolve, reject) => {
      const delay = Math.floor(Math.random() * 4000) + 1000;

      setTimeout(() => {
        if (failingRequestId === id) {
          console.log(\`Request \${id} failed after \${delay}ms\`);
          reject(new Error(\`Request \${id} failed\`));
        } else {
          console.log(\`Request \${id} completed in \${delay}ms\`);
          completedRequests++;
          setProgress(Math.floor((completedRequests / totalRequests) * 100));
          resolve();
        }
      }, delay);
    });

  // Runs all simulated API requests in parallel using Promise.all.
  // Other strategies (sequential execution, etc.) may be used instead.
  await Promise.all(Array.from({ length: totalRequests }, (_, i) => simulateApiRequest(i + 1)));
  setProgress(100);
  console.log('All simulated API requests completed');
};

export function StatefulButtonDefaultError() {
  const [apiProgress, setApiProgress] = useState(0);

  return (
    <StatefulButton
      buttonType="progress"
      progress={apiProgress}
      onClick={async () => {
        console.log('onClick: clicked');
        await simulateApiRequestsProgress(setApiProgress);
      }}
      onComplete={() => console.log('onComplete: completed')}
      onError={(error) => console.error(error)}
    >
      Progress
    </StatefulButton>
  );
}`}
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
						code={`import { useState } from 'react';

import StatefulButton from '@/components/ui/stateful-button';

const simulateApiRequestsProgress = async (setProgress: (p: number) => void, shouldFail = false) => {
  // Simulation of multiple API requests with random delays and failures.
  // In a real-world scenario, replace this with your own API calls
  // (parallel, sequential, or whatever fits best).
  setProgress(0);
  const totalRequests = 7;
  let completedRequests = 0;

  const failingRequestId = shouldFail ? Math.floor(Math.random() * totalRequests) + 1 : 0;

  const simulateApiRequest = (id: number) =>
    new Promise<void>((resolve, reject) => {
      const delay = Math.floor(Math.random() * 4000) + 1000;

      setTimeout(() => {
        if (failingRequestId === id) {
          console.log(\`Request \${id} failed after \${delay}ms\`);
          reject(new Error(\`Request \${id} failed\`));
        } else {
          console.log(\`Request \${id} completed in \${delay}ms\`);
          completedRequests++;
          setProgress(Math.floor((completedRequests / totalRequests) * 100));
          resolve();
        }
      }, delay);
    });

  // Runs all simulated API requests in parallel using Promise.all.
  // Other strategies (sequential execution, etc.) may be used instead.
  await Promise.all(Array.from({ length: totalRequests }, (_, i) => simulateApiRequest(i + 1)));
  setProgress(100);
  console.log('All simulated API requests completed');
};

export function StatefulButtonDefaultError() {
  const [apiProgress, setApiProgress] = useState(0);

  return (
    <StatefulButton
      buttonType="progress"
      progress={apiProgress}
      onClick={async () => {
        console.log('onClick: clicked');
        await simulateApiRequestsProgress(setApiProgress, true);
      }}
      onComplete={() => console.log('onComplete: completed')}
      onError={(error) => console.error(error)}
      className="w-38"
    >
      Progress with error
    </StatefulButton>
  );
}`}
					/>

					<h3 className="mt-4 text-xl font-semibold tracking-tight">Secondary</h3>
				</main>
			</div>
		</>
	);
}
