export const statefulButtonDefaultError = `import StatefulButton from '@/components/ui/stateful-button';

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
}`;
