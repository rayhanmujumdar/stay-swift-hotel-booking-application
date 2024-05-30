'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FilterByCategory() {
    const [categories, setCategories] = useState([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const params = new URLSearchParams(searchParams);
    useEffect(() => {
        const categories = params.get('categories');
        if (categories) {
            const decodedCategory = decodeURI(categories);
            setCategories(decodedCategory.split('|'));
        }
    }, []);
    useEffect(() => {
        if (categories.length > 0) {
            params.set('categories', encodeURI(categories.join('|')));
        } else {
            params.delete('categories');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [categories]);

    const handleChange = event => {
        const name = event.target.name;
        const checked = event.target.checked;
        if (checked) {
            setCategories(prev => [...prev, name]);
        } else {
            const updateCategories = categories.filter(
                category => category !== name
            );
            setCategories(updateCategories);
        }
    };

    return (
        <div>
            <h3 className="font-bold text-lg">Star Category</h3>
            <form action="" className="flex flex-col gap-2 mt-2">
                <label htmlFor="fiveStar">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="5"
                        id="fiveStar"
                        checked={categories.includes('5')}
                    />
                    5 Star
                </label>

                <label htmlFor="fourStar">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="4"
                        id="fourStar"
                        checked={categories.includes('4')}
                    />
                    4 Star
                </label>

                <label htmlFor="threeStar">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="3"
                        id="threeStar"
                        checked={categories.includes('3')}
                    />
                    3 Star
                </label>

                <label htmlFor="twoStar">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="2"
                        id="twoStar"
                        checked={categories.includes('2')}
                    />
                    2 Star
                </label>

                <label htmlFor="oneStar">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="1"
                        id="oneStar"
                        checked={categories.includes('1')}
                    />
                    1 Star
                </label>
            </form>
        </div>
    );
}
