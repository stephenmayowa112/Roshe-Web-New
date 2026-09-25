#!/usr/bin/env node

const crypto = require('crypto');

console.log('🔧 Google OAuth Configuration Test\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log(`   GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not set'}`);
console.log(`   GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Not set'}`);
console.log(`   NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set'}`);
console.log(`   NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'Auto-detect (flexible)'}`);

console.log('\n🌐 Required Google Console Configuration:');
console.log('\n**Authorized JavaScript origins:**');
console.log('   http://localhost:3000');
console.log('   http://localhost:3001');
console.log('   https://www.roshestudios.co.uk');

console.log('\n**Authorized redirect URIs:**');
console.log('   http://localhost:3000/api/auth/callback/google');
console.log('   http://localhost:3001/api/auth/callback/google');
console.log('   https://www.roshestudios.co.uk/api/auth/callback/google');

console.log('\n🔑 Your Google OAuth Credentials:');
console.log(`   Client ID: ${process.env.GOOGLE_CLIENT_ID || 'Not set'}`);
console.log(`   Client Secret: ${process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET.substring(0, 20) + '...' : 'Not set'}`);

console.log('\n✅ Next Steps:');
console.log('   1. Add the redirect URIs above to Google Cloud Console');
console.log('   2. Start dev server with: npm run dev');
console.log('   3. Test OAuth on whatever port it uses');
console.log('   4. Should work on both port 3000 and 3001');

console.log('\n🎯 Test URLs:');
console.log('   • http://localhost:3000/studio/signin');
console.log('   • http://localhost:3001/studio/signin');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('\n⚠️  Warning: Google OAuth credentials not found in environment!');
}

console.log('\n🚀 OAuth should work on any port after Google Console update!');