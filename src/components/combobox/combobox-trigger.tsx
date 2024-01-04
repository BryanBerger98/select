import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';

const ComboboxTrigger = forwardRef<ElementRef<typeof PopoverTrigger>, ComponentPropsWithoutRef<typeof PopoverTrigger>>(({ className, ...props }, ref) => (
	<PopoverTrigger
		ref={ ref }
		className={ cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className) }
		{ ...props }
	/>
));

ComboboxTrigger.displayName = 'ComboboxTrigger';

export default ComboboxTrigger;