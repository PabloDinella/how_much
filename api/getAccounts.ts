import z from 'zod';
import client from './client';

const schema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    balance: z.number(),
    color: z.string().default('#000'),
  })
);

type Balance = z.TypeOf<typeof schema>;

export const getAccounts = async () => {
  const data = await client.get('/balance').json<Balance>();

  console.log(data);

  return data;
};
