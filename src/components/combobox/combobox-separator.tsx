import { cn } from '@/lib/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { forwardRef } from 'react';
import { Separator } from '../ui/separator';

const ComboboxSeparator = forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(({ className, ...props }, ref) => (
	<Separator
		className={ cn('-mx-1 bg-border', className) }
		ref={ ref }
		{ ...props }
	/>
));
ComboboxSeparator.displayName = 'ComboboxSeparator';

export default ComboboxSeparator;