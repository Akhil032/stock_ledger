// sortingUtils.js

// Comparator function for sorting
export function getComparator(order, orderBy) {
    return (a, b) => {
        const aValue = isNaN(a[orderBy]) ? a[orderBy]?.toLowerCase() || a[orderBy] : a[orderBy];
        const bValue = isNaN(b[orderBy]) ? b[orderBy]?.toLowerCase() || b[orderBy] : b[orderBy];

        if (aValue === "NULL" || bValue === "NULL") {
            return aValue === "NULL" ? -1 : bValue === "NULL" ? 1 : 0;
        }

        // For descending order, reverse the comparison result
        if (order === 'desc') {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }

        // For ascending order, default comparison
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    };
}

// Stable sort function
export function stableSort(array, comparator) {
    
    return array
        .map((el, index) => [el, index])
        .sort((a, b) => {
            const order = comparator(a[0], b[0]);
            return order !== 0 ? order : a[1] - b[1];
        })
        .map((el) => el[0]);
}

// Function to handle sorting state changes
export const handleRequestSort = (event, property, setOrder, setOrderBy, order, orderBy) => {
    setOrder((prevOrder) => (orderBy === property?.id && prevOrder === 'asc' ? 'desc' : 'asc'));
    setOrderBy(property?.id);
};
