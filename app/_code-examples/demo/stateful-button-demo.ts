export const statefulButtonDemo = `import { StatefulButton } from '@/components/ui/stateful-button';

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
}`;
