import SearchSelectCities from './components/features/SearchSelectCities';
import SearchSelectCitiesWithSelection from './components/features/SearchSelectCitiesWithSelection';
import SearchSelectCity from './components/features/SearchSelectCity';

const App = () => {

	return (
		<main className="container mx-auto py-8 space-y-8">
			<h1 className="text-4xl font-bold text-center">Select</h1>

			<div className="grid grid-cols-3 max-w-[700x] gap-4">
				<div className="col-span-1">
					<SearchSelectCity />
				</div>
				<div className="col-span-1">
					<SearchSelectCities />
				</div>
				<div className="col-span-1">
					<SearchSelectCitiesWithSelection />
				</div>
			</div>
		</main>
	)
};

export default App;