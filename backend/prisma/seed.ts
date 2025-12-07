import {
  PrismaClient,
  CardStatus,
  InvoiceStatus,
  CardType,
} from '@prisma/client';

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

  const company1 = await prisma.company.upsert({
    where: { id: 'company-seed-0002' },
    update: {},
    create: {
      id: 'company-seed-0002',
      name: 'Foretag AB',
      logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Foretag+AB',
    },
  });

  console.log('🏢 Company created:', [company.id, company1.id]);

  // ------------------------------------------------------------
  // 2. Cards
  // ------------------------------------------------------------
  const card1 = await prisma.card.upsert({
    where: { id: 'card-seed-0001' },
    update: { id: 'card-seed-0001' },
    create: {
      id: 'card-seed-0001',
      companyId: company.id,
      maskedNumber: '•••• 1234',
      status: CardStatus.active,
      imageUrl: null,
      creditLimit: 50000,
      currency: 'SEK',
      cardHolderName: 'John Doe',
      expiry: '12/26',
      cardType: CardType.mastercard,
    },
  });

  const card2 = await prisma.card.upsert({
    where: { id: 'card-seed-0002' },
    update: { id: 'card-seed-0002' },
    create: {
      id: 'card-seed-0002',
      companyId: company.id,
      maskedNumber: '•••• 5678',
      status: CardStatus.inactive,
      imageUrl: null,
      creditLimit: 5000,
      currency: 'SEK',
      cardHolderName: 'John Doe',
      expiry: '12/26',
      cardType: CardType.mastercard,
    },
  });

  const card3 = await prisma.card.upsert({
    where: { id: 'card-seed-0003' },
    update: { id: 'card-seed-0003' },
    create: {
      id: 'card-seed-0003',
      companyId: company1.id,
      maskedNumber: '•••• 1457',
      status: CardStatus.active,
      imageUrl: null,
      creditLimit: 10000,
      currency: 'SEK',
      cardHolderName: 'John Doe',
      expiry: '12/26',
      cardType: CardType.visa,
    },
  });

  const card4 = await prisma.card.upsert({
    where: { id: 'card-seed-0004' },
    update: { id: 'card-seed-0004' },
    create: {
      id: 'card-seed-0004',
      companyId: company1.id,
      maskedNumber: '•••• 7890',
      status: CardStatus.inactive,
      imageUrl: null,
      creditLimit: 15000,
      currency: 'SEK',
      cardHolderName: 'John Doe',
      expiry: '12/26',
      cardType: CardType.visa,
    },
  });

  console.log('💳 Cards created:', [card1.id, card2.id, card3.id, card4.id]);

  // ------------------------------------------------------------
  // 3. Invoices
  // ------------------------------------------------------------
  const invoice1 = await prisma.invoice.upsert({
    where: { id: 'invoice-seed-0001' },
    update: {},
    create: {
      id: 'invoice-seed-0001',
      cardId: card1.id,
      status: InvoiceStatus.due,
      dueDate: new Date('2025-12-20'),
      amountDue: 5400,
      currency: 'SEK',
    },
  });

  const invoice2 = await prisma.invoice.upsert({
    where: { id: 'invoice-seed-0002' },
    update: {},
    create: {
      id: 'invoice-seed-0002',
      cardId: card2.id,
      status: InvoiceStatus.overdue,
      dueDate: new Date('2025-12-01'),
      amountDue: 8700,
      currency: 'SEK',
    },
  });

  const invoice3 = await prisma.invoice.upsert({
    where: { id: 'invoice-seed-0003' },
    update: {},
    create: {
      id: 'invoice-seed-0003',
      cardId: card3.id,
      status: InvoiceStatus.overdue,
      dueDate: new Date('2025-12-01'),
      amountDue: 8700,
      currency: 'SEK',
    },
  });

  const invoice4 = await prisma.invoice.upsert({
    where: { id: 'invoice-seed-0004' },
    update: {},
    create: {
      id: 'invoice-seed-0004',
      cardId: card4.id,
      status: InvoiceStatus.overdue,
      dueDate: new Date('2025-12-01'),
      amountDue: 8700,
      currency: 'SEK',
    },
  });

  console.log('📄 Invoices created:', [
    invoice1.id,
    invoice2.id,
    invoice3.id,
    invoice4.id,
  ]);

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
    await prisma.transaction.upsert({
      where: { id: `tx-card1-${i}` },
      update: { id: `tx-card1-${i}` },
      create: {
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

  const transactionData2 = [
    {
      description: 'Grocery Store',
      amount: 220,
      category: 'Groceries',
      dataPointsSummary: 'Weekly essentials',
    },
    {
      description: 'Online Course',
      amount: 550,
      category: 'Education',
      dataPointsSummary: 'UI/UX Masterclass',
    },
    {
      description: 'Gym Membership',
      amount: 180,
      category: 'Health',
      dataPointsSummary: 'Monthly subscription',
    },
    {
      description: 'Electricity Bill',
      amount: 320,
      category: 'Utilities',
      dataPointsSummary: 'January usage',
    },
    {
      description: 'Movie Tickets',
      amount: 90,
      category: 'Entertainment',
      dataPointsSummary: 'Saturday night show',
    },
  ];

  // Insert for card2
  for (let i = 0; i < transactionData2.length; i++) {
    await prisma.transaction.upsert({
      where: { id: `tx-card2-${i}` },
      update: {
        id: `tx-card2-${i}`,
        cardId: card2.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData2[i].amount,
        currency: 'SEK',
        description: transactionData2[i].description,
        category: transactionData2[i].category,
        dataPointsSummary: transactionData2[i].dataPointsSummary,
      },
      create: {
        id: `tx-card2-${i}`,
        cardId: card2.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData2[i].amount,
        currency: 'SEK',
        description: transactionData2[i].description,
        category: transactionData2[i].category,
        dataPointsSummary: transactionData2[i].dataPointsSummary,
      },
    });
  }

  const transactionData3 = [
    {
      description: 'Bookstore Purchase',
      amount: 185,
      category: 'Education',
      dataPointsSummary: 'Design books',
    },
    {
      description: 'Coffee Beans Delivery',
      amount: 95,
      category: 'Food',
      dataPointsSummary: 'Premium roast',
    },
    {
      description: 'Streaming Subscription',
      amount: 129,
      category: 'Entertainment',
      dataPointsSummary: 'Monthly renewal',
    },
    {
      description: 'Home Cleaning Service',
      amount: 450,
      category: 'Home',
      dataPointsSummary: '2-hour session',
    },
    {
      description: 'Mobile Data Package',
      amount: 160,
      category: 'Utilities',
      dataPointsSummary: '20GB internet top-up',
    },
    {
      description: 'Workshop Fee',
      amount: 600,
      category: 'Professional',
      dataPointsSummary: 'Leadership session',
    },
    {
      description: 'Bakery Purchase',
      amount: 55,
      category: 'Food',
      dataPointsSummary: 'Fresh pastries',
    },
    {
      description: 'Public Transport Pass',
      amount: 300,
      category: 'Transport',
      dataPointsSummary: 'Monthly commuter pass',
    },
    {
      description: 'Pet Supplies',
      amount: 210,
      category: 'Personal',
      dataPointsSummary: 'Dog food + treats',
    },
    {
      description: 'Hardware Store',
      amount: 340,
      category: 'Home',
      dataPointsSummary: 'DIY materials',
    },
    {
      description: 'Laundry Service',
      amount: 130,
      category: 'Home',
      dataPointsSummary: 'Wash & fold',
    },
    {
      description: 'Car Fuel',
      amount: 480,
      category: 'Transport',
      dataPointsSummary: 'Full tank refill',
    },
    {
      description: 'Spa Treatment',
      amount: 750,
      category: 'Wellness',
      dataPointsSummary: 'Relaxation package',
    },
    {
      description: 'Delivery Order',
      amount: 95,
      category: 'Food',
      dataPointsSummary: 'Lunch takeaway',
    },
    {
      description: 'Conference Ticket',
      amount: 1500,
      category: 'Professional',
      dataPointsSummary: 'Tech summit pass',
    },
    {
      description: 'Water Bill',
      amount: 110,
      category: 'Utilities',
      dataPointsSummary: 'Monthly usage',
    },
    {
      description: 'Clothing Store',
      amount: 420,
      category: 'Shopping',
      dataPointsSummary: 'New jacket',
    },
    {
      description: 'Parking Fee',
      amount: 35,
      category: 'Transport',
      dataPointsSummary: 'Downtown garage',
    },
    {
      description: 'Pharmacy Purchase',
      amount: 60,
      category: 'Health',
      dataPointsSummary: 'Vitamins + supplements',
    },
    {
      description: 'Music Lessons',
      amount: 300,
      category: 'Education',
      dataPointsSummary: 'Piano session',
    },
  ];

  // Insert for card3
  for (let i = 0; i < transactionData3.length; i++) {
    await prisma.transaction.upsert({
      where: { id: `tx-card3-${i}` },
      update: {
        id: `tx-card3-${i}`,
        cardId: card3.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData3[i].amount,
        currency: 'SEK',
        description: transactionData3[i].description,
        category: transactionData3[i].category,
        dataPointsSummary: transactionData3[i].dataPointsSummary,
      },
      create: {
        id: `tx-card3-${i}`,
        cardId: card3.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData3[i].amount,
        currency: 'SEK',
        description: transactionData3[i].description,
        category: transactionData3[i].category,
        dataPointsSummary: transactionData3[i].dataPointsSummary,
      },
    });
  }

  const transactionData4 = [
    {
      description: 'Farmers Market',
      amount: 160,
      category: 'Groceries',
      dataPointsSummary: 'Fresh produce',
    },
    {
      description: 'Ride-Hailing Service',
      amount: 75,
      category: 'Transport',
      dataPointsSummary: 'City center → Home',
    },
    {
      description: 'Furniture Assembly',
      amount: 900,
      category: 'Home',
      dataPointsSummary: 'Bedroom desk setup',
    },
    {
      description: 'Online Fitness Class',
      amount: 120,
      category: 'Health',
      dataPointsSummary: 'HIIT session',
    },
    {
      description: 'Cosmetics Store',
      amount: 245,
      category: 'Shopping',
      dataPointsSummary: 'Skincare essentials',
    },
    {
      description: 'Bakery Delivery',
      amount: 80,
      category: 'Food',
      dataPointsSummary: 'Fresh sourdough',
    },
    {
      description: 'Airport Shuttle',
      amount: 150,
      category: 'Transport',
      dataPointsSummary: 'Hotel → Airport',
    },
    {
      description: 'Software License',
      amount: 410,
      category: 'Software',
      dataPointsSummary: 'Annual renewal',
    },
    {
      description: 'Dog Grooming Service',
      amount: 300,
      category: 'Personal',
      dataPointsSummary: 'Full grooming',
    },
    {
      description: 'Home Internet Bill',
      amount: 280,
      category: 'Utilities',
      dataPointsSummary: 'Fiber connection',
    },
    {
      description: 'Hardware Store',
      amount: 190,
      category: 'Home',
      dataPointsSummary: 'Tools + screws',
    },
    {
      description: 'Ice Cream Shop',
      amount: 35,
      category: 'Food',
      dataPointsSummary: '2 scoops gelato',
    },
    {
      description: 'Book Club Subscription',
      amount: 95,
      category: 'Education',
      dataPointsSummary: 'Monthly book pick',
    },
    {
      description: 'Yoga Studio',
      amount: 260,
      category: 'Health',
      dataPointsSummary: '5-class pack',
    },
    {
      description: 'Streaming Movie Rental',
      amount: 45,
      category: 'Entertainment',
      dataPointsSummary: 'New release',
    },
    {
      description: 'Beach Resort Booking',
      amount: 1800,
      category: 'Travel',
      dataPointsSummary: 'Weekend getaway',
    },
    {
      description: 'Supermarket',
      amount: 320,
      category: 'Groceries',
      dataPointsSummary: 'Weekly shopping',
    },
    {
      description: 'Gas Station',
      amount: 430,
      category: 'Transport',
      dataPointsSummary: 'Fuel refill',
    },
    {
      description: 'Laundry Detergent Order',
      amount: 70,
      category: 'Home',
      dataPointsSummary: 'Bulk supply',
    },
    {
      description: 'Café Brunch',
      amount: 145,
      category: 'Food',
      dataPointsSummary: 'Avocado toast + latte',
    },
  ];

  // Insert for card4
  for (let i = 0; i < transactionData4.length; i++) {
    await prisma.transaction.upsert({
      where: { id: `tx-card4-${i}` },
      update: {
        id: `tx-card4-${i}`,
        cardId: card4.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData4[i].amount,
        currency: 'SEK',
        description: transactionData4[i].description,
        category: transactionData4[i].category,
        dataPointsSummary: transactionData4[i].dataPointsSummary,
      },
      create: {
        id: `tx-card4-${i}`,
        cardId: card4.id,
        postedAt: new Date(Date.now() - i * 86400000),
        amount: transactionData4[i].amount,
        currency: 'SEK',
        description: transactionData4[i].description,
        category: transactionData4[i].category,
        dataPointsSummary: transactionData4[i].dataPointsSummary,
      },
    });
  }

  console.log('💸 Transactions created for all cards');

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
