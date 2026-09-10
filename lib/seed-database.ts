import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedDatabase() {
  try {
    // Clean existing data
    await prisma.payment.deleteMany();
    await prisma.license.deleteMany();
    await prisma.user.deleteMany();
    await prisma.school.deleteMany();

    // Create schools
    const schools = await Promise.all([
      prisma.school.create({
        data: {
          name: 'St. Mary\'s Primary School',
          type: 'PRIMARY',
          address: '123 School Lane',
          city: 'London',
          postcode: 'SW1A 1AA',
          contactEmail: 'admin@stmarys.edu',
          contactPhone: '+44 20 7946 0958',
          headTeacher: 'Mrs. Sarah Johnson',
          studentCount: 450,
          establishedYear: 1952,
          isActive: true,
        }
      }),
      prisma.school.create({
        data: {
          name: 'Greenfield Academy',
          type: 'ACADEMY',
          address: '456 Oak Avenue',
          city: 'Manchester',
          postcode: 'M1 1AA',
          contactEmail: 'info@greenfield.ac.uk',
          contactPhone: '+44 161 234 5678',
          headTeacher: 'Mr. David Brown',
          studentCount: 680,
          establishedYear: 2010,
          isActive: true,
        }
      }),
      prisma.school.create({
        data: {
          name: 'Riverside Primary',
          type: 'PRIMARY',
          address: '789 River Street',
          city: 'Birmingham',
          postcode: 'B1 1AA',
          contactEmail: 'head@riverside.edu',
          contactPhone: '+44 121 345 6789',
          headTeacher: 'Ms. Emily Davis',
          studentCount: 320,
          establishedYear: 1965,
          isActive: true,
        }
      }),
      prisma.school.create({
        data: {
          name: 'Oak Tree School',
          type: 'INDEPENDENT',
          address: '321 Hill Road',
          city: 'Leeds',
          postcode: 'LS1 1AA',
          contactEmail: 'office@oaktree.edu',
          contactPhone: '+44 113 456 7890',
          headTeacher: 'Dr. Michael Wilson',
          studentCount: 280,
          establishedYear: 1978,
          isActive: true,
        }
      }),
    ]);

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123!', 12);
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@roshe-studios.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'SUPER_ADMIN',
        isEmailVerified: true,
      }
    });

    // Create school admin users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'sarah.johnson@stmarys.edu',
          password: await bcrypt.hash('password123', 12),
          firstName: 'Sarah',
          lastName: 'Johnson',
          role: 'SCHOOL_ADMIN',
          schoolId: schools[0].id,
          isEmailVerified: true,
        }
      }),
      prisma.user.create({
        data: {
          email: 'david.brown@greenfield.ac.uk',
          password: await bcrypt.hash('password123', 12),
          firstName: 'David',
          lastName: 'Brown',
          role: 'SCHOOL_ADMIN',
          schoolId: schools[1].id,
          isEmailVerified: true,
        }
      }),
      prisma.user.create({
        data: {
          email: 'emily.davis@riverside.edu',
          password: await bcrypt.hash('password123', 12),
          firstName: 'Emily',
          lastName: 'Davis',
          role: 'SCHOOL_ADMIN',
          schoolId: schools[2].id,
          isEmailVerified: false,
        }
      }),
      prisma.user.create({
        data: {
          email: 'teacher1@stmarys.edu',
          password: await bcrypt.hash('password123', 12),
          firstName: 'John',
          lastName: 'Smith',
          role: 'TEACHER',
          schoolId: schools[0].id,
          isEmailVerified: true,
        }
      }),
      prisma.user.create({
        data: {
          email: 'teacher2@greenfield.ac.uk',
          password: await bcrypt.hash('password123', 12),
          firstName: 'Jane',
          lastName: 'Wilson',
          role: 'TEACHER',
          schoolId: schools[1].id,
          isEmailVerified: true,
        }
      }),
    ]);

    // Create licenses
    const licenses = await Promise.all([
      prisma.license.create({
        data: {
          type: 'SINGLE_SCHOOL',
          status: 'ACTIVE',
          description: 'Single School Annual License',
          amount: 20000, // £200
          currency: 'GBP',
          schoolId: schools[0].id,
          userId: users[0].id,
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          expiresAt: new Date('2024-12-31'),
        }
      }),
      prisma.license.create({
        data: {
          type: 'MULTI_SCHOOL',
          status: 'ACTIVE',
          description: 'Multi-School Annual License',
          amount: 70000, // £700
          currency: 'GBP',
          schoolId: schools[1].id,
          userId: users[1].id,
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          expiresAt: new Date('2024-12-31'),
        }
      }),
      prisma.license.create({
        data: {
          type: 'TRIAL',
          status: 'EXPIRED',
          description: 'Trial License - 30 Days',
          amount: 0,
          currency: 'GBP',
          schoolId: schools[2].id,
          userId: users[2].id,
          startDate: new Date('2023-12-01'),
          endDate: new Date('2023-12-31'),
          expiresAt: new Date('2023-12-31'),
        }
      }),
    ]);

    // Create payments
    const payments = await Promise.all([
      prisma.payment.create({
        data: {
          amount: 20000,
          currency: 'GBP',
          status: 'SUCCEEDED',
          description: 'Single School License - Annual Subscription',
          paymentMethod: 'card',
          brand: 'visa',
          last4: '4242',
          stripePaymentIntentId: 'pi_1234567890abcdef',
          schoolId: schools[0].id,
          licenseId: licenses[0].id,
          userId: users[0].id,
          paidAt: new Date('2024-01-15T10:30:00Z'),
        }
      }),
      prisma.payment.create({
        data: {
          amount: 70000,
          currency: 'GBP',
          status: 'SUCCEEDED',
          description: 'Multi-School License - Annual Subscription',
          paymentMethod: 'card',
          brand: 'mastercard',
          last4: '5555',
          stripePaymentIntentId: 'pi_0987654321fedcba',
          schoolId: schools[1].id,
          licenseId: licenses[1].id,
          userId: users[1].id,
          paidAt: new Date('2024-01-10T14:20:00Z'),
        }
      }),
      prisma.payment.create({
        data: {
          amount: 20000,
          currency: 'GBP',
          status: 'FAILED',
          description: 'Single School License - Payment Attempt',
          paymentMethod: 'card',
          brand: 'visa',
          last4: '0002',
          failureMessage: 'Your card was declined.',
          stripePaymentIntentId: 'pi_1111111111111111',
          schoolId: schools[2].id,
          userId: users[2].id,
        }
      }),
    ]);

    console.log('Database seeded successfully!');
    console.log(`Created:
      - ${schools.length} schools
      - ${users.length + 1} users (including 1 admin)
      - ${licenses.length} licenses
      - ${payments.length} payments`);

    console.log('\nAdmin login:');
    console.log('Email: admin@roshe-studios.com');
    console.log('Password: admin123!');

    return {
      schools,
      users: [...users, adminUser],
      licenses,
      payments,
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}