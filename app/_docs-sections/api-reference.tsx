import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InlineCode } from '@/components/ui/inline-code';

const propsData = [
	{
		prop: <InlineCode>onClick</InlineCode>,
		type: <InlineCode>{'(event: React.MouseEvent<HTMLButtonElement>) => void | Promise<unknown>'}</InlineCode>,
		default: '-',
		description: (
			<>
				Click handler invoked when the button is pressed. Can return a <InlineCode>Promise</InlineCode> if the click
				handler is asynchronous.
			</>
		)
	},
	{
		prop: <InlineCode>onComplete</InlineCode>,
		type: <InlineCode>{'() => void'}</InlineCode>,
		default: '-',
		description: 'Callback triggered when the action completes successfully.'
	},
	{
		prop: <InlineCode>onError</InlineCode>,
		type: <InlineCode>{'(error: Error) => void'}</InlineCode>,
		default: '-',
		description: (
			<>
				Callback triggered when <InlineCode>onClick</InlineCode> throws (or a rejection occurs).
			</>
		)
	},
	{
		prop: <InlineCode>buttonType</InlineCode>,
		type: <InlineCode>{"'spinner' | 'progress'"}</InlineCode>,
		default: <InlineCode>{"'spinner'"}</InlineCode>,
		description: (
			<>
				Specifies the button&apos;s behavior mode. <InlineCode>{"'spinner'"}</InlineCode> shows a loading spinner.{' '}
				<InlineCode>{"'progress'"}</InlineCode> displays a progress bar.
			</>
		)
	},
	{
		prop: <InlineCode>progress</InlineCode>,
		type: <InlineCode>number</InlineCode>,
		default: '-',
		description: (
			<>
				The current progress value (0-100). This is a controlled prop used to update the progress bar. Only applicable
				when <InlineCode>{'buttonType'}</InlineCode> is <InlineCode>{"'progress'"}</InlineCode>.
			</>
		)
	},
	{
		prop: <InlineCode>children</InlineCode>,
		type: <InlineCode>React.ReactNode</InlineCode>,
		default: '-',
		description: (
			<>
				Content to render inside the button while in the <InlineCode>{'idle'}</InlineCode> state.
			</>
		)
	},
	{
		prop: <InlineCode>ariaMessages</InlineCode>,
		type: <InlineCode>AriaMessages</InlineCode>,
		default: 'Default English messages for all states.',
		description: 'Customizable ARIA messages for accessibility.'
	},
	{
		prop: <InlineCode>variant</InlineCode>,
		type: <InlineCode>string</InlineCode>,
		default: <InlineCode>{"'default'"}</InlineCode>,
		description: (
			<>
				The visual style of the button (e.g., <InlineCode>default</InlineCode>, <InlineCode>destructive</InlineCode>,{' '}
				<InlineCode>outline</InlineCode>). Inherited from shadcn/ui&apos;s Button component.
			</>
		)
	},
	{
		prop: <InlineCode>size</InlineCode>,
		type: <InlineCode>string</InlineCode>,
		default: <InlineCode>{"'default'"}</InlineCode>,
		description: (
			<>
				The size of the button (e.g., <InlineCode>default</InlineCode>, <InlineCode>sm</InlineCode>,{' '}
				<InlineCode>lg</InlineCode>). Inherited from shadcn/ui&apos;s Button component.
			</>
		)
	},
	{
		prop: '...other native button props',
		type: <InlineCode>{'React.ButtonHTMLAttributes<HTMLButtonElement>'}</InlineCode>,
		default: '-',
		description: 'All standard HTML button attributes are supported.'
	}
];

export default function ApiReference() {
	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-medium tracking-tight">API Reference</h2>
			<p className="leading-relaxed text-primary">
				The <InlineCode>StatefulButton</InlineCode> component extends standard HTML button attributes and
				shadcn/ui&apos;s button variants, in addition to its own specific props:
			</p>
			<Table className="table-fixed [&_td]:whitespace-normal">
				<colgroup>
					<col className="w-[150px]" />
					<col className="w-[425px]" />
					<col className="w-[125px]" />
					<col className="w-[500px]" />
				</colgroup>
				<TableHeader>
					<TableRow>
						<TableHead>Prop</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Default</TableHead>
						<TableHead>Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{propsData.map((row, index) => (
						<TableRow key={index}>
							<TableCell>{row.prop}</TableCell>
							<TableCell>{row.type}</TableCell>
							<TableCell>{row.default}</TableCell>
							<TableCell>{row.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
