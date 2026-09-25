/**
 * Seed Test Account Script
 * 
 * Creates demo@roshestudios.co.uk with complete test data:
 * - Test school with details
 * - Active license
 * - Payment history
 * - Downloadable resources
 * 
 * Usage: npx tsx scripts/seed-test-account.ts
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const TEST_EMAIL = 'demo@roshestudios.co.uk';
const TEST_PASSWORD = 'Demo123!'; // Change this to your preferred password

async function seedTestAccount() {
  console.log('🌱 Seeding test account with mock data...\n');

  try {
    // Check if test user already exists
    let testUser = await prisma.user.findUnique({
      where: { email: TEST_EMAIL },
      include: { school: true },
    });

    if (testUser) {
      console.log(`⚠️  Test user ${TEST_EMAIL} already exists.`);
      console.log('   Updating with fresh mock data...\n');
    }

    // ── Step 1: Create or get test school ────────────────────────────────────
    let school;
    
    if (testUser?.schoolId) {
      school = await prisma.school.findUnique({
        where: { id: testUser.schoolId },
      });
      console.log(`✅ Found existing school: ${school?.name}`);
    }

    if (!school) {
      school = await prisma.school.create({
        data: {
          name: 'Demo Primary School',
          type: 'PRIMARY',
          address: '123 Education Street',
          city: 'London',
          county: 'Greater London',
          postcode: 'SW1A 1AA',
          country: 'United Kingdom',
          contactEmail: TEST_EMAIL,
          contactPhone: '+44 20 1234 5678',
          website: 'https://demo-school.example.com',
          headTeacher: 'Mrs. Sarah Thompson',
          studentCount: 450,
          establishedYear: 1995,
          urn: 'DEMO123456',
          ofstedRating: 'Outstanding',
          isActive: true,
        },
      });
      console.log(`✅ Created school: ${school.name}`);
    }

    // ── Step 2: Create or update test user ───────────────────────────────────
    const hashedPassword = await hash(TEST_PASSWORD, 12);

    if (testUser) {
      testUser = await prisma.user.update({
        where: { email: TEST_EMAIL },
        data: {
          name: 'Demo User',
          firstName: 'Demo',
          lastName: 'User',
          password: hashedPassword,
          role: 'SUPER_ADMIN', // Make them admin to test admin panel too
          title: 'Head Teacher',
          phone: '+44 20 1234 5678',
          emailVerified: new Date(),
          isEmailVerified: true,
          schoolId: school.id,
        },
      });
      console.log(`✅ Updated user: ${TEST_EMAIL}`);
    } else {
      testUser = await prisma.user.create({
        data: {
          email: TEST_EMAIL,
          name: 'Demo User',
          firstName: 'Demo',
          lastName: 'User',
          password: hashedPassword,
          role: 'SUPER_ADMIN',
          title: 'Head Teacher',
          phone: '+44 20 1234 5678',
          emailVerified: new Date(),
          isEmailVerified: true,
          schoolId: school.id,
        },
      });
      console.log(`✅ Created user: ${TEST_EMAIL}`);
    }

    // ── Step 3: Create active license ─────────────────────────────────────────
    const existingLicense = await prisma.license.findFirst({
      where: { schoolId: school.id, status: 'ACTIVE' },
    });

    let license;
    if (existingLicense) {
      console.log(`✅ Found existing active license`);
      license = existingLicense;
    } else {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1); // 1 year license

      license = await prisma.license.create({
        data: {
          type: 'SINGLE_SCHOOL',
          status: 'ACTIVE',
          description: 'Remember Me Film License - Single School',
          features: JSON.stringify([
            'Full film access',
            'Assembly scripts',
            'Teachers guides',
            'Student worksheets',
            'Craft activities',
          ]),
          maxUsers: 50,
          amount: 9900, // £99.00 in pence
          currency: 'GBP',
          startDate,
          endDate,
          expiresAt: endDate,
          autoRenew: false,
          schoolId: school.id,
          userId: testUser.id,
        },
      });
      console.log(`✅ Created active license: ${license.type}`);
    }

    // ── Step 4: Create payment records ────────────────────────────────────────
    const existingPayments = await prisma.payment.count({
      where: { schoolId: school.id },
    });

    if (existingPayments === 0) {
      const payments = await prisma.payment.createMany({
        data: [
          {
            amount: 9900,
            currency: 'GBP',
            status: 'SUCCEEDED',
            description: 'Single School License Purchase',
            paymentMethod: 'card',
            last4: '4242',
            brand: 'visa',
            schoolId: school.id,
            licenseId: license.id,
            userId: testUser.id,
            paidAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            stripePaymentIntentId: 'pi_test_demo_001',
          },
          {
            amount: 2500,
            currency: 'GBP',
            status: 'SUCCEEDED',
            description: 'Additional Resource Pack',
            paymentMethod: 'card',
            last4: '4242',
            brand: 'visa',
            schoolId: school.id,
            userId: testUser.id,
            paidAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            stripePaymentIntentId: 'pi_test_demo_002',
          },
        ],
      });
      console.log(`✅ Created ${payments.count} payment records`);
    } else {
      console.log(`✅ Found ${existingPayments} existing payments`);
    }

    // ── Step 5: Create downloadable resources ─────────────────────────────────
    const existingResources = await prisma.resource.count({
      where: { licenseId: license.id },
    });

    if (existingResources === 0) {
      const resources = await prisma.resource.createMany({
        data: [
          {
            title: 'Remember Me - Full Film',
            type: 'FILM',
            description: 'Complete animated film (12 minutes)',
            fileUrl: '/resources/remember-me-film.mp4',
            isActive: true,
            licenseId: license.id,
          },
          {
            title: 'Remembrance Day Assembly Script',
            type: 'ASSEMBLY_SCRIPT',
            description: 'Ready-to-use assembly script with speaking parts',
            fileUrl: '/resources/assembly-script.pdf',
            isActive: true,
            licenseId: license.id,
          },
          {
            title: 'Remember Me Teachers Guide',
            type: 'TEACHERS_GUIDE',
            description: 'Complete teaching notes and lesson plans',
            fileUrl: '/resources/teachers-guide.pdf',
            isActive: true,
            licenseId: license.id,
          },
          {
            title: 'Student Worksheets Pack',
            type: 'STUDENT_WORKSHEET',
            description: 'Printable worksheets for KS2 students',
            fileUrl: '/resources/worksheets.pdf',
            isActive: true,
            licenseId: license.id,
          },
          {
            title: 'Poppy Craft Activity',
            type: 'CRAFT_ACTIVITY',
            description: 'Step-by-step craft instructions',
            fileUrl: '/resources/craft-activity.pdf',
            isActive: true,
            licenseId: license.id,
          },
        ],
      });
      console.log(`✅ Created ${resources.count} downloadable resources`);
    } else {
      console.log(`✅ Found ${existingResources} existing resources`);
    }

    // ── Step 6: Create download history ───────────────────────────────────────
    const resources = await prisma.resource.findMany({
      where: { licenseId: license.id },
      take: 3,
    });

    for (const resource of resources) {
      const existingDownload = await prisma.resourceDownload.findFirst({
        where: { resourceId: resource.id, userId: testUser.id },
      });

      if (!existingDownload) {
        await prisma.resourceDownload.create({
          data: {
            resourceId: resource.id,
            userId: testUser.id,
            downloadedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }
    console.log(`✅ Created download history`);

    // ── Summary ───────────────────────────────────────────────────────────────
    console.log('\n✅ Test account seeding complete!\n');
    console.log('═══════════════════════════════════════════════════');
    console.log('📧 Email:    ', TEST_EMAIL);
    console.log('🔑 Password: ', TEST_PASSWORD);
    console.log('🏫 School:   ', school.name);
    console.log('👤 Role:     ', testUser.role);
    console.log('📄 License:  ', license.type, '(ACTIVE)');
    console.log('💳 Payments: ', existingPayments > 0 ? existingPayments : 2);
    console.log('📁 Resources:', existingResources > 0 ? existingResources : 5);
    console.log('═══════════════════════════════════════════════════');
    console.log('\n🚀 You can now sign in at: http://localhost:3001/studio/signin');
    console.log('   Or visit admin panel:  http://localhost:3001/admin\n');

  } catch (error) {
    console.error('\n❌ Error seeding test account:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeder
seedTestAccount()
  .then(() => {
    console.log('✅ Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
