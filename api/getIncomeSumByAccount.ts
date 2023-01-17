import client from './client';

export const getIncomeSumByAccount = async () => {
  const { data, error } = await client.from('income_sum_by_account').select('*');

  if (error) {
    const newError = new Error('Error while getting incomes sum by account.');

    throw newError;
  }

  return data;
};
