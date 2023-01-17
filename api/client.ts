import wretch from 'wretch';

const client = wretch(process.env.NEXT_PUBLIC_API_URL);

export default client;
