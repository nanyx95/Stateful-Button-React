'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';
import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

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
		<div className="relative">
			{showCopy && (
				<Button onClick={handleCopy} variant="ghost" size="icon" className="absolute top-2 right-2 z-10 bg-codeblock">
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
				className={cn(
					'scrollbar-hidden overflow-y-auto rounded-lg border bg-codeblock font-mono leading-snug',
					className
				)}
				style={{
					maxHeight: maxHeight ? `${maxHeight}px` : undefined,
					maxWidth: maxWidth ? `${maxWidth}px` : undefined,
					fontSize: textSize
				}}
				data-lang={lang}
			>
				<div className="flex">
					{showLineNumbers && (
						<pre className="sticky left-0 z-10 bg-codeblock p-4 text-right text-muted-foreground select-none">
							<code>{lineNumbers}</code>
						</pre>
					)}
					<div className="scrollbar-hidden flex-1 overflow-x-auto">
						{highlightedContent ? (
							<div
								className={clsx(
									'[&>pre]:!border-none [&>pre]:!bg-transparent [&>pre]:!outline-none',
									showLineNumbers ? '[&>pre]:!py-4' : '[&>pre]:!p-4'
								)}
								data-lang={lang}
								dangerouslySetInnerHTML={{ __html: highlightedContent }}
							/>
						) : (
							<pre className={clsx('text-foreground', showLineNumbers ? 'py-4' : 'p-4')}>
								<code>{codeText}</code>
							</pre>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
