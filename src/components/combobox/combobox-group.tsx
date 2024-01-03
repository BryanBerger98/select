import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

type ComboboxGroupProps = HTMLAttributes<HTMLDivElement> & {
	heading?: string;
};

const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(({ className, children, heading = '', ...props }, ref) => (
	<div
		className={ cn(
			'overflow-hidden p-1 text-foreground',
			className
		) }
		ref={ ref }
		{ ...props }
	>
		{ heading && <span className="text-xs px-2 py-1.5 font-medium text-muted-foreground">{ heading }</span> }
		{ children }
	</div>
));
ComboboxGroup.displayName = 'ComboboxGroup';

export default ComboboxGroup;