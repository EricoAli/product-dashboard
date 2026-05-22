// src/prisma/seed.ts
// Seed data untuk database

import prisma from '../config/database';
import { hashPassword } from '../utils/crypto';

const seedDatabase = async () => {
  // Clean up existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user
  const hashedPassword = await hashPassword('password123');
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('✓ Test user created:', user.email);

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description:
          'Premium over-ear headphones dengan active noise cancellation, 30 jam battery life, dan kualitas audio Hi-Fi. Nyaman untuk penggunaan harian.',
        price: 2499000,
        category: 'Electronics',
        rating: 4.7,
        stock: 15,
        image: 'https://picsum.photos/seed/headphone/400/300',
        tags: JSON.stringify(['wireless', 'audio', 'premium']),
        createdBy: user.id,
      },
      {
        name: 'Mechanical Keyboard TKL',
        description:
          'Tenkeyless mechanical keyboard dengan switch red linear, RGB backlight, dan build aluminium. Ideal untuk programmer dan gamer.',
        price: 899000,
        category: 'Electronics',
        rating: 4.5,
        stock: 30,
        image: 'https://picsum.photos/seed/keyboard/400/300',
        tags: JSON.stringify(['keyboard', 'mechanical', 'rgb']),
        createdBy: user.id,
      },
      {
        name: 'Running Shoes Pro',
        description:
          'Sepatu lari ringan dengan teknologi foam responsif. Cocok untuk trail dan road running. Upper mesh breathable.',
        price: 1350000,
        category: 'Sports',
        rating: 4.3,
        stock: 50,
        image: 'https://picsum.photos/seed/shoes/400/300',
        tags: JSON.stringify(['running', 'outdoor', 'lightweight']),
        createdBy: user.id,
      },
      {
        name: 'Clean Code - Robert C. Martin',
        description:
          'Buku wajib bagi setiap software developer. Berisi panduan menulis kode yang mudah dibaca, dipelihara, dan di-test.',
        price: 299000,
        category: 'Books',
        rating: 4.8,
        stock: 100,
        image: 'https://picsum.photos/seed/book/400/300',
        tags: JSON.stringify(['programming', 'best-practices']),
        createdBy: user.id,
      },
    ],
  });

  console.log('✓ Sample products created:', products.count);
};

seedDatabase()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('✓ Database seeding completed');
  });
