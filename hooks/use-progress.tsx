'use client';

import { useState } from 'react';

type RejectCondition = (value: number) => boolean;

const useProgress = () => {
	const [progress, setProgress] = useState(0);

	const startProgress = (
		increment = 2,
		intervalMs = 100,
		shouldReject?: RejectCondition,
		rejectMessage = 'Progress was rejected'
	) => {
		setProgress(0);

		return new Promise<void>((resolve, reject) => {
			let value = 0;

			const interval = setInterval(() => {
				value += increment;

				if (shouldReject?.(value)) {
					clearInterval(interval);
					reject(new Error(rejectMessage));
					return;
				}

				if (value >= 100) {
					setProgress(100);
					clearInterval(interval);
					resolve();
				} else {
					setProgress(value);
				}
			}, intervalMs);
		});
	};

	return { progress, startProgress };
};

export default useProgress;
