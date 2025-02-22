const capitalizeWords = (str) => {
    if (typeof str !== "string" || !str) return str;

    return str
        .split(/\s+/) // Split on one or more spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};


export default capitalizeWords;