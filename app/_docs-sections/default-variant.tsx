import { useState } from 'react';
import { codeExamples } from '@/app/_code-examples';
import { ComponentPreview } from '@/components/component-preview';
import { loadingSuccessTest, loadingFailedTest, simulateApiRequestsProgress } from '@/lib/api-simulation';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';

export default function DefaultVariant() {
	const [apiProgress, setApiProgress] = useState(0);

	return (
		<section className="space-y-6">
			<h3 className="text-xl font-semibold tracking-tight">Default</h3>

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
							await simulateApiRequestsProgress(setApiProgress);
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
							await simulateApiRequestsProgress(setApiProgress, true);
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
		</section>
	);
}
