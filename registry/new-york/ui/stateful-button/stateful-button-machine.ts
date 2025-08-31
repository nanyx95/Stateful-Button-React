import { assign, setup } from 'xstate';

const SUCCESS_TO_IDLE_DELAY = 1500;
const ERROR_TO_IDLE_DELAY = 1500;

/**
 * A finite state machine that manages the state of a stateful button.
 *
 * @remarks
 * The machine has the following states:
 * - `idle`: Waiting for user interaction.
 * - `loading`: Shows a spinner while asynchronous work is in progress.
 * - `progress`: Shows a progress bar, typically when progress percentage is known.
 * - `success`: Temporary success state, then resets back to idle.
 * - `error`: Temporary error state, then resets back to idle.
 *
 * @privateRemarks
 * Built with XState and used internally by {@link StatefulButton}.
 */
const statefulButtonMachine = setup({
	types: {
		context: {} as {
			progress: number;
			onComplete?: () => void;
			buttonType: 'spinner' | 'progress';
		},
		input: {} as {
			onComplete?: () => void;
			buttonType: 'spinner' | 'progress';
		},
		events: {} as
			| { type: 'click' }
			| { type: 'updateProgress'; progress: number }
			| { type: 'finishLoading' }
			| { type: 'error' }
	},
	actions: {
		callOnComplete: ({ context }) => context.onComplete?.(),
		setProgress: assign(({ event }) => (event.type === 'updateProgress' ? { progress: event.progress } : {})),
		resetProgress: assign({ progress: 0 })
	},
	guards: {
		isSpinner: ({ context }) => context.buttonType === 'spinner',
		isProgress: ({ context }) => context.buttonType === 'progress',
		isProgressComplete: ({ event }) => event.type === 'updateProgress' && event.progress >= 100
	}
}).createMachine({
	id: 'statefulButton',
	context: ({ input }) => ({
		progress: 0,
		onComplete: input.onComplete,
		buttonType: input.buttonType
	}),
	initial: 'idle',
	states: {
		idle: {
			on: {
				click: [
					{ target: 'loading', guard: 'isSpinner' },
					{ target: 'progress', guard: 'isProgress' }
				]
			}
		},
		loading: {
			on: {
				finishLoading: { target: 'success' },
				error: { target: 'error' }
			}
		},
		progress: {
			on: {
				updateProgress: [
					{
						target: 'success',
						guard: 'isProgressComplete',
						actions: ['setProgress']
					},
					{
						actions: ['setProgress']
					}
				],
				error: { target: 'error' }
			}
		},
		success: {
			entry: [{ type: 'callOnComplete' }],
			after: {
				[SUCCESS_TO_IDLE_DELAY]: {
					target: 'idle',
					actions: ['resetProgress']
				}
			}
		},
		error: {
			after: {
				[ERROR_TO_IDLE_DELAY]: {
					target: 'idle',
					actions: ['resetProgress']
				}
			}
		}
	}
});

export { statefulButtonMachine };
