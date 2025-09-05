declare namespace Cypress {
	interface Chainable {
		mount: typeof mount;
		assertIdleState(label: string): Chainable<void>;
		assertLoadingState(message?: string): Chainable<void>;
		assertProgressState(expected: number): Chainable<void>;
		assertSuccessState(message?: string): Chainable<void>;
		assertErrorState(message?: string): Chainable<void>;
		assertNoProgress(): Chainable<void>;
	}
}
