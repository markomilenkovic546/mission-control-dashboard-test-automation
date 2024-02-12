//Format date
export const formatDate = (dateString: string) => {
    const date: Date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    };
    const formattedDate: string = date
        .toLocaleDateString('en-US', options)
        .replace(/,/g, '');
    return formattedDate;
};

//Get current date
export const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}


