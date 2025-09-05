import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal } from 'lucide-react';
import CodeBlock from '@/components/code-block';

export default function Installation() {
	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-medium tracking-tight">Installation</h2>
			<Tabs defaultValue="npm">
				<TabsList>
					<TabsTrigger value="icon" disabled>
						<div className="rounded-[1px] bg-foreground text-background">
							<Terminal className="m-0.5 size-3.5" />
						</div>
					</TabsTrigger>
					<TabsTrigger value="pnpm">pnpm</TabsTrigger>
					<TabsTrigger value="npm">npm</TabsTrigger>
					<TabsTrigger value="yarn">yarn</TabsTrigger>
					<TabsTrigger value="bun">bun</TabsTrigger>
				</TabsList>
				<TabsContent value="pnpm">
					<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
						{`pnpm dlx shadcn@latest add http://localhost:3000/r/stateful-button.json`}
					</CodeBlock>
				</TabsContent>
				<TabsContent value="npm">
					<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
						{`npx shadcn@latest add http://localhost:3000/r/stateful-button.json`}
					</CodeBlock>
				</TabsContent>
				<TabsContent value="yarn">
					<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
						{`yarn shadcn@latest add http://localhost:3000/r/stateful-button.json`}
					</CodeBlock>
				</TabsContent>
				<TabsContent value="bun">
					<CodeBlock lang="bash" textSize={14} showLineNumbers={false}>
						{`bunx --bun shadcn@latest add http://localhost:3000/r/stateful-button.json`}
					</CodeBlock>
				</TabsContent>
			</Tabs>
		</section>
	);
}
