# Implementation Guide - TnTdT Trainer Onboarding

This guide provides step-by-step instructions to implement the Firebase authentication and 10-page onboarding questionnaire in your TnTdT Trainer app.

## Quick Start

### Step 1: Install Firebase

```bash
npm install firebase
```

### Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Set up Authentication (Email/Password)
4. Create a Realtime Database

### Step 3: Update Firebase Config

Edit `config/firebase.ts` with your credentials:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  databaseURL: 'https://YOUR_PROJECT.firebaseio.com',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
```

### Step 4: Start Your App

```bash
npm start
# or
expo start
```

## Features Included

### 🔐 Authentication

- **Sign Up**: Create new accounts with email/password
- **Login**: Existing users can log in
- **Password Reset**: Users can reset forgotten passwords
- **Auth State Management**: Global context tracks authentication status

### 📝 Onboarding Questionnaire (10 Pages)

1. **Fitness Goal** - Select primary goal (muscle gain, fat loss, strength, etc.)
2. **Experience Level** - Choose your training experience (beginner to elite)
3. **Training Days Per Week** - Frequency per week (2-6 days)
4. **Session Duration** - Length of training sessions (30-90 minutes)
5. **Injuries/Limitations** - Report any injuries or physical limitations
6. **Equipment Available** - Select available equipment (multiple choice)
7. **Preferred Training Split** - Choose workout structure (full body, PPL, etc.)
8. **Training Focus Areas** - Select muscle groups to prioritize (multiple choice)
9. **Dietary Preferences** - Choose dietary approach (vegan, keto, etc.)
10. **Supplement Preferences** - Interest in supplements (completion page)

### 💾 Data Persistence

- All user data saved to Firebase Realtime Database
- Secure data access with user-specific read/write rules
- Onboarding completion tracked
- Easy retrieval of user preferences for AI recommendations

## File Structure Explained

### Authentication Files

```
app/(auth)/
├── _layout.tsx           # Navigation stack for auth screens
├── index.tsx            # Entry point (redirects to login)
├── login.tsx            # Login screen
├── signup.tsx           # Sign up screen
└── forgot-password.tsx  # Password reset screen
```

### Onboarding Files

```
app/(auth)/onboarding/
├── _layout.tsx          # Navigation stack for onboarding pages
├── index.tsx            # Entry point (redirects to page1)
├── page1.tsx            # Question 1
├── page2.tsx            # Question 2
├── ...
└── page11.tsx           # Final completion page
```

### Context Files (Global State)

```
context/
├── AuthContext.tsx          # Manages authentication state
└── OnboardingContext.tsx    # Manages onboarding form data
```

### Configuration

```
config/
└── firebase.ts              # Firebase initialization
```

### Utilities

```
utils/
└── helpers.ts               # Form validation and helpers
```

## Key Components

### AuthProvider

Wraps your app to provide authentication state:

```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

Provides `useAuth()` hook:
```typescript
const { user, loading, isAuthenticated, signOut } = useAuth();
```

### OnboardingProvider

Wraps your app to manage onboarding form data:

```typescript
<OnboardingProvider>
  <App />
</OnboardingProvider>
```

Provides `useOnboarding()` hook:
```typescript
const { data, updateData, resetData } = useOnboarding();
```

## Navigation Flow

```
App Start
  ↓
AuthProvider checks authentication status
  ↓
  ├─→ Not Authenticated → Show (auth) screens
  │     ├─→ Login
  │     ├─→ Sign Up
  │     └─→ Forgot Password
  │
  └─→ Authenticated → Show (tabs) screens
        ├─→ Dashboard
        ├─→ Workouts
        └─→ Profile
```

## Onboarding Flow

```
Sign Up Success
  ↓
Redirect to Onboarding Page 1
  ↓
User answers all 10 questions
  ↓
Each answer saved in context (in-memory)
  ↓
Final page: Save all data to Firebase
  ↓
Redirect to Main App
```

## Usage Examples

### Accessing Current User

```typescript
import { useAuth } from '@/context/AuthContext';

export default function YourComponent() {
  const { user, isAuthenticated } = useAuth();

  return (
    <View>
      {isAuthenticated && <Text>Welcome, {user?.email}!</Text>}
    </View>
  );
}
```

### Accessing Onboarding Data

```typescript
import { useOnboarding } from '@/context/OnboardingContext';

export default function WorkoutScreen() {
  const { data } = useOnboarding();

  return (
    <View>
      <Text>Goal: {data.fitnessGoal}</Text>
      <Text>Experience: {data.experienceLevel}</Text>
      <Text>Days/Week: {data.daysPerWeek}</Text>
    </View>
  );
}
```

### Fetching User Data from Firebase

```typescript
import { ref, get } from 'firebase/database';
import { database } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      get(ref(database, `users/${user.uid}`)).then(snapshot => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      });
    }
  }, [user]);

  return <Text>{userData?.name}</Text>;
}
```

## Database Rules

Set these rules in Firebase Console for security:

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

This ensures:
- Users can only read their own data
- Users can only write to their own data

## Styling Reference

All screens follow these color conventions:

```typescript
Primary Blue: #007AFF         // Action buttons
Success Green: #34C759        // Completion
Light Gray Background: #f8f9fa
White Cards: white
Border Gray: #e0e0e0
Text Dark: #1a1a1a
Text Light: #666, #999
```

## Common Customizations

### Change App Name

Replace "TnTdT Trainer" in screens with your app name

### Add More Onboarding Questions

1. Add field to `OnboardingContext.tsx`
2. Create new page component
3. Add to navigation in `onboarding/_layout.tsx`
4. Update page numbers in progress bars

### Modify Questions/Options

Edit the options arrays in each page component

### Change Colors

Update StyleSheet colors (search for `#007AFF`)

## Testing

### Test Sign Up Flow

1. Tap "Sign Up"
2. Enter email, password, name
3. Confirm onboarding starts

### Test Onboarding

1. Complete all 10 pages
2. Verify data saves to Firebase
3. Check user profile in Firebase Console

### Test Login

1. Log out
2. Login with created account
3. Verify redirect to main app

## Troubleshooting

### "Firebase is not initialized"

- Verify `config/firebase.ts` exists
- Check Firebase credentials are correct

### Onboarding data not saving

- Check Firebase Realtime Database exists
- Verify Database Rules allow writes
- Check browser console for errors

### Navigation not working

- Clear Expo cache: `expo start -c`
- Verify all `_layout.tsx` files exist
- Check console for routing errors

### Email already in use error

- Use different email for testing
- Check Firebase Console for existing users

## Performance Tips

- Auth context caches globally (efficient)
- Onboarding uses in-memory storage (fast)
- Database writes are batched (reduces calls)
- No API calls during onboarding (smooth UX)

## Next Steps

1. ✅ Install Firebase
2. ✅ Configure credentials
3. ✅ Test authentication
4. ✅ Complete onboarding flow
5. 🔄 Connect to your main app features
6. 🚀 Deploy to App Store/Play Store

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [React Context API](https://react.dev/reference/react/useContext)

## API Reference

### Onboarding Data Structure

```typescript
{
  fitnessGoal: string;
  experienceLevel: string;
  daysPerWeek: string;
  sessionDuration: string;
  injuries: string;
  equipment: string[];
  preferredSplit: string;
  trainingFocus: string[];
  dietaryPreferences: string;
  supplementsInterest: string;
}
```

### Firebase User Object

```typescript
{
  uid: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  displayName: string | null;
  // ... more properties
}
```

## License

Feel free to use and modify this implementation for your app.
