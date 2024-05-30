import SortHotelsByPrice from '../sort/SortHotelsByPrice';
import FilterByAmenities from './FilterByAmenities';
import FilterByCategory from './FilterByCategory';
import FilterByPriceRange from './FilterByPriceRange';

export default function Filter() {
    return (
        <div className="col-span-3 space-y-4">
            <SortHotelsByPrice />
            <FilterByPriceRange />
            <FilterByCategory />
            <FilterByAmenities />
        </div>
    );
}
