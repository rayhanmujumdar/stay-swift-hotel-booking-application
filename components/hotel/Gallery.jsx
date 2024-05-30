import Image from 'next/image';

export default function Gallery({ gallery = [] }) {
    const newGallery = [...gallery];
    newGallery.shift();
    return (
        <section className="container">
            <div className="grid grid-cols-2 imageshowCase">
                <Image
                    src={gallery[0]}
                    className="h-[400px]"
                    alt=""
                    width={400}
                    height={400}
                />

                <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
                    {newGallery.map(photoUrl => (
                        <img src={photoUrl} alt="gallery image" />
                    ))}
                </div>
            </div>
        </section>
    );
}
