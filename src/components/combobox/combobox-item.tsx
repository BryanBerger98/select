import { MouseEventHandler, forwardRef } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComboboxOption, useCombobox } from '.';

type ComboboxItemProps = {
	option: ComboboxOption;
} & ButtonProps;

const ComboxboxItem = forwardRef<HTMLButtonElement, ComboboxItemProps>(( { option, className, variant = 'ghost', role = 'menuitem', onClick, ...props }, ref) => {

	const { selected, mode, selectOption } = useCombobox();

	const isSelected = () => {
		if (mode === 'single' && selected) {
			return (selected as ComboboxOption).value === option.value;
		}

		if (mode === 'multiple' && selected) {
			const itemIndex = (selected as ComboboxOption[]).findIndex((item) => item.value === option.value);
			return itemIndex !== -1;
		}
		return false;
	}

	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		selectOption(option);
		if (onClick) {
			onClick(event);
		}
	}

	return (
		<Button
			className={ cn('relative flex cursor-default select-none items-center justify-start px-2 py-1.5 h-fit outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full', className) }
			{ ...props }
			onClick={ handleClick }
			role={ role }
			variant={ variant }
			ref={ ref }
		>
			<Check
				className={ cn(
					'mr-2 h-4 w-4',
					isSelected() ? 'opacity-100' : 'opacity-0'
				) }
			/>
			{ option.label }
		</Button>
	)
});

export default ComboxboxItem;