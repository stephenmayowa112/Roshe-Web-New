# 🚀 **Google OAuth Setup Guide**

Complete guide to configure Google Authentication for Roshe Studios website.

## **Step 1: Google Cloud Console Setup** (5 minutes)

### **1.1 Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. **Project name**: `Roshe Studios Website`
4. Click **"Create"**

### **1.2 Enable Google+ API**
1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click **"Enable"**
4. Also enable **"Google People API"** (for profile info)

### **1.3 Configure OAuth Consent Screen**
1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** → **"Create"**
3. Fill in required fields:
   ```
   App name: Roshe Studios
   User support email: your-email@example.com
   Developer contact email: your-email@example.com
   ```
4. **Scopes**: Add `../auth/userinfo.email` and `../auth/userinfo.profile`
5. **Test users**: Add your email and any other test emails
6. Click **"Save and Continue"** through all steps

### **1.4 Create OAuth Credentials**
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. **Application type**: `Web application`
4. **Name**: `Roshe Studios Website`
5. **Authorized JavaScript origins** (Add both):
   ```
   http://localhost:3000
   https://www.roshestudios.co.uk
   ```
6. **Authorized redirect URIs** (Add both):
   ```
   http://localhost:3000/api/auth/callback/google
   https://www.roshestudios.co.uk/api/auth/callback/google
   ```
7. Click **"Create"**
8. **Copy your Client ID and Client Secret** (you'll need these!)

---

## **Step 2: Add Environment Variables**

Add these to your **Vercel** environment variables and local `.env.local`:

```bash
# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-actual-google-client-id"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-secure-64-character-string"
NEXTAUTH_URL="https://www.roshestudios.co.uk"  # Use http://localhost:3000 for development
```

**Generate secure NEXTAUTH_SECRET:**
```bash
# Run this locally to generate a secure secret
openssl rand -base64 32
# OR
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## **Step 3: Deploy and Test**

### **3.1 Deploy to Vercel**
After adding environment variables to Vercel:
```bash
git add .
git commit -m "Add Google OAuth authentication"
git push
```

### **3.2 Test Authentication**
1. **Visit**: `https://www.roshestudios.co.uk/studio/signin`
2. **Click**: "Continue with Google"
3. **Sign in** with your Google account
4. **Verify**: Redirects to dashboard with user info

---

## **✅ Configuration Checklist**

- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Redirect URIs configured correctly
- [ ] Environment variables added to Vercel
- [ ] Project deployed to Vercel
- [ ] Google sign-in tested successfully

---

## **🔧 Troubleshooting**

### **"Error 400: redirect_uri_mismatch"**
- Check redirect URI in Google Console matches exactly:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://www.roshestudios.co.uk/api/auth/callback/google`
- Also verify JavaScript origins are set:
  - Development: `http://localhost:3000`
  - Production: `https://www.roshestudios.co.uk`

### **"Error 403: access_blocked"**
- Add your email to test users in OAuth consent screen
- Make sure app is not in "Testing" mode for production

### **NextAuth Configuration Issues**
```bash
# Check environment variables are set
echo $GOOGLE_CLIENT_ID
echo $NEXTAUTH_URL
```

### **Local Development Issues**
Make sure `.env.local` contains:
```bash
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

---

## **🎉 Features Enabled**

After setup, users can:

✅ **Sign up with Google** - One-click account creation
✅ **Sign in with Google** - Fast authentication  
✅ **Email/Password signup** - Traditional registration
✅ **Email/Password signin** - Existing authentication
✅ **Automatic school creation** - For new organizations
✅ **User dashboard access** - Personalized experience
✅ **Session management** - Secure login state

---

## **🚨 Security Notes**

1. **Never commit credentials** to git
2. **Use HTTPS in production** for OAuth callbacks  
3. **Rotate secrets regularly** in production
4. **Monitor OAuth usage** in Google Console
5. **Keep redirect URIs minimal** and specific

**Admin Panel**: `https://www.roshestudios.co.uk/admin` (separate admin auth)
**User Dashboard**: `https://www.roshestudios.co.uk/studio/dashboard` (OAuth + email/password)