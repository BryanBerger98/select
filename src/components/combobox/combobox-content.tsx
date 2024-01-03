import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { useCombobox } from '.';
import { PopoverContent } from '../ui/popover';
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from '@/lib/utils';

const ComboboxContent = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(({ className, children, ...props }, ref) => {

	const { onBlur: handleBlur } = useCombobox();

	return (
		<PopoverContent
			className={ cn('min-w-[256px] w-[--radix-popover-trigger-width] p-1', className) }
			onInteractOutside={ handleBlur }
			{ ...props }
			ref={ ref }
		>
			{ children }
		</PopoverContent>
	);
});
ComboboxContent.displayName = 'ComboboxContent';

export default ComboboxContent;
