import client from './client';

export const getExpenseSumByAccount = async () => {
  const { data, error } = await client.from('expense_sum_by_account').select('*');

  if (error) {
    const newError = new Error('Error while getting expenses sum by account.');

    throw newError;
  }

  return data;
};
