'use client';

import { useCallback, useEffect, useState, type JSX } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Button } from '@/components/ui/button';
import { Check, Clipboard } from 'lucide-react';
import { codeToHast, type BundledLanguage, type BundledTheme } from 'shiki';

import { cn } from '@/lib/utils';

export interface CodeBlockProps {
	lang?: BundledLanguage;
	theme?: BundledTheme;
	maxHeight?: number;
	maxWidth?: number;
	textSize?: number;
	className?: string;
	children: React.ReactNode;
	showCopy?: boolean;
}

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
		return <span className="text-zinc-100">{code}</span>;
	}
}

/**
 * CodeBlock component renders syntax-highlighted code with optional copy-to-clipboard button.
 */
export default function CodeBlock({
	lang = 'js',
	theme = 'github-dark', // Default theme github-dark. You can find all available themes at https://shiki.style/themes
	maxHeight,
	maxWidth,
	textSize,
	className,
	children,
	showCopy = true
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [highlightedContent, setHighlightedContent] = useState<JSX.Element | null>(null);

	const codeText = typeof children === 'string' ? children : String(children);

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
			className={cn(
				'relative [&_code]:font-mono [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:!bg-muted/40 [&_pre]:p-4 [&_pre]:leading-snug',
				className
			)}
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

			{highlightedContent ? (
				<div style={{ fontSize: textSize }} className="overflow-auto" data-lang={lang}>
					<style>
						{`
              div[data-lang] pre {
                max-height: ${maxHeight ?? 'none'}px;
                overflow: auto;
              }
            `}
					</style>
					{highlightedContent}
				</div>
			) : (
				<pre
					className="text-zinc-100"
					style={{
						fontSize: textSize,
						maxHeight: maxHeight ? `${maxHeight}px` : undefined,
						overflow: maxHeight ? 'auto' : undefined
					}}
				>
					<code>{codeText}</code>
				</pre>
			)}
		</div>
	);
}
