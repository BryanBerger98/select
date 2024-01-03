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

const SearchSelectCity = () => {

	const [ options, setOptions ] = useState<ComboboxOption<City>[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const handleSearch = async (value: string) => {
		try {
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
		>
			<ComboboxTrigger asChild>
				<ComboboxValue placeholder="Select a city" className="w-full" />
			</ComboboxTrigger>
			<ComboboxContent>
				<ComboboxSearch onSearch={ handleSearch } />
				<div>
					<ComboboxLoader />
					<ComboboxNotFound />
					{ options.map((option) => (
						<ComboxboxItem key={ option.value } option={ option } />
					)) }
				</div>
			</ComboboxContent>
		</ Combobox>
	);
};

export default SearchSelectCity;