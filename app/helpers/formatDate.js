import { format } from "date-fns";

const formatDate = (date) => {
    const formattedDate = new Date(date);
    return `${ format(formattedDate, 'do MMMM, yyyy') }`
}

export default formatDate;