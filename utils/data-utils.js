export const replaceMongoIdInArray = array => {
    return array
        .map(item => {
            return {
                ...item,
                id: item._id.toString(),
            };
        })
        .map(({ _id, ...rest }) => rest);
};

export const replaceMongoIdInObject = object => {
    const { _id, ...rest } = { ...object, id: object?._id.toString() };
    return rest;
};

export const isBookedHotelRoom = (date, from, to) => {
    return (
        new Date(date).getTime() >= new Date(from).getTime() &&
        new Date(date).getTime() <= new Date(to).getTime()
    );
};

export const getDateDistance = (from, to) => {
    const fromDate = new Date(from).getTime();
    const toDate = new Date(to).getTime();
    const remainingDays = toDate - fromDate;
    return remainingDays / (24 * 60 * 60 * 1000) + 1;
};
