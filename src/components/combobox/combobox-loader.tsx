import { Loader2 } from 'lucide-react';
import { useCombobox } from '.'
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ComboboxLoaderProps = HTMLAttributes<HTMLDivElement>;

const ComboboxLoader = forwardRef<HTMLDivElement, ComboboxLoaderProps>(( { children, className, ...props }, ref) => {

	const { isLoading } = useCombobox();

	return isLoading ?
	<div className={ cn('flex justify-center items-center text-sm py-6 text-slate-500', className) } { ...props } ref={ ref }>
		{ children || <Loader2 className="animate-spin text-slate-900" /> }
	</div>
	: null
});
ComboboxLoader.displayName = 'ComboboxLoader';

export default ComboboxLoader;