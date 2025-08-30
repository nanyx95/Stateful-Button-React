'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, LoaderCircle } from 'lucide-react';
import { assign, setup } from 'xstate';
import { useMachine } from '@xstate/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'motion/react';

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
			| { type: 'setProgress'; progress: number }
			| { type: 'finishLoading' }
			| { type: 'error' }
	},
	actions: {
		onComplete: ({ context }) => {
			context.onComplete?.();
		}
	},
	guards: {
		isSpinner: ({ context }) => context.buttonType === 'spinner',
		isProgress: ({ context }) => context.buttonType === 'progress'
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
				setProgress: [
					{
						target: 'success',
						guard: ({ event }) => event.progress >= 100,
						actions: assign({
							progress: ({ event }) => event.progress
						})
					},
					{
						actions: assign({
							progress: ({ event }) => event.progress
						})
					}
				],
				error: { target: 'error' }
			}
		},
		success: {
			entry: 'onComplete',
			after: {
				1500: {
					target: 'idle',
					actions: assign({ progress: 0 })
				}
			}
		},
		error: {
			after: {
				1500: {
					target: 'idle',
					actions: assign({ progress: 0 })
				}
			}
		}
	}
});

/**
 * CVA variants for the underlying button element.
 */
const buttonVariants = cva(
	'w-25 gap-1 relative overflow-hidden disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-100',
	{
		variants: {
			size: {
				default: 'h-9 px-3.5 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-4.5 has-[>svg]:px-4'
			}
		},
		defaultVariants: {
			size: 'default'
		}
	}
);

/**
 * CVA variants for the progress indicator.
 */
