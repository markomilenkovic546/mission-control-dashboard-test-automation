// Format date
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
