import { useState } from 'react';
import { codeExamples } from '@/app/_code-examples';
import { ComponentPreview } from '@/components/component-preview';
import { loadingSuccessTest, simulateApiRequestsProgress } from '@/lib/api-simulation';
import { StatefulButton } from '@/registry/new-york/ui/stateful-button/stateful-button';

export default function SecondaryVariant() {
	const [apiProgress, setApiProgress] = useState(0);

	return (
		<section className="space-y-6">
			<h3 className="text-xl font-semibold tracking-tight">Secondary</h3>

			<ComponentPreview
				preview={
					<StatefulButton
						onClick={loadingSuccessTest}
						onComplete={() => console.log('onComplete: completed')}
						onError={(error) => console.error(error)}
						variant="secondary"
					>
						Load
					</StatefulButton>
				}
				code={codeExamples.statefulButtonSecondarySuccess}
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
						variant="secondary"
					>
						Progress
					</StatefulButton>
				}
				code={codeExamples.statefulButtonSecondaryProgressSuccess}
			/>
		</section>
	);
}
