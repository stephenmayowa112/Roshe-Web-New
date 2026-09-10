import { seedDatabase } from '../lib/seed-database';

async function main() {
  console.log('🌱 Starting database seeding...');
  
  try {
    await seedDatabase();
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

main();