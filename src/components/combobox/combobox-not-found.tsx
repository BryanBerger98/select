import { useCombobox } from '.'
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ComboboxNotFoundProps = HTMLAttributes<HTMLDivElement>;

const ComboboxNotFound = forwardRef<HTMLDivElement, ComboboxNotFoundProps>(( { children, className, ...props }, ref) => {

	const { options, isLoading } = useCombobox();

	return !isLoading && options.length === 0 ?
		<div className={ cn('flex justify-center items-center text-sm py-6 text-slate-500', className)} { ...props } ref={ ref }>
			{ children || 'No option found.' }
		</div>
		: null
});
ComboboxNotFound.displayName = 'ComboboxNotFound';

export default ComboboxNotFound;