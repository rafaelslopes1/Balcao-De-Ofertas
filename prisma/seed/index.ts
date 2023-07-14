import { currencies } from './data/currencies';
import { users } from './data/users';
import { wallets } from './data/wallets';

import { prisma } from '@/lib/prisma';
import { Currency, User, Wallet } from '@prisma/client';

async function runSeeders() {
  await Promise.all(
    currencies.map(async (currency: Currency) =>
      prisma.currency.upsert({
        where: { id: currency.id },
        update: {},
        create: currency
      })
    )
  );

  await Promise.all(
    users.map(async (user: User) =>
      prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user
      })
    )
  );

  await Promise.all(
    wallets.map(async (wallet: Wallet) =>
      prisma.wallet.upsert({
        where: { id: wallet.id },
        update: {},
        create: wallet
      })
    )
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });