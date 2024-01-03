import { ReactNode, forwardRef } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { ComboboxOption, useCombobox } from '.';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type ComboboxValueProps = {
	placeholder?: ReactNode;
} & Omit<ButtonProps, 'variant' | 'children'>;

const ComboboxValue = forwardRef<HTMLButtonElement, ComboboxValueProps>(({ placeholder = 'Select an option', className, ...props }, ref) => {

	const { mode, selected } = useCombobox();

	const getValuesLabel = () => {
		if (mode === 'single' && selected) {
			return (selected as ComboboxOption).label;
		}
		if (mode === 'multiple' && Array.isArray(selected)) {
			return selected.map((option) => option.label).join(', ');
		}
		return null;
	}

	return (
		<Button variant="outline" className={ cn('justify-between gap-2', className) } { ...props } ref={ref }>
			<span className="truncate w-11/12 text-left">{ getValuesLabel() || placeholder }</span>
			<ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
		</Button>
	)
});
ComboboxValue.displayName = 'ComboboxValue';

export default ComboboxValue;