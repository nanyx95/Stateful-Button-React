# Stateful Button for shadcn/ui

> A **shadcn/ui** button component that provides clear, accessible visual feedback for any asynchronous action.

**[Live demo →](https://stateful-button.com)**

## Features

- **Multiple states:** `idle`, `loading` / `progress`, `success`, `error`
- **Async-friendly:** works seamlessly with Promise-based handlers
- **Powered by XState:** predictable and robust state transitions
- **Accessible by default:** ARIA messages and screen reader support
- **Fully customizable:** shipped as source code via `shadcn/ui` CLI

## Installation

Add the `StatefulButton` to your project using the **shadcn/ui CLI**:

```bash
npx shadcn-ui@latest add stateful-button
```

This will add `stateful-button.tsx` to your `components/ui` directory and `stateful-button-machine.ts` to your `lib` directory.

## What is a Stateful Button?

A stateful button represents the lifecycle of an action, typically an asynchronous one.
It provides immediate visual feedback to improve responsiveness and prevent confusion.

This component manages the following states:

- `idle`: the default, interactive state.
- `loading` / `progress`: indicates that an operation is in progress.
- `success`: confirms that the operation completed successfully.
- `error`: shows that something went wrong.

### Use Cases

This component is perfect for any time-consuming operation where you need to keep users informed that a task is running and awaiting completion. Common examples include:

- **Slow API Requests:** submitting forms, completing e-commerce checkouts, or any backend communication that might have a noticeable delay.
- **Data Processing:** processing or saving complex data.
- **File Operations:** uploading large files.
- **And any other asynchronous task** where clear user feedback is critical.

## Basic usage

The Stateful Button supports two modes: **spinner** and **progress**.

### Spinner Mode

This is the default mode. The button shows a spinner while the `onClick` handler is executing.

```tsx
import StatefulButton from '@/components/ui/stateful-button';

<StatefulButton
	onClick={async () => {
		// Simulate an API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}}
>
	Save
</StatefulButton>;
```

### Progress Mode

In this mode, the button displays a progress bar. The `progress` prop must be a controlled value between 0 and 100.

```tsx
import React from 'react';
import StatefulButton from '@/components/ui/stateful-button';

export default function UploadExample() {
	const [progress, setProgress] = React.useState(0);

	const handleUpload = async () => {
		// Simulate upload progress
		for (let i = 0; i <= 10; i++) {
			await new Promise((resolve) => setTimeout(resolve, 250));
			setProgress(i * 10);
		}
	};

	return (
		<StatefulButton
			buttonType="progress"
			progress={progress}
			onClick={handleUpload}
			onComplete={() => console.log('Upload complete')}
		>
			Upload
		</StatefulButton>
	);
}
```

## Props

The `StatefulButton` component extends standard HTML button attributes and shadcn/ui's button variants, in addition to its own specific props:

| Prop                         | Type                                                                       | Description                                                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onClick`                    | `(event: React.MouseEvent<HTMLButtonElement>) => void \| Promise<unknown>` | Click handler invoked when the button is pressed. Can return a `Promise` if the click handler is asynchronous.                                    |
| `onComplete`                 | `() => void`                                                               | Callback triggered when the action completes successfully.                                                                                        |
| `onError`                    | `(error: Error) => void`                                                   | Callback triggered when `onClick` throws (or a rejection occurs).                                                                                 |
| `buttonType`                 | `'spinner' \| 'progress'`                                                  | Specifies the button's behavior mode. `'spinner'` (default) shows a loading spinner. `'progress'` displays a progress bar.                        |
| `progress`                   | `number`                                                                   | The current progress value (0-100). This is a controlled prop used to update the progress bar. Only applicable when `buttonType` is `'progress'`. |
| `children`                   | `React.ReactNode`                                                          | Content to render inside the button while in the `idle` state.                                                                                    |
| `ariaMessages`               | `AriaMessages`                                                             | Customizable ARIA messages for accessibility. Defaults are provided if not supplied.                                                              |
| `variant`                    | `string`                                                                   | The visual style of the button (e.g., `default`, `destructive`, `outline`). Inherited from shadcn/ui's Button component.                          |
| `size`                       | `string`                                                                   | The size of the button (e.g., `default`, `sm`, `lg`). Inherited from shadcn/ui's Button component.                                                |
| ...other native button props | `React.ButtonHTMLAttributes<HTMLButtonElement>`                            | All standard HTML button attributes are supported.                                                                                                |

## State Management

The Stateful Button is managed by an [XState](https://xstate.js.org/) finite state machine, defined in `lib/stateful-button-machine.ts`. This machine ensures predictable state transitions, making the component's behavior robust and preventing inconsistent UI states.

## Accessibility

The Stateful Button is accessible and screen-reader friendly, using ARIA attributes and providing descriptive messages for its various states. You can further customize these messages using the `ariaMessages` prop, allowing you to tailor the spoken feedback to your specific application's needs.

## Testing

The Stateful Button is tested using [Cypress](https://www.cypress.io/) Component Testing.

Run tests in headless mode:

```bash
npm run cypress:run
```

Or open interactive mode:

```bash
npm run cypress:open
```

## About This Repository

This repository provides documentation, a live showcase, and a custom shadcn registry for the Stateful Button component.

To run this project locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/nanyx95/Stateful-Button-React.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd Stateful-Button-React
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```

## License

Licensed under the [MIT license](LICENSE).
