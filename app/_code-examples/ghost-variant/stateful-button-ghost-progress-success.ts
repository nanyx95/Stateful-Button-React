export const statefulButtonGhostProgressSuccess = `import { useState } from 'react';

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

export function StatefulButtonGhostProgressSuccess() {
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
      variant="ghost"
    >
      Progress
    </StatefulButton>
  );
}`;
