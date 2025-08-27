'use client';

import { useCallback, useEffect, useState, type JSX } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';
import { codeToHast, type BundledLanguage, type BundledTheme } from 'shiki';
import { cn } from '@/lib/utils';

export type CodeBlockProps = {
	lang?: BundledLanguage;
	theme?: BundledTheme;
	maxHeight?: number;
	maxWidth?: number;
	textSize?: number;
	className?: string;
	children: React.ReactNode;
	showCopy?: boolean;
	showLineNumbers?: boolean;
};

/**
 * Syntax Highlights code using Shiki and converts it to JSX elements.
 * @param code - The source code string.
 * @param lang - Language for syntax highlighting.
 * @param theme - Theme for syntax highlighting.
 * @returns JSX element containing highlighted code.
 */
async function highlightCode(code: string, lang: BundledLanguage, theme: BundledTheme): Promise<JSX.Element> {
	try {
		const hast = await codeToHast(code, { lang, theme });
		return toJsxRuntime(hast, { Fragment, jsx, jsxs }) as JSX.Element;
	} catch {
		return <span className="text-neutral-100">{code}</span>;
	}
}

/**
 * CodeBlock component renders syntax-highlighted code with optional copy-to-clipboard button and line numbers.
 */
export default function CodeBlock({
	lang = 'ts',
	theme = 'github-dark', // Default theme github-dark. You can find all available themes at https://shiki.matsu.io/themes
	maxHeight,
	maxWidth,
	textSize,
	className,
	children,
	showCopy = true,
	showLineNumbers = true
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [highlightedContent, setHighlightedContent] = useState<JSX.Element | null>(null);

	const codeText = typeof children === 'string' ? children : String(children);
	const lines = codeText.split('\n').length;
	const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');

	useEffect(() => {
		let isMounted = true;

		highlightCode(codeText, lang, theme).then((highlighted) => {
			if (isMounted) {
				setHighlightedContent(highlighted);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [codeText, lang, theme]);

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
							<div className="[&>pre]:!border-none [&>pre]:!bg-transparent [&>pre]:!p-4" data-lang={lang}>
								{highlightedContent}
							</div>
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
