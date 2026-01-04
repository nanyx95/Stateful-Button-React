import { cn } from '@/lib/utils';

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	return (
		<code
			className={cn(
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm wrap-break-word outline-none',
				className
			)}
			{...props}
		/>
	);
}
