import { useState } from 'react';
import Combobox, { ComboboxOption } from '../combobox';
import ComboboxContent from '../combobox/combobox-content';
import ComboxboxItem from '../combobox/combobox-item';
import ComboboxLoader from '../combobox/combobox-loader';
import ComboboxNotFound from '../combobox/combobox-not-found';
import ComboboxSearch from '../combobox/combobox-search';
import ComboboxTrigger from '../combobox/combobox-trigger';
import { City, fetchFrenchCitiesByName } from '@/vendors/cities.vendor';
import ComboboxSeparator from '../combobox/combobox-separator';
import ComboboxPills from '../combobox/combobox-pills';

const SearchMultiSelectCities = () => {

	const [ options, setOptions ] = useState<ComboboxOption<City>[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [ searchValue, setSearchValue ] = useState<string>('');

	const handleSearch = async (value: string) => {
		try {
			setSearchValue(value);
			setIsLoading(true);
			const cities = await fetchFrenchCitiesByName({ name: value, limit: 10 });
			setOptions(cities.map((city) => ({
				value: city.code,
				label: `${city.nom} (${ city.departement.code })`,
				data: city,
			})));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Combobox
			onSearch={ handleSearch }
			options={ options }
			isLoading={ isLoading }
			mode="multiple"
		>
			<ComboboxTrigger className="h-fit">
				<ComboboxPills placeholder="Select a city" className="w-full" />
			</ComboboxTrigger>
			<ComboboxContent>
				<ComboboxSearch onSearch={ handleSearch } />
				{ options.length > 0 && <ComboboxSeparator className="mt-1" /> }
				<div>
					<ComboboxLoader />
					{ searchValue.length > 0 && <ComboboxNotFound /> }
					{ options.map((option) => (
						<ComboxboxItem key={ option.value } option={ option } />
					)) }
				</div>
			</ComboboxContent>
		</ Combobox>
	);
};

export default SearchMultiSelectCities;