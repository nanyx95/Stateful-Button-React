export const statefulButtonProgressDemo = `import { useState } from 'react';

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
}`;
