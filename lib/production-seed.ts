import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedProduction() {
  try {
    console.log('🌱 Starting production database seeding...');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@roshestudios.co.uk' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists, skipping creation');
      return existingAdmin;
    }

    // Create production admin user
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

    console.log('✅ Production admin user created:', adminUser.email);
    console.log('📧 Login: admin@roshestudios.co.uk');
    console.log('🔑 Password: RosheAdmin2024!SecurePass');
    console.log('⚠️  Please change this password immediately after first login!');

    // Create a demo school (optional)
    const demoSchool = await prisma.school.create({
      data: {
        name: 'Demo School',
        type: 'PRIMARY',
        address: 'Demo Address',
        city: 'London',
        postcode: 'SW1A 1AA',
        contactEmail: 'demo@example.com',
        contactPhone: '+44 20 7946 0958',
        headTeacher: 'Demo Head Teacher',
        studentCount: 100,
        establishedYear: 2020,
        isActive: true,
      }
    });

    console.log('✅ Demo school created:', demoSchool.name);

    return {
      adminUser,
      demoSchool,
    };

  } catch (error) {
    console.error('❌ Error seeding production database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedProduction()
    .then(() => {
      console.log('🎉 Production seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Production seeding failed:', error);
      process.exit(1);
    });
}