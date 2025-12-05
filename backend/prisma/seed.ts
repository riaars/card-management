import { PrismaClient, CardStatus, InvoiceStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ------------------------------------------------------------
  // 1. Company
  // ------------------------------------------------------------
  const company = await prisma.company.upsert({
    where: { id: 'company-seed-0001' },
    update: {},
    create: {
      id: 'company-seed-0001',
      name: 'Company AB',
      logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Company+AB',
    },
  });

  console.log('🏢 Company created:', company.id);

  // ------------------------------------------------------------
  // 2. Cards
  // ------------------------------------------------------------
  const card1 = await prisma.card.upsert({
    where: { id: 'card-seed-0001' },
    update: {},
    create: {
      id: 'card-seed-0001',
      companyId: company.id,
      maskedNumber: '•••• 1234',
      status: CardStatus.active,
      imageUrl: null,
      creditLimit: 10000,
      currency: 'SEK',
    },
  });

  const card2 = await prisma.card.upsert({
    where: { id: 'card-seed-0002' },
    update: {},
    create: {
      id: 'card-seed-0002',
      companyId: company.id,
      maskedNumber: '•••• 5678',
      status: CardStatus.inactive,
      imageUrl: null,
      creditLimit: 15000,
      currency: 'SEK',
    },
  });

  console.log('💳 Cards created:', [card1.id, card2.id]);

  // ------------------------------------------------------------
  // 3. Invoices
  // ------------------------------------------------------------
  const invoice1 = await prisma.invoice.create({
    data: {
      id: 'invoice-seed-0001',
      cardId: card1.id,
      status: InvoiceStatus.due,
      dueDate: new Date('2025-12-20'),
      amountDue: 5400,
      currency: 'SEK',
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      id: 'invoice-seed-0002',
      cardId: card2.id,
      status: InvoiceStatus.overdue,
      dueDate: new Date('2025-12-01'),
      amountDue: 8700,
      currency: 'SEK',
    },
  });

  console.log('📄 Invoices created:', [invoice1.id, invoice2.id]);

  // ------------------------------------------------------------
  // 4. Transactions (5 per card)
  // ------------------------------------------------------------
  const transactionData = [
    {
      description: 'Coffee Shop',
      amount: 45,
      category: 'Food',
      dataPointsSummary: 'Latte + Croissant',
    },
    {
      description: 'Taxi Ride',
      amount: 120,
      category: 'Transport',
      dataPointsSummary: 'Airport → Office',
    },
    {
      description: 'Cloud Subscription',
      amount: 300,
      category: 'Software',
      dataPointsSummary: 'Monthly fee',
    },
    {
      description: 'Hotel Booking',
      amount: 1400,
      category: 'Travel',
      dataPointsSummary: 'Business trip',
    },
    {
      description: 'Office Supplies',
      amount: 250,
      category: 'Office',
      dataPointsSummary: 'Stationery',
    },
  ];

  // Insert for card1
  for (let i = 0; i < transactionData.length; i++) {
    await prisma.transaction.create({
      data: {
        id: `tx-card1-${i}`,
        cardId: card1.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData[i].amount,
        currency: 'SEK',
        description: transactionData[i].description,
        category: transactionData[i].category,
        dataPointsSummary: transactionData[i].dataPointsSummary,
      },
    });
  }

  // Insert for card2
  for (let i = 0; i < transactionData.length; i++) {
    await prisma.transaction.create({
      data: {
        id: `tx-card2-${i}`,
        cardId: card2.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData[i].amount,
        currency: 'SEK',
        description: transactionData[i].description,
        category: transactionData[i].category,
        dataPointsSummary: transactionData[i].dataPointsSummary,
      },
    });
  }

  console.log('💸 Transactions created for both cards');

  // ------------------------------------------------------------
  // 5. Support contact
  // ------------------------------------------------------------
  await prisma.supportContact.upsert({
    where: { companyId: company.id },
    update: {},
    create: {
      companyId: company.id,
      phone: '+46 123 456 789',
      email: 'support@companyab.com',
      chatUrl: 'https://support.companyab.com/chat',
    },
  });

  console.log('☎ Support contact created');

  console.log('🌱 Database seed complete!');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
