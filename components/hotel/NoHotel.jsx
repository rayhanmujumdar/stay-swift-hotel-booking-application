export default function NoHotel() {
    return (
        <div className="flex gap-1 border border-gray/20 p-4 rounded-md flex-col">
            <h1 className="text-2xl text-[#FF6A28] font-bold">
                No Hotel Found
            </h1>
            <p className="font-semibold text-lg">
                No hotel available right now
            </p>
        </div>
    );
}
