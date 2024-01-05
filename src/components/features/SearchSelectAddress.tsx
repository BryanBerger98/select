import { useState } from 'react';
import Combobox, { ComboboxOption } from '../combobox';
import ComboboxContent from '../combobox/combobox-content';
import ComboxboxItem from '../combobox/combobox-item';
import ComboboxLoader from '../combobox/combobox-loader';
import ComboboxNotFound from '../combobox/combobox-not-found';
import ComboboxAutoComplete from '../combobox/combobox-autocomplete';
import ComboboxAnchor from '../combobox/combobox-anchor';
import { VendorAddress, fetchSearchFrenchAdresses } from '@/vendors/addresses.vendor';

const SearchSelectAddress = () => {

	const [ isOpen, setIsOpen ] = useState<boolean>(false);
	const [ options, setOptions ] = useState<ComboboxOption<VendorAddress>[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [ searchValue, setSearchValue ] = useState<string>('');

	const handleSearch = async (value: string) => {
		try {
			setSearchValue(value);
			setIsLoading(true);
			setIsOpen(true);
			const addresses = await fetchSearchFrenchAdresses({ query: value });
			setOptions(addresses.map((address) => ({
				value: address.id,
				label:`${ address.name }, ${ address.postcode } ${ address.city.toUpperCase() }`,
				data: address,
			})));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleOpenChange = (open: boolean) => setIsOpen(open);

	const handleOpenAutoFocus = (event: Event) => {
		event.preventDefault();
	};

	return (
		<Combobox
			onSearch={ handleSearch }
			options={ options }
			isLoading={ isLoading }
			onOpenChange={ handleOpenChange }
			onBlur={ () => setIsOpen(false) }
			isOpen={ isOpen }
		>
			<ComboboxAutoComplete placeholder="Select a city" onSearch={ handleSearch } className="w-full" />
			<ComboboxAnchor />
			<ComboboxContent onOpenAutoFocus={ handleOpenAutoFocus }>
				<div>
					<ComboboxLoader />
					{ searchValue.length > 0 && <ComboboxNotFound /> }
					{ options.map((option) => (
						<ComboxboxItem key={ option.value } option={ option } />
					)) }
				</div>
			</ComboboxContent>
		</Combobox>
	);
};

export default SearchSelectAddress;