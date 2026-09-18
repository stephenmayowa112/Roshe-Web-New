# 🔧 **Fix Google OAuth - Update Port Configuration**

## **Issue:** State cookie was missing
**Cause:** Port mismatch between NEXTAUTH_URL and actual dev server port

## **✅ Fixed Locally:**
- Updated `.env.local` to use `http://localhost:3001`
- Added cookie configuration to NextAuth
- Restarted dev server

## **🚨 Action Required: Update Google Cloud Console**

You need to add the new port to your Google OAuth configuration:

### **Step 1: Go to Google Cloud Console**
1. **Visit**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Select**: "Roshe Studios Website" project
3. **Go to**: APIs & Services → Credentials
4. **Click**: Your OAuth 2.0 Client ID

### **Step 2: Update Authorized Redirect URIs**
**Add this new URI** (keep existing ones):
```
http://localhost:3001/api/auth/callback/google
```

**Your complete list should be**:
```
http://localhost:3000/api/auth/callback/google
http://localhost:3001/api/auth/callback/google
https://www.roshestudios.co.uk/api/auth/callback/google
```

### **Step 3: Update Authorized JavaScript Origins** 
**Add this new origin** (keep existing ones):
```
http://localhost:3001
```

**Your complete list should be**:
```
http://localhost:3000
http://localhost:3001
https://www.roshestudios.co.uk
```

### **Step 4: Save Changes**
- **Click**: "Save" in Google Console
- **Wait**: ~30 seconds for changes to propagate

## **🎯 Test After Google Console Update:**

1. **Visit**: http://localhost:3001/studio/signin
2. **Click**: "Continue with Google"
3. **Expected**: Should work without state cookie error
4. **Result**: Successful authentication and redirect to dashboard

---

## **🔧 Alternative: Force Port 3000**

If you prefer to keep using port 3000:

```bash
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Restart dev server (should use port 3000)
npm run dev
```

But it's easier to just add port 3001 to Google Console.

---

## **📋 Current Configuration Status:**

✅ **Local Environment**: Updated to use localhost:3001  
✅ **NextAuth Config**: Added cookie settings  
⏳ **Google Console**: Needs localhost:3001 added  
✅ **Production Config**: Already correct for www.roshestudios.co.uk  

**After updating Google Console, your OAuth should work perfectly!**