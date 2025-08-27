import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/code-block';
import React from 'react';

type ComponentPreviewProps = {
	preview: React.ReactNode;
	code: string;
};

export function ComponentPreview({ preview, code }: ComponentPreviewProps) {
	return (
		<Tabs defaultValue="preview">
			<TabsList>
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="code">Code</TabsTrigger>
			</TabsList>
			<TabsContent
				value="preview"
				className="relative flex min-h-[450px] items-center justify-center rounded-lg border p-4"
			>
				{preview}
			</TabsContent>
			<TabsContent value="code">
				<CodeBlock lang="tsx" textSize={14} className="[&_pre]:min-h-[450px]">
					{code}
				</CodeBlock>
			</TabsContent>
		</Tabs>
	);
}
