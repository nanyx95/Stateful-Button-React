// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

import { mount } from 'cypress/react';
import { MotionGlobalConfig } from 'motion/react';

MotionGlobalConfig.skipAnimations = true;

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
	namespace Cypress {
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
}

Cypress.Commands.add('mount', mount);
