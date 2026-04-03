# Quick Start Guide

Get your TnTdT Trainer app with Firebase auth & onboarding running in 5 minutes!

## ⚡ Install Firebase (Required)

```bash
# From project directory
npm install firebase
```

Wait for installation to complete.

## 🔧 Configure Firebase

### 1. Get Firebase Credentials

Go to: https://console.firebase.google.com/
1. Click "Create Project" or select existing
2. Give it a name (e.g., "TnTdT-Trainer-Dev")
3. Accept default settings
4. Click "Create Project"
5. Wait for project creation

### 2. Enable Authentication

1. In left panel: **Build** → **Authentication**
2. Click "Get Started"
3. Select **Email/Password**
4. Enable it
5. Click "Save"

### 3. Create Realtime Database

1. In left panel: **Build** → **Realtime Database**
2. Click "Create Database"
3. Select region (closest to you)
4. Start in **Test Mode** (for development)
5. Click "Enable"

### 4. Get Your Web Config

1. Go to **Settings** (gear icon) → **Project Settings**
2. Scroll to "Your apps" section
3. Click "Web" app (or create if needed)
4. Copy the Firebase config
5. Opens a popup with this format:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "project-123.firebaseapp.com",
  projectId: "project-123",
  storageBucket: "project-123.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123...",
  databaseURL: "https://project-123.firebaseio.com"
};
```

### 5. Update Config File

Edit: `config/firebase.ts`

Replace:
```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',                    // ← Update
  authDomain: 'YOUR_AUTH_DOMAIN',            // ← Update
  projectId: 'YOUR_PROJECT_ID',              // ← Update
  storageBucket: 'YOUR_STORAGE_BUCKET',      // ← Update
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',  // ← Update
  appId: 'YOUR_APP_ID',                      // ← Update
  databaseURL: 'YOUR_DATABASE_URL',          // ← Update
};
```

With your actual values from step 4.

### 6. Set Database Rules

1. In Firebase: **Realtime Database** → **Rules** tab
2. Replace all content with:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

3. Click **Publish**

## 🚀 Start Your App

```bash
npm start
# or
expo start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web

## ✅ Testing Checklist

### Test Sign Up
```
1. Open app
2. Click "Sign Up"
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPassword123
4. Click "Sign Up"
5. Should redirect to onboarding page 1
```

### Test Onboarding
```
1. Page 1: Select "Build Muscle Mass" → Continue
2. Page 2: Select "Intermediate" → Continue
3. Page 3: Select "4 Days/Week" → Continue
4. Page 4: Select "60 Minutes" → Continue
5. Page 5: Select "No Injuries/Limitations" → Continue
6. Page 6: Select "Barbell", "Dumbbells" → Continue
7. Page 7: Select "Upper/Lower" → Continue
8. Page 8: Select "Chest", "Back" → Continue
9. Page 9: Select "Omnivore" → Continue
10. Page 10: Select "Protein Powder" → Complete
11. Should redirect to main app
```

### Verify Firebase Saved Data
```
1. Go to Firebase Console
2. Realtime Database
3. Look for: users → [user-id] → onboarding data
4. Verify all your answers are there
```

### Test Login
```
1. Log out (if there's a logout button)
2. Or restart app
3. Click "Login"
4. Enter: test@example.com / TestPassword123
5. Should redirect to main app
```

## 📝 Quick Commands

```bash
# Start app
npm start

# Clear cache
expo start -c

# Reset project
npm run reset-project

# Install dependencies
npm install

# See logs
npm start -- --log-level=verbose
```

## 🎯 File Locations

Important files you might need:
```
config/firebase.ts           ← Update with your Firebase config
app/(auth)/login.tsx         ← Login screen
app/(auth)/signup.tsx        ← Sign up screen
app/(auth)/onboarding/       ← 10 onboarding pages
context/AuthContext.tsx      ← Auth state
context/OnboardingContext.tsx ← Form data
```

## 🐛 Troubleshooting

### "Firebase configuration failed"
**Solution**: Check that all fields in `config/firebase.ts` are correctly filled

### "Can't sign up"
**Solution**: 
1. Check email format is valid
2. Check password is at least 6 characters
3. Check Firebase Authentication is enabled

### "Data not saving to Firebase"
**Solution**:
1. Check Realtime Database exists
2. Check Database Rules are published
3. Check browser console for errors (press `d`)

### "Page navigation not working"
**Solution**:
1. Clear cache: `expo start -c`
2. Restart the app
3. Check all page files exist

### "Module not found" errors
**Solution**:
1. Run `npm install` to install all dependencies
2. Make sure `firebase` is installed

## 📚 Documentation

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Detailed Firebase guide
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - How to use the code
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What's included

## 🎓 Learn More

- Firebase: https://firebase.google.com/docs
- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev

## 💡 Pro Tips

1. **Test with different emails** - Each Firebase account needs different email
2. **Use test mode** - Database rules easier to test
3. **Check console** - Press `d` in Expo to debug
4. **Save your config** - Keep a backup of your Firebase credentials
5. **Monitor usage** - Firebase has free tier limits

## 🎉 You're Done!

You now have:
✅ Firebase authentication (sign up / login / password reset)
✅ 10-page onboarding questionnaire
✅ Data storage in Realtime Database
✅ Secure user profiles
✅ Ready for AI recommendations

Next steps:
1. Customize app colors/branding
2. Add more features to main app
3. Deploy to App Store/Play Store

Enjoy! 🚀💪🏋️
