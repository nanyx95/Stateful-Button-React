export default function Intro() {
	return (
		<header className="flex flex-col gap-1">
			<h1 className="text-3xl font-bold tracking-tight">Stateful Button for React</h1>
			<p className="text-muted-foreground">
				A button that can be in different states, such as idle, loading/progress, success, and error. It is useful for
				providing feedback to the user after an action has been performed.
			</p>
		</header>
	);
}
