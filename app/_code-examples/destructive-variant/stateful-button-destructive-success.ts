export const statefulButtonDestructiveSuccess = `import StatefulButton from '@/components/ui/stateful-button';

// dummy success API call
const loadingSuccessTest = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
};

export function StatefulButtonDestructiveSuccess() {
  return (
    <StatefulButton
      onClick={async () => {
        console.log('onClick: clicked');
        await loadingSuccessTest();
      }}
      onComplete={() => console.log('onComplete: completed')}
      onError={(error) => console.error(error)}
      variant="destructive"
    >
      Load
    </StatefulButton>
  );
}`;
