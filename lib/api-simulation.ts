// dummy success API call
const loadingSuccessTest = () => {
	return new Promise((resolve) => {
		setTimeout(resolve, 4000);
	});
};

// dummy failed API call
const loadingFailedTest = () => {
	return new Promise((_, reject) => {
		setTimeout(() => reject(new Error('Error from dummy API call')), 4000);
	});
};

// Simulation of multiple API requests with random delays and failures.
const simulateApiRequestsProgress = async (setProgress: (p: number) => void, shouldFail = false) => {
	setProgress(0);
	const totalRequests = 7;
	let completedRequests = 0;

	const failingRequestId = shouldFail ? Math.floor(Math.random() * totalRequests) + 1 : 0;

	const simulateApiRequest = (id: number) =>
		new Promise<void>((resolve, reject) => {
			const delay = Math.floor(Math.random() * 4000) + 1000;

			setTimeout(() => {
				if (failingRequestId === id) {
					console.log(`Request ${id} failed after ${delay}ms`);
					reject(new Error(`Request ${id} failed`));
				} else {
					console.log(`Request ${id} completed in ${delay}ms`);
					completedRequests++;
					setProgress(Math.floor((completedRequests / totalRequests) * 100));
					resolve();
				}
			}, delay);
		});

	await Promise.all(Array.from({ length: totalRequests }, (_, i) => simulateApiRequest(i + 1)));
	setProgress(100);
	console.log('All simulated API requests completed');
};

export { loadingSuccessTest, loadingFailedTest, simulateApiRequestsProgress };
