import client from './client';

export const getAccounts = async () => {
  const { data, error } = await client.from('accounts_and_credit_cards').select('*');

  if (error) {
    const newError = new Error('Error while getting accounts');

    throw newError;
  }

  return data;
};
