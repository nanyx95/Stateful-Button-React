export default function Intro() {
	return (
		<header className="flex flex-col gap-1">
			<h1 className="text-3xl font-bold tracking-tight">Stateful Button for React</h1>
			<p className="text-muted-foreground">
				A stateful button component designed to integrate seamlessly with{' '}
				<span className="text-foreground">shadcn/ui</span>. It extends the standard Button component to elegantly handle
				asynchronous operations, providing visual feedback for loading/progress, success, and error states. It's perfect
				for time-consuming operations, including but not limited to file uploads, slow API requests, or data processing,
				keeping users informed that the task is still running and awaiting completion.
			</p>
		</header>
	);
}
