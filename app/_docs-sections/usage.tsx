import CodeBlock from '@/components/code-block';

export default function Usage() {
	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-medium tracking-tight">Usage</h2>
			<CodeBlock lang="tsx" textSize={14} showLineNumbers={false}>
				{`import { StatefulButton } from '@/components/ui/stateful-button';`}
			</CodeBlock>
			<CodeBlock lang="tsx" textSize={14} showLineNumbers={false}>
				{`<StatefulButton onClick={loading}>Button</StatefulButton>`}
			</CodeBlock>
		</section>
	);
}
