import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Popover } from '../ui/popover';

type PointerDownOutsideEvent = CustomEvent<{
    originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
    originalEvent: FocusEvent;
}>;

export type ComboboxMode = 'single' | 'multiple';

export type ComboboxOption<TData = unknown> = {
	value: string;
	label: string | ReactNode;
	data?: TData | undefined;
};

export type ComboboxSingleOption<TData = unknown> = ComboboxOption<TData> | null;
export type ComboboxMultipleOptions<TData = unknown> = ComboboxOption<TData>[];
export type ComboboxSelection<TMode extends ComboboxMode = 'single', TData = unknown> = TMode extends 'single' ? ComboboxSingleOption<TData> : ComboboxMultipleOptions<TData>;

type ControlledSelectHandler<TData = unknown> = (value: ComboboxOption<TData>) => void;
type UncontrolledSelectHandler<TMode extends ComboboxMode = 'single', TData = unknown> = (value: ComboboxSelection<TMode, TData>) => void;

type ComboboxPropsBase<TMode extends ComboboxMode = 'single', TData = unknown> = {
	children: ReactNode;
	options: ComboboxOption<TData>[];
	debounceDelay?: number;
	onSearch?: (value: string) => void;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	isLoading?: boolean;
	defaultSelected?: ComboboxSelection<TMode, TData>;
	mode?: TMode;
	onBlur?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
};

type ControlledComboboxProps<TMode extends ComboboxMode = 'single', TData = unknown> = ComboboxPropsBase<TMode, TData> & {
	selected: ComboboxSelection<TMode, TData>;
	onSelect: ControlledSelectHandler<TData>;
};

type UncontrolledComboboxProps <TMode extends ComboboxMode = 'single', TData = unknown> = ComboboxPropsBase<TMode, TData> & {
	selected?: undefined;
	onSelect?: UncontrolledSelectHandler<TMode, TData>;
};

type ComboboxProps<TMode extends ComboboxMode = 'single', TData = unknown> = ControlledComboboxProps<TMode, TData> | UncontrolledComboboxProps<TMode, TData>;

type ComboboxValue<TMode extends ComboboxMode = ComboboxMode, TData = unknown> = {
	isLoading?: boolean;
	onBlur: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
	options: ComboboxOption<TData>[];
	selected: ComboboxSelection<TMode, TData>;
	selectOption: (option: ComboboxOption) => void;
	mode: TMode;
};

const ComboboxContext = createContext<ComboboxValue | null>(null);

export const useCombobox = <TMode extends ComboboxMode = ComboboxMode, TData = unknown>() => {
	const context = useContext(ComboboxContext);
	if (!context) {
		throw new Error('useCombobox must be used within a Combobox');
	}
	return context as ComboboxValue<TMode, TData>;
}

const Combobox = <TMode extends ComboboxMode = 'single', TData = unknown>({
	mode: selectedMode,
	children,
	options,
	isOpen,
	onOpenChange: handleOpenChange,
	isLoading = false,
	defaultSelected,
	onBlur,
	selected: selectedFromProps,
	onSelect,
}: ComboboxProps<TMode, TData>) => {

	const mode = selectedMode || 'single';

	const isControlled = typeof selectedFromProps != 'undefined';

	const [ internalSelected, setInternalSelected ] = useState<ComboboxSelection<TMode, TData>>(() => {
		if (mode === 'multiple') {
			return (defaultSelected || []) as ComboboxSelection<TMode, TData>;
		}
		return (defaultSelected || null) as ComboboxSelection<TMode, TData>;
	});

	const selected = isControlled ? selectedFromProps : internalSelected;

	useEffect(() => {
		if (!isControlled && onSelect) {
			(onSelect as UncontrolledSelectHandler<TMode, TData>)(selected as ComboboxSelection<TMode, TData>);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ selected ]);

	const handleBlur = useCallback((event: PointerDownOutsideEvent | FocusOutsideEvent) => {
		if (onBlur) {
			onBlur(event);
		}
	}, [ onBlur ]);

	const handleSelectOption = useCallback((option: ComboboxOption<TData>) => {

		if (isControlled) {
			if (onSelect) {
				(onSelect as ControlledSelectHandler<TData>)(option as ComboboxOption<TData>);
			}
			return;
		}

		if (mode === 'single') {
			setInternalSelected(option as ComboboxSelection<TMode, TData>);
		}

		if (mode === 'multiple') {
			setInternalSelected((prevSelected) => {
				if (!prevSelected) {
					return [ option ] as ComboboxSelection<TMode, TData>;
				}
				if (Array.isArray(prevSelected)) {
					const alreadySelectedOption = prevSelected.find((prevOption) => prevOption.value === option.value);
					if (alreadySelectedOption) {
						return prevSelected.filter((prevOption) => prevOption.value !== option.value) as ComboboxSelection<TMode, TData>;
					}
					return [ ...prevSelected, option ] as ComboboxSelection<TMode, TData>;
				}
				return prevSelected as ComboboxSelection<TMode, TData>;
			});
		}
	}, [ mode, isControlled, onSelect ]);

	const contextValue = useMemo(() => ({
		options,
		onBlur: handleBlur,
		isLoading,
		selected,
		selectOption: handleSelectOption,
		mode,
	}), [
		handleBlur,
		isLoading,
		options,
		selected,
		handleSelectOption,
		mode,
	]);

	return (
		<ComboboxContext.Provider value={ contextValue as ComboboxValue<TMode, TData>}>
			<Popover
				open={ isOpen }
				onOpenChange={ handleOpenChange }
			>
				{ children }
			</Popover>
		</ComboboxContext.Provider>
	);
};

export default Combobox;
Combobox.displayName = 'Combobox';