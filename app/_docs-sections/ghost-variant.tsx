import { useState } from 'react';
import { codeExamples } from '@/app/_code-examples';
import { ComponentPreview } from '@/components/component-preview';
import { loadingSuccessTest, simulateApiRequestsProgress } from '@/lib/api-simulation';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';

export default function GhostVariant() {
	const [apiProgress, setApiProgress] = useState(0);

	return (
		<>
			<h3 className="mt-4 text-xl font-semibold tracking-tight">Ghost</h3>

			<ComponentPreview
				preview={
					<StatefulButton
						onClick={loadingSuccessTest}
						onComplete={() => console.log('onComplete: completed')}
						onError={(error) => console.error(error)}
						variant="ghost"
					>
						Load
					</StatefulButton>
				}
				code={codeExamples.statefulButtonGhostSuccess}
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
						variant="ghost"
					>
						Progress
					</StatefulButton>
				}
				code={codeExamples.statefulButtonGhostProgressSuccess}
			/>
		</>
	);
}
