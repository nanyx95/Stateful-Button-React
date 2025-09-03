import React from 'react';
import StatefulButton from '@/registry/new-york/ui/stateful-button/stateful-button';
import { SELECTORS } from '../support/test-utils';

describe('<StatefulButton />', () => {
	it('should render correctly in its initial idle state', () => {
		cy.mount(<StatefulButton>Click Me</StatefulButton>);
		cy.assertIdleState('Click Me');
	});

	it('should transition from idle to success and back to idle when the onClick handler is synchronous', () => {
		const onClickStub = cy.stub().as('onClickStub');
		const onCompleteStub = cy.stub().as('onCompleteStub');

		cy.mount(
			<StatefulButton onClick={onClickStub} onComplete={onCompleteStub}>
				Click Me
			</StatefulButton>
		);

		// 1. Initial state: idle
		cy.assertIdleState('Click Me');

		// 2. On click: transition to success
		cy.get(SELECTORS.button).click();
		cy.assertSuccessState();

		// 3. Finally: transition back to idle
		cy.assertIdleState('Click Me');

		// Assert that onComplete was called once
		cy.get('@onCompleteStub').should('have.been.calledOnce');
	});

	it('should transition from idle to loading, then to success, and finally back to idle when the asynchronous onClick handler resolves', () => {
		let resolvePromise: (value?: unknown) => void;
		const promise = new Cypress.Promise((resolve) => (resolvePromise = resolve));

		const onClickStub = cy.stub().as('onClickStub').returns(promise);
		const onCompleteStub = cy.stub().as('onCompleteStub');
		const onErrorStub = cy.stub().as('onErrorStub');

		cy.mount(
			<StatefulButton onClick={onClickStub} onComplete={onCompleteStub} onError={onErrorStub}>
				Click Me
			</StatefulButton>
		);

		// 1. Initial state: idle
		cy.assertIdleState('Click Me');

		// 2. On click: transition to loading
		cy.get(SELECTORS.button).click();
		cy.assertLoadingState();

		// 3. After onClick resolves: transition to success
		cy.then(() => resolvePromise());
		cy.assertSuccessState();

		// 4. Finally: transition back to idle
		cy.assertIdleState('Click Me');

		// Assert that onComplete was called once
		cy.get('@onCompleteStub').should('have.been.calledOnce');

		// Assert that onError was never called
		cy.get('@onErrorStub').should('not.have.been.called');
	});

	it('should transition from idle to loading, then to error, and finally back to idle when the asynchronous onClick handler rejects', () => {
		let rejectPromise: (reason?: any) => void;
		const promise = new Cypress.Promise((_, reject) => (rejectPromise = reject));

		const onClickStub = cy.stub().as('onClickStub').returns(promise);
		const onCompleteStub = cy.stub().as('onCompleteStub');
		const onErrorStub = cy.stub().as('onErrorStub');

		cy.mount(
			<StatefulButton onClick={onClickStub} onComplete={onCompleteStub} onError={onErrorStub}>
				Click Me
			</StatefulButton>
		);

		// 1. Initial state: idle
		cy.assertIdleState('Click Me');

		// 2. On click: transition to loading
		cy.get(SELECTORS.button).click();
		cy.assertLoadingState();

		// 3. After onClick rejects: transition to error
		cy.then(() => rejectPromise(new Error('Simulated error')));
		cy.assertErrorState();

		// 4. Finally: transition back to idle
		cy.assertIdleState('Click Me');

		// Assert that onComplete was never called
		cy.get('@onCompleteStub').should('not.have.been.called');

		// Assert that onError was called once
		cy.get('@onErrorStub').should('have.been.calledOnce');
	});

	it('should transition from idle to progress, then to success, and finally back to idle for a successful progress-based asynchronous operation', () => {
		const onClickStub = cy.stub().as('onClickStub');
		const onCompleteStub = cy.stub().as('onCompleteStub');
		const onErrorStub = cy.stub().as('onErrorStub');

		let setProgress: (value: number) => void;

		const SBTestComponent = () => {
			const [progress, currentSetProgress] = React.useState(0);
			setProgress = currentSetProgress;

			return (
				<StatefulButton
					buttonType="progress"
					progress={progress}
					onClick={onClickStub}
					onComplete={onCompleteStub}
					onError={onErrorStub}
				>
					Click Me
				</StatefulButton>
			);
		};

		cy.mount(<SBTestComponent />);

		// 1. Initial state: idle
		cy.assertIdleState('Click Me');

		// 2. On click: transition to progress
		cy.get(SELECTORS.button).click();
		cy.assertProgressState(0);

		// Manually update progress and assert
		[25, 50, 75].forEach((val) => {
			cy.then(() => setProgress(val));
			cy.assertProgressState(val);
		});

		// 3. When progress reaches 100%: transition to success
		cy.then(() => setProgress(100));
		cy.assertSuccessState();
		cy.assertNoProgress();

		// 4. Finally: transition back to idle
		cy.assertIdleState('Click Me');

		// Assert that onComplete was called once
		cy.get('@onCompleteStub').should('have.been.calledOnce');

		// Assert that onError was never called
		cy.get('@onErrorStub').should('not.have.been.called');
	});

	it('should transition from idle to progress, then to error, and finally back to idle when a progress-based asynchronous operation fails', () => {
		let rejectPromise: (reason?: any) => void;
		const promise = new Cypress.Promise((_, reject) => (rejectPromise = reject));

		const onClickStub = cy.stub().as('onClickStub').returns(promise);
		const onCompleteStub = cy.stub().as('onCompleteStub');
		const onErrorStub = cy.stub().as('onErrorStub');

		let setProgress: (value: number) => void;

		const SBTestComponent = () => {
			const [progress, currentSetProgress] = React.useState(0);
			setProgress = currentSetProgress;

			return (
				<StatefulButton
					buttonType="progress"
					progress={progress}
					onClick={onClickStub}
					onComplete={onCompleteStub}
					onError={onErrorStub}
				>
					Click Me
				</StatefulButton>
			);
		};

		cy.mount(<SBTestComponent />);

		// 1. Initial state: idle
		cy.assertIdleState('Click Me');

		// 2. On click: transition to progress
		cy.get(SELECTORS.button).click();
		cy.assertProgressState(0);

		// Manually update progress and assert
		[25, 50].forEach((val) => {
			cy.then(() => setProgress(val));
			cy.assertProgressState(val);
		});

		// 3. After onClick rejects: transition to error
		cy.then(() => rejectPromise(new Error('Simulated error')));
		cy.assertErrorState();
		cy.assertNoProgress();

		// 4. Finally: transition back to idle
		cy.assertIdleState('Click Me');

		// Assert that onComplete was never called
		cy.get('@onCompleteStub').should('not.have.been.called');

		// Assert that onError was called once
		cy.get('@onErrorStub').should('have.been.calledOnce');
	});

	it('should use a custom success ARIA message', () => {
		const successAriaMessage = 'This is a custom success message';

		cy.mount(<StatefulButton ariaMessages={{ success: successAriaMessage }}>Click Me</StatefulButton>);

		// 1. Initial state: idle
		cy.assertIdleState('Click Me');

		// 2. On click: transition to success
		cy.get(SELECTORS.button).click();
		cy.assertSuccessState(successAriaMessage);

		// 3. Finally: transition back to idle
		cy.assertIdleState('Click Me');
	});
});
