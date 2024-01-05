import { ChangeEventHandler, ReactNode, forwardRef, useEffect, useState } from 'react';
import { ComboboxOption, useCombobox } from '.';
import { cn } from '@/lib/utils';
import { Input, InputProps } from '../ui/input';
import { Loader2 } from 'lucide-react';

type ComboboxAutoCompleteProps = {
	placeholder?: ReactNode;
	debounceDelay?: number;
	onSearch?: (value: string) => void;
	isLoading?: boolean;
} & Omit<InputProps, 'value'>;

let delay: NodeJS.Timeout;

const ComboboxAutoComplete = forwardRef<HTMLInputElement, ComboboxAutoCompleteProps>(({ placeholder = 'Start typing to autocomplete', className, onSearch, isLoading = false, debounceDelay = 400, ...props }, ref) => {

	const [ value, setValue ] = useState<string>('');

	const { mode, selected } = useCombobox();

	if (mode !== 'single') {
		throw new Error('ComboboxAutoComplete can only be used in single mode');
	}

	useEffect(() => {
		if (selected) {
			const { label } = selected as ComboboxOption;
			if (typeof label === 'string') setValue(label);
		}
	}, [ selected ]);

	useEffect(() => {
		() => {
			clearTimeout(delay);
		}
	}, []);

	const handleClearDelay = () => {
		if (onSearch) {
			clearTimeout(delay);
		}
	};

	const handleSearchValue: ChangeEventHandler<HTMLInputElement> = (event) => {
		const { value } = event.currentTarget;
		setValue(value);
		if (onSearch) {
			handleClearDelay();
			delay = setTimeout(() => {
				onSearch(value.trim());
			}, debounceDelay);
		}
	};

	return (
		<div className="relative">
			<Input
				placeholder={ placeholder }
				className={ cn('', className) }
				{ ...props }
				value={ value }
				onChange={ handleSearchValue }
				onKeyDown={ handleClearDelay }
				type="search"
				ref={ ref }
			/>
			{ isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground absolute right-3 inset-y-3" /> : null }
		</div>
	);
});
ComboboxAutoComplete.displayName = 'ComboboxAutoComplete';

export default ComboboxAutoComplete;