🚀 **Vercel Environment Variables - Ready to Deploy**

Add these **exact environment variables** to your Vercel Dashboard:

## **Copy These to Vercel → Settings → Environment Variables:**

```bash
# Google OAuth Credentials (from your Google Cloud Console)
GOOGLE_CLIENT_ID="<from Google Cloud Console>"
GOOGLE_CLIENT_SECRET="<from Google Cloud Console>"

# NextAuth Configuration
NEXTAUTH_SECRET="<generate a new random secret>"
NEXTAUTH_URL="https://www.roshestudios.co.uk"

# Database (Already configured)
DATABASE_URL="<from your database provider>"

# Security & App Configuration
JWT_SECRET="your-existing-jwt-secret-64-characters"
APP_URL="https://www.roshestudios.co.uk"
SUPPORT_EMAIL="support@roshestudios.co.uk"
NODE_ENV="production"
```

## **✅ Environment Variable Settings:**

Set these variables for **ALL environments**:
- ☑️ **Production**
- ☑️ **Preview** 
- ☑️ **Development**

---

## **🚀 Deploy and Test**

After adding environment variables:

```bash
# Trigger new deployment
git add .
git commit -m "Add Google OAuth credentials"
git push
```

## **🎯 Test URLs (After deployment):**

1. **Google OAuth Sign In**: https://www.roshestudios.co.uk/studio/signin
   - Click "Continue with Google"
   - Should redirect to Google login
   - After login, should redirect to dashboard

2. **Email/Password Sign Up**: https://www.roshestudios.co.uk/studio/signup
   - Create account with email/password
   - Should redirect to dashboard

3. **User Dashboard**: https://www.roshestudios.co.uk/studio/dashboard
   - Shows user information and session

4. **Admin Panel**: https://www.roshestudios.co.uk/admin
   - Use the administrator credentials configured in your secret manager.

---

## **✨ What Works After This Setup:**

✅ **Google OAuth Sign Up** - New users can create accounts instantly  
✅ **Google OAuth Sign In** - Returning users can login with Google  
✅ **Email/Password Registration** - Traditional signup flow  
✅ **Email/Password Login** - Traditional signin flow  
✅ **Protected User Dashboard** - Personalized user experience  
✅ **Session Management** - Secure login state  
✅ **Admin Panel** - Separate admin authentication  
✅ **Automatic School Creation** - For educational organizations  

---

## **🔧 Local Development (.env.local):**

For local testing, update your `.env.local`:

```bash
GOOGLE_CLIENT_ID="<from Google Cloud Console>"
GOOGLE_CLIENT_SECRET="<from Google Cloud Console>"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate a new random secret>"
DATABASE_URL="<from your database provider>"
```

**Your Google OAuth is ready to deploy! 🎉**