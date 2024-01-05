import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ChangeEventHandler, useEffect } from 'react';

type ComboboxSearchProps = {
	placeholder?: string;
	debounceDelay?: number;
	onSearch?: (value: string) => void;
}

let delay: NodeJS.Timeout;

const ComboboxSearch = ({ placeholder = '', debounceDelay = 400, onSearch }: ComboboxSearchProps) => {

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
		if (onSearch) {
			handleClearDelay();
			delay = setTimeout(() => {
				onSearch(value.trim());
			}, debounceDelay);
		}
	};

	return (
		<div className="flex items-center px-3 overflow-hidden -mx-1">
			<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
			<Input
				className="flex h-8 w-full rounded-none bg-transparent py-3 px-0 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 border-0"
				placeholder={ placeholder || 'Search...' }
				type="search"
				onChange={ handleSearchValue }
				onKeyDown={ handleClearDelay }
			/>
		</div>
	)
};

export default ComboboxSearch;