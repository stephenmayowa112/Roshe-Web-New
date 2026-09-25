/**
 * Seed script: ensures every school that has a license also has
 * the 5 standard resources attached to it, and creates a sample
 * payment record so "Recently Used Resources" is populated from
 * real DB rows rather than placeholder strings.
 *
 * Run with:  npx tsx scripts/seed-dashboard-data.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The 5 standard resources every Remember Me license unlocks
const STANDARD_RESOURCES = [
  {
    type: 'FILM',
    title: 'Film License',
    description: 'Full access to the Remember Me animated film',
    fileUrl: null,
  },
  {
    type: 'ASSEMBLY_SCRIPT',
    title: 'Remembrance Day Assembly Script',
    description: 'Ready-to-use assembly script for primary schools',
    fileUrl: '/resources/assembly-script.pdf',
  },
  {
    type: 'TEACHERS_GUIDE',
    title: 'Remembrance Day Teachers Guide',
    description: 'Curriculum-aligned lesson plans and classroom activities',
    fileUrl: '/resources/teachers-guide.pdf',
  },
  {
    type: 'STUDENT_WORKSHEET',
    title: 'Remembrance Day Student Worksheet',
    description: 'Ready-to-use SEND, OT and SaLT support resources',
    fileUrl: '/resources/student-worksheet.pdf',
  },
  {
    type: 'CRAFT_ACTIVITY',
    title: 'Remembrance Day Craft Activity',
    description: 'Flexible resources for assemblies, lessons and group activities',
    fileUrl: '/resources/craft-activity.pdf',
  },
];

async function seedDashboardData() {
  console.log('🌱 Seeding dashboard data…\n');

  // ── 1. Ensure at least one school exists ─────────────────────────────────
  let school = await prisma.school.findFirst();
  if (!school) {
    school = await prisma.school.create({
      data: {
        name: "St. Mary's Primary School",
        type: 'PRIMARY',
        city: 'London',
        postcode: 'SW1A 1AA',
        contactEmail: 'admin@stmarys.edu',
        contactPhone: '+44 20 7946 0958',
        headTeacher: 'Mrs. Sarah Johnson',
        studentCount: 320,
        establishedYear: 2005,
        ofstedRating: 'Outstanding',
        isActive: true,
      },
    });
    console.log(`  ✅ Created school: ${school.name}`);
  } else {
    console.log(`  ℹ️  Using existing school: ${school.name}`);
  }

  // ── 2. Ensure admin user is linked to the school ──────────────────────────
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@roshestudios.co.uk' },
  });
  if (adminUser && !adminUser.schoolId) {
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { schoolId: school.id },
    });
    console.log('  ✅ Linked admin user to school');
  }

  // Link any user without a school to this school
  const unlinkedUsers = await prisma.user.findMany({
    where: { schoolId: null },
  });
  for (const u of unlinkedUsers) {
    await prisma.user.update({
      where: { id: u.id },
      data: { schoolId: school.id },
    });
  }
  if (unlinkedUsers.length > 0) {
    console.log(`  ✅ Linked ${unlinkedUsers.length} user(s) to school`);
  }

  // ── 3. Ensure the school has an active SINGLE_SCHOOL license ─────────────
  let license = await prisma.license.findFirst({
    where: { schoolId: school.id, status: 'ACTIVE' },
  });
  if (!license) {
    license = await prisma.license.create({
      data: {
        type: 'SINGLE_SCHOOL',
        status: 'ACTIVE',
        description: 'Remember Me – Single School License',
        amount: 29900, // £299.00 in pence
        currency: 'GBP',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        autoRenew: false,
        schoolId: school.id,
      },
    });
    console.log(`  ✅ Created license: ${license.type} (${license.status})`);
  } else {
    console.log(`  ℹ️  Using existing license: ${license.id}`);
  }

  // ── 4. Ensure all 5 resources are attached to the license ────────────────
  for (const res of STANDARD_RESOURCES) {
    const existing = await prisma.resource.findFirst({
      where: { licenseId: license.id, type: res.type },
    });
    if (!existing) {
      await prisma.resource.create({
        data: {
          ...res,
          licenseId: license.id,
          isActive: true,
        },
      });
      console.log(`  ✅ Created resource: ${res.title}`);
    } else {
      console.log(`  ℹ️  Resource already exists: ${res.title}`);
    }
  }

  // ── 5. Create sample payment record so "recently used" is real ────────────
  const paymentCount = await prisma.payment.count({
    where: { schoolId: school.id },
  });
  if (paymentCount === 0) {
    // Get the first user linked to this school
    const user = await prisma.user.findFirst({ where: { schoolId: school.id } });
    if (user) {
      // Create sample download activity as payments with descriptions
      const sampleActivity = [
        { description: 'Remembrance Day Assembly Script',  daysAgo: 2 },
        { description: 'Remembrance Day Teachers Guide',   daysAgo: 2 },
        { description: 'Remembrance Day Student Worksheet', daysAgo: 3 },
        { description: 'Remembrance Day Craft Activity',   daysAgo: 4 },
      ];

      for (const activity of sampleActivity) {
        const date = new Date();
        date.setDate(date.getDate() - activity.daysAgo);
        await prisma.payment.create({
          data: {
            amount: 0, // resource downloads are free once licensed
            currency: 'GBP',
            status: 'SUCCEEDED',
            description: activity.description,
            schoolId: school.id,
            licenseId: license.id,
            userId: user.id,
            paidAt: date,
            createdAt: date,
          },
        });
      }
      console.log('  ✅ Created 4 sample resource download activity records');
    }
  } else {
    console.log(`  ℹ️  ${paymentCount} payment record(s) already exist`);
  }

  // ── 6. Print final DB summary ─────────────────────────────────────────────
  const [users, schools, licenses, resources, payments] = await Promise.all([
    prisma.user.count(),
    prisma.school.count(),
    prisma.license.count(),
    prisma.resource.count(),
    prisma.payment.count(),
  ]);

  console.log('\n📊 Database summary:');
  console.log(`   👥 Users:     ${users}`);
  console.log(`   🏫 Schools:   ${schools}`);
  console.log(`   📄 Licenses:  ${licenses}`);
  console.log(`   📁 Resources: ${resources}`);
  console.log(`   💳 Payments:  ${payments}`);
  console.log('\n🎉 Seed complete!');
}

seedDashboardData()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
