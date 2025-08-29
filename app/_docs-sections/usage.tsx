import CodeBlock from '@/components/code-block';

export default function Usage() {
	return (
		<>
			<h2 className="mt-12 text-2xl font-medium tracking-tight">Usage</h2>
			<CodeBlock lang="tsx" textSize={14} showLineNumbers={false}>
				{`import StatefulButton from '@/components/ui/stateful-button';`}
			</CodeBlock>
			<CodeBlock lang="tsx" textSize={14} showLineNumbers={false}>
				{`<StatefulButton onClick={loading}>Button</StatefulButton>`}
			</CodeBlock>
		</>
	);
}
