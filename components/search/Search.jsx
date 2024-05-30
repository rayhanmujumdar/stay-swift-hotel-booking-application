'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Search({ fromList, destination, checkIn, checkout }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState({
        destination: destination || 'Puglia',
        checkIn: checkIn,
        checkout: checkout,
    });
    const handleInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        const newSearchTerm = { ...searchTerm, [name]: value };
        setSearchTerm(newSearchTerm);
    };
    const doSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.set('destination', searchTerm.destination);
        if (searchTerm.checkIn && searchTerm.checkout) {
            params.set('checkout', searchTerm.checkout);
            params.set('checkIn', searchTerm.checkIn);
        }
        if (pathname.includes('hotels')) {
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            router.replace(`${pathname}hotels?${params.toString()}`);
        }
    };
    return (
        <>
            <div className="lg:max-h-[250px] mt-6">
                <div id="searchParams">
                    <div>
                        <span>Destination</span>
                        <h4 className="mt-2">
                            <select
                                onChange={handleInput}
                                name="destination"
                                id="destination"
                                defaultValue={searchTerm.destination}
                            >
                                <option value="Puglia">Puglia</option>
                                <option value="Catania">Catania</option>
                                <option value="Palermo">Palermo</option>
                                <option value="Frejus">Frejus</option>
                                <option value="Paris">Paris</option>
                            </select>
                        </h4>
                    </div>

                    <div>
                        <span>Check in</span>
                        <h4 className="mt-2">
                            <input
                                onChange={handleInput}
                                type="date"
                                name="checkIn"
                                id="checkIn"
                                value={searchTerm.checkIn}
                            />
                        </h4>
                    </div>

                    <div>
                        <span>Checkout</span>
                        <h4 className="mt-2">
                            <input
                                onChange={handleInput}
                                type="date"
                                name="checkout"
                                id="checkout"
                                value={searchTerm.checkout}
                            />
                        </h4>
                    </div>
                </div>
            </div>
            <button onClick={doSearch} className="search-btn">
                🔍️ {fromList ? 'Modify Search' : 'Search'}
            </button>
        </>
    );
}
