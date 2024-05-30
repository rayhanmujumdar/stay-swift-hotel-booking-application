import HotelList from '@/components/hotel/HotelList';
import Filter from '@/components/search/filter/Filter';
import Search from '@/components/search/Search';

function refineCategories(categories) {
    if (decodeURI(categories) === 'undefined') {
        return '';
    }
    return decodeURI(categories);
}
export default function HotelsPage({ searchParams }) {
    const { destination, checkIn, checkout, categories } = searchParams;
    return (
        <main>
            <section
                className={`bg-[url('/assets/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]`}
            >
                <div className="container items-center py-12 ">
                    <Search
                        fromList
                        destination={destination}
                        checkIn={checkIn}
                        checkout={checkout}
                    />
                </div>
            </section>
            <section className="py-12">
                <div className="container grid grid-cols-12">
                    <Filter />
                    <HotelList
                        destination={destination}
                        checkIn={checkIn}
                        checkout={checkout}
                        categories={refineCategories(categories)}
                    />
                </div>
            </section>
        </main>
    );
}
