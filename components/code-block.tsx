'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
import { cn } from '@/lib/utils';

export type CodeBlockProps = {
	lang?: BundledLanguage;
	themes?: {
		dark: BundledTheme;
		light: BundledTheme;
	};
	maxHeight?: number;
	maxWidth?: number;
	textSize?: number;
	className?: string;
	children: React.ReactNode;
	showCopy?: boolean;
	showLineNumbers?: boolean;
};

export default function CodeBlock({
	lang = 'tsx',
	themes = {
		dark: 'github-dark',
		light: 'github-light'
	},
	maxHeight,
	maxWidth,
	textSize,
	className,
	children,
	showCopy = true,
	showLineNumbers = true
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [highlightedContent, setHighlightedContent] = useState<string | null>(null);

	const codeText = typeof children === 'string' ? children : String(children);
	const lines = codeText.split('\n').length;
	const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');

	useEffect(() => {
		let isMounted = true;

		codeToHtml(codeText, { lang, themes, defaultColor: 'light-dark()' }).then((highlighted) => {
			if (isMounted) {
				setHighlightedContent(highlighted);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [codeText, lang, themes]);

	const containerStyle: React.CSSProperties = maxWidth ? { maxWidth: `${maxWidth}px` } : {};

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(codeText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Failing silently if clipboard API is unavailable
		}
	}, [codeText]);

	return (
		<div
			className={cn('relative rounded-lg border bg-muted/40 font-mono leading-snug', className)}
			style={containerStyle}
			data-lang={lang}
		>
			{showCopy && (
				<Button onClick={handleCopy} variant="ghost" size="icon" className="absolute top-2 right-2 z-10">
					{copied ? (
						<>
							<Check aria-hidden="true" />
							<span className="sr-only">Copied to clipboard</span>
						</>
					) : (
						<>
							<Clipboard aria-hidden="true" />
							<span className="sr-only">Copy to clipboard</span>
						</>
					)}
				</Button>
			)}

			<div
				className="overflow-auto"
				style={{
					maxHeight: maxHeight ? `${maxHeight}px` : undefined,
					fontSize: textSize
				}}
			>
				<div className="flex">
					{showLineNumbers && (
						<pre className="p-4 text-right text-neutral-500 select-none">
							<code>{lineNumbers}</code>
						</pre>
					)}
					<div className="flex-1">
						{highlightedContent ? (
							<div
								className="[&>pre]:!border-none [&>pre]:!bg-transparent [&>pre]:!p-4"
								data-lang={lang}
								dangerouslySetInnerHTML={{ __html: highlightedContent }}
							/>
						) : (
							<pre className="p-4 text-neutral-100">
								<code>{codeText}</code>
							</pre>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
