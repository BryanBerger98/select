import { useState } from 'react';
import Combobox, { ComboboxOption } from '../combobox';
import ComboboxContent from '../combobox/combobox-content';
import ComboxboxItem from '../combobox/combobox-item';
import ComboboxLoader from '../combobox/combobox-loader';
import ComboboxNotFound from '../combobox/combobox-not-found';
import ComboboxSearch from '../combobox/combobox-search';
import ComboboxTrigger from '../combobox/combobox-trigger';
import ComboboxValue from '../combobox/combobox-value';
import { City, fetchFrenchCitiesByName } from '@/vendors/cities.vendor';
import ComboboxGroup from '../combobox/combobox-group';
import ComboboxSeparator from '../combobox/combobox-separator';

const SearchSelectCitiesWithSelection = () => {

	const [ options, setOptions ] = useState<ComboboxOption<City>[]>([]);
	const [ selectedOptions, setSelectedOptions ] = useState<ComboboxOption[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [ searchValue, setSearchValue ] = useState<string>('');

	const handleSearch = async (value: string) => {
		try {
			setIsLoading(true);
			const cities = await fetchFrenchCitiesByName({ name: value, limit: 10 });
			setOptions(cities.map((city) => ({
				value: city.code,
				label: `${city.nom} (${ city.departement.code })`,
				data: city,
			})));
			setSearchValue(value);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelect = (value: string) => () => {
		setSelectedOptions((prevSelectedOptions) => {
			const option = options.find((option) => option.value === value);
			const existingOption = prevSelectedOptions.find((option) => option.value === value);
			if (existingOption) {
				return prevSelectedOptions.filter((option) => option.value !== value);
			}
			if (option && !existingOption) {
				return [ ...prevSelectedOptions, option ];
			}
			return prevSelectedOptions;
		});
	};

	const handleBlur = () => {
		setSearchValue('');
		setOptions([]);
	};

	const handleChange = (value: ComboboxOption<City>[]) => {
		if (!value) {
			setSelectedOptions([]);
			return;
		}
		if (Array.isArray(value)) {
			setSelectedOptions(value);
		} else {
			setSelectedOptions([ value ]);
		}
	};

	return (
		<Combobox
			onSearch={ handleSearch }
			options={ options }
			onSelect={ handleChange }
			mode='multiple'
			isLoading={ isLoading }
			onBlur={ handleBlur }
		>
			<ComboboxTrigger asChild>
				<ComboboxValue placeholder="Select a city" className="w-full" />
			</ComboboxTrigger>
			<ComboboxContent>
				<ComboboxSearch onSearch={ handleSearch } />
				{ (searchValue.length > 0 || selectedOptions.length > 0) && <ComboboxSeparator className="mt-1" /> }
				{
					selectedOptions.length > 0 ? (
						<ComboboxGroup heading="Selected">
							{ selectedOptions.map((option) => (
								<ComboxboxItem key={ option.value } option={ option } onClick={ handleSelect(option.value) } />
							)) }
						</ComboboxGroup>
					) : null
				}
				{ options.length > 0 && selectedOptions.length > 0 && <ComboboxSeparator /> }
				{
					searchValue.length > 0 ? (
						<ComboboxGroup heading="Results">
							<ComboboxLoader />
							<ComboboxNotFound />
							{ options.filter(option => !selectedOptions.find(opt => opt.value === option.value)).map((option) => (
								<ComboxboxItem key={ option.value } option={ option } onClick={ handleSelect(option.value) } />
							)) }
						</ComboboxGroup>
					) : null
				}
			</ComboboxContent>
		</ Combobox>
	);
};

export default SearchSelectCitiesWithSelection;