// Function to convert date object to YYYY-MM-DD format
export const formatDate = (date: Date) => {
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);

    return `${year}-${month}-${day}`;
}

export const stringToDate = (dateString: string) => {
    const datePieces = dateString.split("-");

    return new Date(`${datePieces[1]}-${datePieces[2]}-${datePieces[0]}`);
}