const progressVariants = cva('', {
	variants: {
		variant: {
			default:
				'bg-neutral-50/20 dark:bg-neutral-900/20 [&>[data-slot=progress-indicator]]:bg-neutral-50 [&>[data-slot=progress-indicator]]:dark:bg-neutral-900',
			destructive:
				'bg-neutral-900/20 dark:bg-neutral-50/20 [&>[data-slot=progress-indicator]]:bg-neutral-900 [&>[data-slot=progress-indicator]]:dark:bg-neutral-50',
			outline:
				'bg-neutral-900/20 dark:bg-neutral-50/20 [&>[data-slot=progress-indicator]]:bg-neutral-900 [&>[data-slot=progress-indicator]]:dark:bg-neutral-50',
			secondary:
				'bg-neutral-900/20 dark:bg-neutral-50/20 [&>[data-slot=progress-indicator]]:bg-neutral-900 [&>[data-slot=progress-indicator]]:dark:bg-neutral-50',
			ghost:
				'bg-neutral-900/20 dark:bg-neutral-50/20 [&>[data-slot=progress-indicator]]:bg-neutral-900 [&>[data-slot=progress-indicator]]:dark:bg-neutral-50'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

/**
 * Accessible ARIA messages for different states of the stateful button.
 *
 * @remarks
 * If not provided, sensible defaults are used.
 */
type AriaMessages = {
	/**
	 * Message announced while indeterminate work is in progress.
	 *
	 * @defaultValue `'Loading, please wait'`
	 */
	loading?: string;
	/**
	 * Function that generates a progress message.
	 *
	 * @param value - The current progress value.
	 * @returns An accessible description of the progress.
	 *
	 * @defaultValue Rounds to nearest 25% (e.g., `"50%"`).
	 */
	progress?: (value: number) => string;
	/**
	 * Message announced when the action completes successfully.
	 *
	 * @defaultValue `'Completed successfully'`
	 */
	success?: string;
	/**
	 * Message announced when an error occurs.
	 *
	 * @defaultValue `'An error occurred'`
	 */
	error?: string;
};

/**
 * Shared props for the {@link StatefulButton} component.
 *
 * @remarks
 * Extends native `button` element props, supports style variants
 * from CVA, and accessibility messages.
 */
type BaseProps = {
	/**
	 * Click handler invoked when the button is pressed.
	 *
	 * @param event - The click event object.
	 * @returns Can return a `Promise` if the click handler is asynchronous.
	 */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
	/**
	 * Callback triggered when the action completes successfully.
	 *
	 * @remarks
	 * This callback is invoked by the {@link statefulButtonMachine} `onComplete` action.
	 */
	onComplete?: () => void;
	/**
	 * Callback triggered when when `onClick` throws (or a rejection occurs).
	 *
	 * @param error - The error object.
	 */
	onError?: (error: Error) => void;
	/**
	 * Content to render inside the button while in the `idle` state.
	 */
	children?: React.ReactNode;
	/**
	 * Customizable ARIA messages for accessibility.
	 * Defaults are provided if not supplied.
	 */
	ariaMessages?: AriaMessages;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> &
	VariantProps<typeof progressVariants>;

/**
 * Props for the spinner-style {@link StatefulButton}.
 *
 * @remarks
 * This is the **default** mode. When the `onClick` handler is executed,
 * the button enters a `loading` state, displaying a spinner icon until the
 * promise returned by `onClick` resolves, rejects, or throws.
 */
type SpinnerButtonProps = {
	/**
	 * Specifies the spinner button type.
	 *
	 * @defaultValue `'spinner'`
	 */
	buttonType?: 'spinner';
	/**
	 * The progress prop is not applicable to the spinner button type.
	 */
	progress?: never;
};

/**
 * Props for the progress-bar-style {@link StatefulButton}.
 *
 * @remarks
 * In this mode, the button displays a progress bar that reflects the value
 * of the `progress` prop. This is useful for showing the status of an
 * ongoing task, like a file upload. The `progress` prop must be a
 * controlled value between 0 and 100.
 */
type ProgressButtonProps = {
	/**
	 * Specifies the progress button type. Must be 'progress'.
	 */
	buttonType: 'progress';
	/**
	 * The current progress value (0-100). This is a controlled prop used
	 * to update the progress bar.
	 */
	progress: number;
};

/**
 * Props for the {@link StatefulButton} component.
 *
 * The button's behavior and available props depend on the `buttonType` specified.
 *
 * @see {@link SpinnerButtonProps} for the default spinner mode.
 * @see {@link ProgressButtonProps} for the progress bar mode.
 */
export type StatefulButtonProps = BaseProps & (SpinnerButtonProps | ProgressButtonProps);

/**
 * A stateful button that provides visual feedback for different states, such as
 * idle, loading/progress, success, and error.
 *
 * @remarks
 * The button can operate in two main modes, determined by the `buttonType` prop:
 * 1.  **`spinner` (default):** Displays a spinner during an asynchronous
 *     operation. The button transitions to a loading state on click and waits
 *     for the `onClick` promise to resolve.
 * 2.  **`progress`:** Displays a progress bar controlled by the `progress` prop.
 *     This is ideal for tasks like file uploads where progress can be tracked
 *     incrementally.
 *
 * The button's visual appearance (variant and size) and other native button
 * attributes can be customized.
 *
 * @param props - {@link StatefulButtonProps} controlling behavior and appearance.
 * @returns A React element representing the stateful button.
 *
 * @defaultValue `buttonType` defaults to `'spinner'`.
 *
 * @example Spinner Mode (Default)
 *
 * Displays a spinner during an async operation.
 *
 * ```tsx
 * <StatefulButton
 *   onClick={async () => {
 *     // Simulate an API call
 *     await new Promise(resolve => setTimeout(resolve, 2000));
 *   }}
 * >
 *   Save
 * </StatefulButton>
 * ```
 *
 * @example Progress Mode
 *
 * Displays a progress bar controlled by the `progress` prop, often updated
 * during an async operation.
 *
 * ```tsx
 * const [progress, setProgress] = React.useState(0);
 *
 * // Simulate an async upload process
 * const handleUpload = async () => {
 *   for (let i = 0; i <= 10; i++) {
 *     await new Promise(resolve => setTimeout(resolve, 300));
 *     setProgress(i * 10);
 *   }
 * };
 *
 * <StatefulButton
 *   buttonType="progress"
 *   progress={progress}
 *   onClick={handleUpload}
 *   onComplete={() => console.log('Upload complete!')}
 * >
 *   Upload
 * </StatefulButton>
 * ```
 */
const StatefulButton: React.FC<StatefulButtonProps> = ({
	buttonType = 'spinner',
	onClick,
	onComplete,
	onError,
	progress,
	children,
	className,
	variant,
	size,
	ariaMessages,
	...props
}) => {
	const [snapshot, send] = useMachine(statefulButtonMachine, {
		input: {
			onComplete,
			buttonType
		}
	});

	const shouldReduceMotion = useReducedMotion();

	React.useEffect(() => {
		if (buttonType === 'progress' && typeof progress === 'number') {
			send({ type: 'setProgress', progress });
		}
	}, [progress]);

	/**
	 * Click handler that:
	 * - sends `click` to the machine to transition into loading/progress,
	 * - awaits the `onClick` handler if it returns a promise (spinner mode),
	 * - dispatches `finishLoading` when spinner promise resolves,
	 * - catches errors, forwards them to `onError` and transitions the machine to `error`.
	 *
	 * @param event - The click event from the button element.
	 *
	 * @throws Rethrows or forwards thrown values to `onError` as `Error` objects.
	 *
	 * @remarks
	 * In spinner mode, success is signaled via `finishLoading`.
	 * In progress mode, success is driven externally via `progress >= 100`.
	 */
	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		send({ type: 'click' });
		try {
			await onClick?.(event);
			if (buttonType === 'spinner') {
				send({ type: 'finishLoading' });
			}
		} catch (error: unknown) {
			const err = error instanceof Error ? error : new Error(String(error));
			onError?.(err);
			send({ type: 'error' });
		}
	};

	/**
	 * Default ARIA messages used if {@link AriaMessages} are not provided.
	 */
	const defaultAriaMessages: Required<AriaMessages> = {
		loading: 'Loading, please wait',
		progress: (value: number) => {
			const roundedValue = Math.round(value / 25) * 25;
			return `${roundedValue}%`;
		},
		success: 'Completed successfully',
		error: 'An error occurred'
	};
	const ariaMsg = { ...defaultAriaMessages, ...ariaMessages };

	const loadingContent = (
		<>
			<LoaderCircle className="animate-spin" aria-hidden="true" />
			<span className="sr-only">{ariaMsg.loading}</span>
		</>
	);
	const progressContent = (
		<>
			<Progress value={snapshot.context.progress} className={cn(progressVariants({ variant }))} />
			<span className="sr-only">{ariaMsg.progress(snapshot.context.progress)}</span>
		</>
	);
	const successContent = (
		<>
			<Check aria-hidden="true" />
			<span role="status" className="sr-only">
				{ariaMsg.success}
			</span>
		</>
	);
	const errorContent = (
		<>
			<X aria-hidden="true" />
			<span role="status" className="sr-only">
				{ariaMsg.error}
			</span>
		</>
	);

	const slideTransition: Transition = { duration: shouldReduceMotion ? 0.1 : 0.2, ease: 'easeOut' };
	const fadeTransition: Transition = { duration: shouldReduceMotion ? 0.05 : 0.15, ease: 'linear' };
	const reducedY = shouldReduceMotion ? 20 : 80;

	return (
		<Button
			variant={variant}
			className={cn(buttonVariants({ size, className }))}
			onClick={handleClick}
			disabled={!snapshot.matches('idle')}
			aria-busy={snapshot.matches('loading') || snapshot.matches('progress')}
			aria-live="polite"
			{...props}
		>
			<AnimatePresence mode="wait" initial={false}>
				{snapshot.matches('idle') && (
					<motion.div
						key="idle"
						initial={{ y: `-${reducedY}%`, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: `-${reducedY}%`, opacity: 0 }}
						transition={slideTransition}
						className="flex items-center gap-1"
					>
						{children}
					</motion.div>
				)}

				{snapshot.matches('loading') && (
					<motion.div
						key="loading"
						initial={{ y: `${reducedY}%`, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={slideTransition}
						className="flex items-center gap-1"
					>
						{loadingContent}
					</motion.div>
				)}

				{snapshot.matches('progress') && (
					<motion.div
						key="progress"
						initial={{ y: `${reducedY}%`, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={slideTransition}
						className="flex w-full items-center gap-1"
					>
						{progressContent}
					</motion.div>
				)}

				{snapshot.matches('success') && (
					<motion.div
						key="success"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ y: `${reducedY}%`, opacity: 0 }}
						transition={fadeTransition}
						className="flex items-center gap-1"
					>
						{successContent}
					</motion.div>
				)}

				{snapshot.matches('error') && (
					<motion.div
						key="error"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ y: `${reducedY}%`, opacity: 0 }}
						transition={fadeTransition}
						className="flex items-center gap-1"
					>
						{errorContent}
					</motion.div>
				)}
			</AnimatePresence>
		</Button>
	);
};

export default StatefulButton;
