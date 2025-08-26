'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, LoaderCircle } from 'lucide-react';
import { assign, setup } from 'xstate';
import { useMachine } from '@xstate/react';

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

type BaseProps = {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<unknown>;
	onComplete?: () => void;
	onError?: (error: Error) => void;
	children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type SpinnerButtonProps = BaseProps & {
	buttonType?: 'spinner';
	progress?: never;
};

type ProgressButtonProps = BaseProps & {
	buttonType: 'progress';
	progress: number;
};

export type StatefulButtonProps = BaseProps & (SpinnerButtonProps | ProgressButtonProps);

const StatefulButton: React.FC<StatefulButtonProps> = ({
	buttonType = 'spinner',
	onClick,
	onComplete,
	onError,
	progress,
	children,
	...props
}) => {
	const [snapshot, send] = useMachine(statefulButtonMachine, {
		input: {
			onComplete,
			buttonType
		}
	});

	React.useEffect(() => {
		if (buttonType === 'progress' && typeof progress === 'number') {
			send({ type: 'setProgress', progress });
		}
	}, [progress]);

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

	return (
		<Button onClick={handleClick} disabled={!snapshot.matches('idle')} className="w-24" {...props}>
			{snapshot.matches('idle') && children}
			{snapshot.matches('loading') && <LoaderCircle className="animate-spin" />}
			{snapshot.matches('progress') && (
				<Progress
					value={snapshot.context.progress}
					className="bg-neutral-50/20 dark:bg-neutral-900/20 [&>[data-slot=progress-indicator]]:bg-neutral-50 [&>[data-slot=progress-indicator]]:dark:bg-neutral-900"
				/>
			)}
			{snapshot.matches('success') && <Check />}
			{snapshot.matches('error') && <X />}
		</Button>
	);
};

export default StatefulButton;
