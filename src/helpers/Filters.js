

export const filterData = (data, filterStr) => {
    let filteredData = Object.values(Object.fromEntries(Object.entries(data).filter((value) => {
        let values = Object.values(value[1])
        let flag = false;
        Object.values(values).forEach((val) => {
            if (String(val).indexOf(filterStr) > -1) {
                flag = true;
                return;
            }
        });
        if (flag) return values;
        return null;
    })))
    return filteredData;
}

export const paginateData = (data, start, end) => {
    let filteredData = Object.values(Object.fromEntries(Object.entries(data).filter((v, i) => i >= start && i < end)));
    return filteredData;
}