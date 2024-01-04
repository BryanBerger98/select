import { HTMLAttributes, MouseEvent, ReactNode, forwardRef } from 'react';
import { ComboboxOption, useCombobox } from '.';
import { ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type ComboboxPillsProps = {
	placeholder?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const ComboboxPills = forwardRef<HTMLDivElement, ComboboxPillsProps>(({ placeholder = 'Select an option', className, ...props }, ref) => {

	const { mode, selected, selectOption } = useCombobox();

	const getSelected = () => {
		if (mode === 'single' && selected) {
			return [ (selected as ComboboxOption) ];
		}
		if (mode === 'multiple' && Array.isArray(selected)) {
			return selected;
		}
		return [];
	}

	const handleRemove = (option: ComboboxOption) => (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		selectOption(option);
	}

	return (
		<div
			className={ cn('inline-flex items-center justify-between gap-2', className) }
			{ ...props }
			ref={ ref }
		>
			<div className="w-11/12 flex items-center gap-2 text-left flex-wrap">
			{ getSelected().length === 0 && placeholder }
			{
				getSelected().map((option) => (
					<Badge
						variant="secondary"
						key={ option.value }
						className="text-left"
					>
						{ option.label }
						<Button
							variant="ghost"
							className="h-fit w-fit p-0 text-muted-foreground hover:text-destructive"
							onClick={ handleRemove(option) }
						>
							<X className="h-3 w-3 ml-2" strokeWidth="2.5" />
						</Button>
					</Badge>
				))
			}
			</div>
			<ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
		</div>
	)
});
ComboboxPills.displayName = 'ComboboxPills';

export default ComboboxPills;