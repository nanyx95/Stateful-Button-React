import { useState } from 'react';
import { codeExamples } from '@/app/_code-examples';
import { ComponentPreview } from '@/components/component-preview';
import { loadingSuccessTest, simulateApiRequestsProgress } from '@/lib/api-simulation';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';

export default function Demo() {
	const [apiProgress, setApiProgress] = useState(0);

	return (
		<>
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
							await simulateApiRequestsProgress(setApiProgress);
						}}
						onComplete={() => console.log('onComplete: completed')}
						onError={(error) => console.error(error)}
					>
						Progress
					</StatefulButton>
				}
				code={codeExamples.statefulButtonProgressDemo}
			/>
		</>
	);
}
