# 🔧 **Google Cloud Console Setup - Step by Step**

## **Complete OAuth Configuration for www.roshestudios.co.uk**

---

### **Step 1: Create Google Cloud Project** (2 minutes)

1. **Go to**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Click**: "Select a project" (top of page)
3. **Click**: "New Project"
4. **Enter**:
   - **Project name**: `Roshe Studios Website`
   - **Organization**: Leave default
5. **Click**: "Create"
6. **Wait**: ~30 seconds for project creation

---

### **Step 2: Enable Required APIs** (2 minutes)

1. **In your new project**, go to: **"APIs & Services"** → **"Library"**
2. **Search for**: `Google+ API`
3. **Click**: on "Google+ API" result
4. **Click**: "Enable"
5. **Go back** to Library, **search for**: `Google People API`
6. **Click**: on "Google People API" result  
7. **Click**: "Enable"

---

### **Step 3: Configure OAuth Consent Screen** (3 minutes)

1. **Go to**: **"APIs & Services"** → **"OAuth consent screen"**
2. **Select**: "External" (for public users)
3. **Click**: "Create"

**Fill out the form**:
```
App name: Roshe Studios
User support email: [your-email@example.com]
App domain: https://www.roshestudios.co.uk
Developer contact email: [your-email@example.com]
```

4. **Click**: "Save and Continue"
5. **Scopes page**: Click "Add or Remove Scopes"
   - **Select**: `../auth/userinfo.email`
   - **Select**: `../auth/userinfo.profile`
   - **Click**: "Update" → "Save and Continue"
6. **Test users page**: Add your email for testing → "Save and Continue"
7. **Summary page**: Review and click "Back to Dashboard"

---

### **Step 4: Create OAuth Credentials** (3 minutes)

1. **Go to**: **"APIs & Services"** → **"Credentials"**
2. **Click**: "+ Create Credentials"
3. **Select**: "OAuth client ID"
4. **Application type**: "Web application"
5. **Name**: `Roshe Studios Website`

**Configure origins and redirects**:

6. **Authorized JavaScript origins** - Click "Add URI" for each:
   ```
   http://localhost:3000
   https://www.roshestudios.co.uk
   ```

7. **Authorized redirect URIs** - Click "Add URI" for each:
   ```
   http://localhost:3000/api/auth/callback/google
   https://www.roshestudios.co.uk/api/auth/callback/google
   ```

8. **Click**: "Create"
9. **Copy**: Client ID and Client Secret (save these!)

---

## **✅ Final Configuration Summary**

### **JavaScript Origins** (Where your app runs):
- `http://localhost:3000` (development)
- `https://www.roshestudios.co.uk` (production)

### **Redirect URIs** (Where Google sends users after login):
- `http://localhost:3000/api/auth/callback/google` (development)
- `https://www.roshestudios.co.uk/api/auth/callback/google` (production)

---

## **🔧 Add to Vercel Environment Variables**

In **Vercel Dashboard** → **Settings** → **Environment Variables**:

```bash
GOOGLE_CLIENT_ID="your-copied-client-id"
GOOGLE_CLIENT_SECRET="your-copied-client-secret"
NEXTAUTH_SECRET="3iM4XqBSREpKqx/z5KNUeQI+PG3OCYofQBBqXIW61DY="
NEXTAUTH_URL="https://www.roshestudios.co.uk"
```

---

## **🚨 Common Issues & Solutions**

### **"Error 400: redirect_uri_mismatch"**
- **Check**: Redirect URIs match exactly (no trailing slashes)
- **Verify**: JavaScript origins are set correctly
- **Ensure**: Using correct protocol (http vs https)

### **"Error 403: access_blocked"**
- **Add your email** to test users in OAuth consent screen
- **Check**: App is not restricted to organization only

### **"Error 401: invalid_client"**
- **Verify**: Client ID and Secret are copied correctly
- **Check**: No extra spaces in environment variables
- **Ensure**: Using the correct Google project

---

## **🎯 Test Your Setup**

1. **Deploy** to Vercel with new environment variables
2. **Visit**: https://www.roshestudios.co.uk/studio/signin
3. **Click**: "Continue with Google"
4. **Should**: Redirect to Google login
5. **After login**: Should redirect to your dashboard

**Your Google OAuth is ready! 🎉**