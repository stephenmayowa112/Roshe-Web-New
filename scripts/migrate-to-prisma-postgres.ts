import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function migrateToPrismaPostgres() {
  try {
    console.log('🚀 Migrating Roshe Studios to Prisma Postgres...');
    
    // Test connection
    console.log('📡 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Connected to Prisma Postgres successfully!');

    // Check if schema exists
    try {
      await prisma.user.count();
      console.log('✅ Database schema already deployed');
    } catch (error) {
      console.log('❌ Database schema not found. Please run: npx prisma db push');
      return;
    }

    // Check for admin user
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@roshestudios.co.uk' }
    });

    if (adminExists) {
      console.log('✅ Admin user already exists');
    } else {
      console.log('👤 Creating admin user...');
      
      const hashedPassword = await bcrypt.hash('RosheAdmin2024!SecurePass', 12);
      
      await prisma.user.create({
        data: {
          email: 'admin@roshestudios.co.uk',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'SUPER_ADMIN',
          isEmailVerified: true,
        }
      });

      console.log('✅ Admin user created successfully');
    }

    // Create sample schools if empty
    const schoolCount = await prisma.school.count();
    
    if (schoolCount === 0) {
      console.log('🏫 Creating sample schools...');
      
      const schools = await prisma.school.createMany({
        data: [
          {
            name: 'Roshe Primary Academy',
            type: 'PRIMARY',
            address: '123 Education Street',
            city: 'London',
            postcode: 'SW1A 1AA',
            contactEmail: 'admin@rosheprimary.edu',
            contactPhone: '+44 20 7946 0958',
            headTeacher: 'Mrs. Sarah Johnson',
            studentCount: 450,
            establishedYear: 2010,
            ofstedRating: 'Outstanding',
            isActive: true,
          },
          {
            name: 'St. Margaret\'s Church School',
            type: 'PRIMARY',
            address: '45 Church Lane',
            city: 'Birmingham',
            postcode: 'B1 2NT',
            contactEmail: 'office@stmargarets.edu',
            contactPhone: '+44 121 496 0000',
            headTeacher: 'Mr. David Williams',
            studentCount: 320,
            establishedYear: 1995,
            ofstedRating: 'Good',
            isActive: true,
          },
          {
            name: 'Greenfield Secondary Academy',
            type: 'SECONDARY',
            address: '78 Academy Road',
            city: 'Manchester',
            postcode: 'M1 4EH',
            contactEmail: 'enquiries@greenfield.edu',
            contactPhone: '+44 161 234 5678',
            headTeacher: 'Dr. Emma Thompson',
            studentCount: 1200,
            establishedYear: 2005,
            ofstedRating: 'Outstanding',
            isActive: true,
          },
        ]
      });

      console.log(`✅ Created ${schools.count} sample schools`);

      // Create sample licenses
      const schoolsWithIds = await prisma.school.findMany({ take: 3 });
      
      await prisma.license.createMany({
        data: schoolsWithIds.map((school, index) => ({
          type: index === 0 ? 'SINGLE_SCHOOL' : index === 1 ? 'MULTI_SCHOOL' : 'TRIAL',
          status: 'ACTIVE',
          description: `${school.name} License`,
          amount: index === 0 ? 29900 : index === 1 ? 99900 : 0,
          currency: 'GBP',
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
          schoolId: school.id,
        }))
      });

      console.log('✅ Created sample licenses');
    }

    // Display stats
    const stats = await Promise.all([
      prisma.user.count(),
      prisma.school.count(),
      prisma.license.count(),
      prisma.payment.count()
    ]);

    console.log('\n📊 Database Statistics:');
    console.log(`   👥 Users: ${stats[0]}`);
    console.log(`   🏫 Schools: ${stats[1]}`);
    console.log(`   📄 Licenses: ${stats[2]}`);
    console.log(`   💳 Payments: ${stats[3]}`);

    console.log('\n🎉 Migration to Prisma Postgres complete!');
    console.log('🌐 Admin Panel: https://your-domain.com/admin');
    console.log('📧 Login: admin@roshestudios.co.uk');
    console.log('🔑 Password: RosheAdmin2024!SecurePass');
    console.log('\n⚠️  Don\'t forget to change the admin password after first login!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    
    if (error instanceof Error && error.message.includes('connect')) {
      console.log('\n💡 Connection failed. Make sure:');
      console.log('   1. DATABASE_URL is correctly set in .env.local');
      console.log('   2. Prisma Postgres database is running');
      console.log('   3. Your IP is allowed to connect');
    }
    
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  migrateToPrismaPostgres()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    });
}

export { migrateToPrismaPostgres };