# 🔧 **Vercel Environment Variables - Roshe Studios**

Add these exact environment variables to your **Vercel Dashboard** → **Settings** → **Environment Variables**:

## **Required Environment Variables**

```bash
# Database (Already configured)
DATABASE_URL="postgres://7dc7615b4528030313078f3ab47406bf9c87d079e67be2f900808f0a9c01854e:sk_SRSyLdXDP__vPDsj15msY@db.prisma.io:5432/postgres?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="E8DLOvfMIMgoevWf5kJjbKKPEpHVe3G7jlQENr0efkE="
NEXTAUTH_URL="https://www.roshestudios.co.uk"

# Google OAuth (Get these from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id-from-console"
GOOGLE_CLIENT_SECRET="your-google-client-secret-from-console"

# Authentication & Security
JWT_SECRET="your-existing-jwt-secret-64-characters"

# App Configuration
APP_URL="https://www.roshestudios.co.uk"
SUPPORT_EMAIL="support@roshestudios.co.uk"
NODE_ENV="production"
```

## **Google OAuth Setup Checklist**

### **✅ Step 1: Google Cloud Console**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project: "Roshe Studios Website"
3. Enable APIs: Google+ API, Google People API
4. Configure OAuth consent screen
5. Create OAuth credentials with these **exact settings**:
   
   **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://www.roshestudios.co.uk
   ```
   
   **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://www.roshestudios.co.uk/api/auth/callback/google
   ```

### **✅ Step 2: Environment Variables**
- Copy your Google Client ID and Secret from Google Console
- Add all variables above to Vercel (Production, Preview, Development)
- Use the generated NEXTAUTH_SECRET provided above

### **✅ Step 3: Test URLs**
After deployment:
- **Sign In**: https://www.roshestudios.co.uk/studio/signin
- **Sign Up**: https://www.roshestudios.co.uk/studio/signup
- **Dashboard**: https://www.roshestudios.co.uk/studio/dashboard
- **Admin Panel**: https://www.roshestudios.co.uk/admin

---

## **🚀 Quick Commands**

```bash
# Show setup guide with your domain
npm run auth:setup

# Verify configuration
npm run auth:verify

# Test database connection
npm run prisma:seed
```

## **🎯 Authentication Features Ready**

✅ **Email/Password Authentication**
✅ **Google OAuth Sign In/Sign Up**
✅ **User Dashboard with Sessions**
✅ **Protected Routes**
✅ **Admin Panel (Separate)**
✅ **Automatic School Creation**
✅ **User Profile Management**

---

## **📞 Test Flow**

1. **New User with Google**:
   - Visits: https://www.roshestudios.co.uk/studio/signin
   - Clicks: "Continue with Google"
   - Signs in with Google account
   - Creates profile automatically
   - Redirects to dashboard

2. **Existing User with Email/Password**:
   - Visits: https://www.roshestudios.co.uk/studio/signin
   - Enters email and password
   - Redirects to dashboard

3. **Admin User**:
   - Visits: https://www.roshestudios.co.uk/admin
   - Uses: admin@roshestudios.co.uk / RosheAdmin2024!SecurePass
   - Access admin dashboard

**Ready to get your Google OAuth credentials?**