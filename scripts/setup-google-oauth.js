#!/usr/bin/env node

console.log('🔐 Google OAuth Setup for Roshe Studios\n');

console.log('📋 Step-by-step setup:\n');

console.log('1️⃣ **Google Cloud Console Setup**');
console.log('   → Go to: https://console.cloud.google.com/');
console.log('   → Create project: "Roshe Studios Website"');
console.log('   → Enable APIs: Google+ API, Google People API');
console.log('   → Configure OAuth consent screen');
console.log('   → Create OAuth credentials (Web application)\n');

console.log('2️⃣ **Authorized JavaScript origins** (Add both):');
console.log('   → Development: http://localhost:3000');
console.log('   → Production: https://www.roshestudios.co.uk\n');

console.log('3️⃣ **Authorized Redirect URIs** (Add both):');
console.log('   → Development: http://localhost:3000/api/auth/callback/google');
console.log('   → Production: https://www.roshestudios.co.uk/api/auth/callback/google\n');

console.log('4️⃣ **Environment Variables** (Add to Vercel):');
console.log('   GOOGLE_CLIENT_ID="your-google-client-id"');
console.log('   GOOGLE_CLIENT_SECRET="your-google-client-secret"');
console.log('   NEXTAUTH_SECRET="' + require('crypto').randomBytes(32).toString('base64') + '"');
console.log('   NEXTAUTH_URL="https://www.roshestudios.co.uk"\n');

console.log('5️⃣ **Local Development** (.env.local):');
console.log('   GOOGLE_CLIENT_ID="your-google-client-id"');
console.log('   GOOGLE_CLIENT_SECRET="your-google-client-secret"');
console.log('   NEXTAUTH_URL="http://localhost:3000"\n');

console.log('6️⃣ **Test Authentication**:');
console.log('   → Visit: https://www.roshestudios.co.uk/studio/signin');
console.log('   → Click: "Continue with Google"');
console.log('   → Verify: Redirects to dashboard\n');

console.log('📚 Complete guide: See GOOGLE_OAUTH_SETUP.md');
console.log('✅ Database ready with admin user!');
console.log('🎉 Ready for Google OAuth integration!\n');

console.log('🔗 Useful links:');
console.log('   • Google Cloud Console: https://console.cloud.google.com/');
console.log('   • NextAuth.js Docs: https://next-auth.js.org/providers/google');
console.log('   • Your Admin Panel: https://www.roshestudios.co.uk/admin');
console.log('   • User Dashboard: https://www.roshestudios.co.uk/studio/dashboard\n');