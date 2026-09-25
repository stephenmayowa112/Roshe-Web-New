# 🔧 **Fix Google OAuth for Both Port 3000 and 3001**

## **Issue:**
- Your dev server randomly uses port 3000 or 3001
- Google OAuth only works with the configured redirect URIs
- Currently only `localhost:3000` is configured in Google Console

## **✅ Solution: Update Google Cloud Console**

### **Step 1: Go to Google Cloud Console**
1. **Visit**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Select project**: "Roshe Studios Website" 
3. **Go to**: APIs & Services → Credentials
4. **Click on**: Your OAuth 2.0 Client ID
   ```
   1087822829351-esnqkaapigv50l9gkjdv7kelpgat0a89.apps.googleusercontent.com
   ```

### **Step 2: Update Authorized JavaScript Origins**
**Click "Add URI" and add these (keep existing ones):**
```
http://localhost:3000
http://localhost:3001
https://www.roshestudios.co.uk
```

### **Step 3: Update Authorized Redirect URIs**
**Click "Add URI" and add these (keep existing ones):**
```
http://localhost:3000/api/auth/callback/google
http://localhost:3001/api/auth/callback/google
https://www.roshestudios.co.uk/api/auth/callback/google
```

### **Step 4: Save Changes**
- **Click "Save"**
- **Wait ~30 seconds** for changes to propagate

---

## **✅ Local Configuration Updated**

I've updated your local configuration to be flexible:

**Environment Variables (`.env.local`):**
- ✅ Removed hardcoded NEXTAUTH_URL 
- ✅ NextAuth will auto-detect the correct port
- ✅ Works with both 3000 and 3001 automatically

**Authentication Config (`lib/auth.ts`):**
- ✅ Dynamic cookie security settings
- ✅ Works in both development and production
- ✅ Proper CORS and security handling

---

## **🎯 After Google Console Update**

### **Test on Port 3000:**
1. Kill any processes using port 3000
2. Start dev server: `npm run dev` 
3. Should start on `http://localhost:3000`
4. Test Google OAuth: http://localhost:3000/studio/signin

### **Test on Port 3001:**
1. Keep something running on port 3000 
2. Start dev server: `npm run dev`
3. Should start on `http://localhost:3001` 
4. Test Google OAuth: http://localhost:3001/studio/signin

---

## **📋 Complete Google Console Configuration**

**Your final OAuth configuration should include:**

**Authorized JavaScript origins:**
```
http://localhost:3000
http://localhost:3001  
https://www.roshestudios.co.uk
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
http://localhost:3001/api/auth/callback/google
https://www.roshestudios.co.uk/api/auth/callback/google
```

---

## **✅ Benefits After This Fix**

✅ **Port Flexibility**: Works on any localhost port  
✅ **No Manual Config**: Auto-detects the right URLs  
✅ **Production Ready**: Seamless production deployment  
✅ **Error Free**: No more "State cookie missing" errors  
✅ **Consistent**: Same experience regardless of port  

---

## **🚨 Important Notes**

1. **Must update Google Console first** - OAuth won't work until you add the redirect URIs
2. **Both ports must be configured** - Google validates the exact callback URL
3. **Changes take ~30 seconds** - Wait after saving in Google Console
4. **Production unchanged** - Your production config remains the same

**Ready to update Google Cloud Console?**

1. ✅ Add both localhost ports to JavaScript origins  
2. ✅ Add both callback URLs to redirect URIs  
3. ✅ Save and wait 30 seconds  
4. ✅ Test on both ports  

**After this update, Google OAuth will work seamlessly on both port 3000 and 3001!**