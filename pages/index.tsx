import { Stack, Container, Paper, AppShell, Group, Text, Divider, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { getAccounts } from '../api/getAccounts';
import { getExpenseSumByAccount } from '../api/getExpenseSumByAccount';
import { getIncomeSumByAccount } from '../api/getIncomeSumByAccount';

const accountsWithAmounts = [
  {
    accountName: 'Bradesco',
    color: 'rgb(255, 0, 0)',
    amount: 1000,
  },

  {
    accountName: 'Nuconta',
    color: 'rgb(130, 10, 209)',
    amount: 3000,
  },
];

const budgets = [
  {
    budgetName: 'travel',
    amount: 1000,
  },
  {
    budgetName: 'emergency',
    amount: 1000,
  },
  {
    budgetName: "mom's money",
    notMyOwn: true,
    amount: 500,
  },
];

const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.amount, 0);

const totalInAccounts = accountsWithAmounts.reduce((sum, account) => sum + account.amount, 0);

const notMyOwn = budgets.reduce((sum, budget) => {
  if (budget.notMyOwn) {
    return sum + budget.amount;
  }

  return sum;
}, 0);

const Shell = ({ children }: PropsWithChildren) => (
  <AppShell
    padding="md"
    // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
    // header={<Header height={60} p="xs">{/* Header content */}</Header>}
    styles={(theme) => ({
      main: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    })}
  >
    <Container>{children}</Container>
  </AppShell>
);

export default function HomePage() {
  const { data: accounts, isLoading: isLoadingAccounts } = useQuery(['accounts'], () =>
    getAccounts()
  );

  console.log(accounts);

  const isLoading = isLoadingAccounts;

  if (isLoading) {
    return (
      <Shell>
        <Loader />
      </Shell>
    );
  }

  return (
    <Shell>
      <Stack>
        {accounts?.map((account) => (
          <Paper
            shadow="xs"
            p="md"
            sx={(theme) => ({
              backgroundImage: account.color
                ? theme.fn.gradient({
                    from: theme.fn.rgba(account.color, 0.45),
                    to: theme.fn.rgba(account.color, 0),
                    deg: 45,
                  })
                : undefined,
            })}
          >
            <Group position="apart">
              <Text fw={700}>{account.name}</Text>
              <Text fw={700}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  account.balance / 100
                )}
              </Text>
            </Group>
          </Paper>
        ))}

        <Paper shadow="xs" p="md">
          <Stack spacing="xs">
            {budgets.map((budget) => (
              <Group key={budget.budgetName} position="apart">
                <Text fw={700}>
                  {budget.budgetName}
                  {budget.notMyOwn ? '*' : ''}
                </Text>
                <Text fw={700}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(budget.amount)}
                </Text>
              </Group>
            ))}
          </Stack>

          <Divider my="sm" variant="dashed" />

          <Stack spacing="xs">
            <Group position="apart">
              <Text c="dimmed">total in accounts</Text>
              <Text c="dimmed">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalInAccounts)}
              </Text>
            </Group>

            <Group position="apart">
              <Text c="dimmed">total budgeted</Text>
              <Text c="dimmed">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalBudgeted)}
              </Text>
            </Group>

            <Group position="apart">
              <Text c="dimmed">not my own</Text>
              <Text c="dimmed">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(notMyOwn)}
              </Text>
            </Group>

            <Group position="apart">
              <Text fw={700}>how much you have left</Text>
              <Text fw={700}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalInAccounts - totalBudgeted)}
              </Text>
            </Group>

            {/* <Group position="apart">
                  <Text fw={700}>not mine</Text>
                  <Text fw={700}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(budgets.reduce((sum, budget) => sum + budget.amount, 0))}
                  </Text>
                </Group>

                <Group position="apart">
                  <Text fw={700}>mine</Text>
                  <Text fw={700}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(budgets.reduce((sum, budget) => sum + budget.amount, 0))}
                  </Text>
                </Group> */}
          </Stack>
        </Paper>
      </Stack>
    </Shell>
  );
}
