import moment from 'moment';

export const formatDate = (unix: number, format = 'DD/MM/YYYY LT') => (unix ? moment.unix(unix).format(format) : 'N/A');
