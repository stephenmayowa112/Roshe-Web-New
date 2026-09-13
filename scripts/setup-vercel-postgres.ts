import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function setupVercelPostgres() {
  try {
    console.log('🚀 Setting up Vercel Postgres for Roshe Studios...');

    // Test database connection
    console.log('📡 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Check if tables exist by trying to count users
    let tablesExist = false;
    try {
      await prisma.user.count();
      tablesExist = true;
      console.log('📊 Database tables already exist');
    } catch (error) {
      console.log('📋 Database tables not found, migration needed');
    }

    if (!tablesExist) {
      console.log('🔧 Please run database migration first:');
      console.log('   npx prisma db push');
      console.log('   Then run this script again');
      return;
    }

    // Check for existing admin user
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@roshestudios.co.uk' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
    } else {
      console.log('👤 Creating admin user...');
      
      const hashedPassword = await bcrypt.hash('RosheAdmin2024!SecurePass', 12);
      
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@roshestudios.co.uk',
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: 'SUPER_ADMIN',
          isEmailVerified: true,
        }
      });

      console.log('✅ Admin user created:', adminUser.email);
    }

    // Create some sample data if database is empty
    const schoolCount = await prisma.school.count();
    
    if (schoolCount === 0) {
      console.log('🏫 Creating sample schools...');
      
      await prisma.school.createMany({
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
      
      console.log('✅ Sample schools created');
    }

    // Show final stats
    const stats = await Promise.all([
      prisma.user.count(),
      prisma.school.count(), 
      prisma.license.count(),
      prisma.payment.count()
    ]);

    console.log('📊 Database Statistics:');
    console.log(`   👥 Users: ${stats[0]}`);
    console.log(`   🏫 Schools: ${stats[1]}`);
    console.log(`   📄 Licenses: ${stats[2]}`);
    console.log(`   💳 Payments: ${stats[3]}`);

    console.log('🎉 Vercel Postgres setup complete!');
    console.log('🌐 Your admin panel: https://your-domain.com/admin');
    console.log('📧 Login: admin@roshestudios.co.uk');
    console.log('🔑 Password: RosheAdmin2024!SecurePass');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('ENOTFOUND')) {
        console.log('💡 Connection failed. Make sure:');
        console.log('   1. Vercel Postgres database is created');
        console.log('   2. Environment variables are set');
        console.log('   3. You\'re running this locally with correct .env file');
      }
      if (error.message.includes('relation') || error.message.includes('table')) {
        console.log('💡 Tables not found. Run: npx prisma db push');
      }
    }
    
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  setupVercelPostgres()
    .then(() => {
      console.log('🎉 Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}

export { setupVercelPostgres };