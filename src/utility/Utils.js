import moment from "moment"

export const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + 'M' // convert to M for number from > 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'B' // convert to M for number from > 1 million 
    } else if (num < 900) {
        return num // if value < 1000, nothing to do
    }
}

export const formatDateTime = datetime => {
    return moment(datetime).format('MMM D YYYY, HH:mm')
}