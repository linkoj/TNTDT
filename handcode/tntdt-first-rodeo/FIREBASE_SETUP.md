# TnTdT Trainer - Firebase Auth & Onboarding Setup

This is a complete React Native Expo implementation of Firebase authentication and a 10-page onboarding questionnaire for the TnTdT Trainer fitness app.

## Features

✅ **Firebase Authentication**
- Email/Password signup and login
- Password reset functionality
- Auth context for global state management

✅ **10-Page Onboarding Questionnaire**
1. Fitness Goals
2. Training Experience Level
3. Available Training Days/Week
4. Session Duration
5. Injuries/Limitations
6. Equipment Available
7. Preferred Training Split
8. Training Focus Areas
9. Dietary Preferences
10. Supplement Preferences

✅ **Data Storage**
- User profiles saved to Firebase Realtime Database
- Onboarding data persisted after completion
- User profile enrichment with fitness preferences

## Installation

### 1. Install Firebase Package

```bash
npm install firebase
# or
yarn add firebase
```

### 2. Configure Firebase

Update `config/firebase.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  databaseURL: 'YOUR_DATABASE_URL',
};
```

### 3. Firebase Setup (Console)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable **Authentication** (Email/Password method)
4. Create a **Realtime Database** in test mode
5. Copy your config from Project Settings

### 4. Database Rules (Realtime DB)

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

## File Structure

```
app/
├── (auth)/
│   ├── _layout.tsx          # Auth stack layout
│   ├── index.tsx            # Auth index (redirects to login)
│   ├── login.tsx            # Login screen
│   ├── signup.tsx           # Sign up screen
│   ├── forgot-password.tsx  # Password reset screen
│   └── onboarding/
│       ├── _layout.tsx      # Onboarding stack layout
│       ├── index.tsx        # Onboarding index
│       ├── page1.tsx        # Fitness Goals
│       ├── page2.tsx        # Experience Level
│       ├── page3.tsx        # Days/Week
│       ├── page4.tsx        # Session Duration
│       ├── page5.tsx        # Injuries
│       ├── page6.tsx        # Equipment
│       ├── page7.tsx        # Training Split
│       ├── page8.tsx        # Focus Areas
│       ├── page9.tsx        # Dietary Preferences
│       ├── page10.tsx       # Supplement Preferences (Final)
│       └── page11.tsx       # Completion Page (named page11 for 10 questions)
│
├── (tabs)/                  # Main app (only shown after onboarding)
│   └── ...
│
└── _layout.tsx              # Root layout with providers

config/
└── firebase.ts              # Firebase configuration

context/
├── AuthContext.tsx          # Auth state management
└── OnboardingContext.tsx    # Onboarding state management
```

## Usage

### Authentication Flow

1. **User starts app** → Loads `RootLayout`
2. **AuthProvider checks** → Is user authenticated?
   - **No** → Show `(auth)` screens (login/signup)
   - **Yes** → Show `(tabs)` main app
3. **User signs up** → Saved to Firebase + redirects to onboarding
4. **User completes onboarding** → All data saved to Firebase + redirects to main app

### Sign Up Flow

```
SignUp Screen
    ↓
Create Firebase Auth User
    ↓
Create User Profile in Database
    ↓
Redirect to Onboarding Page 1
```

### Onboarding Flow

```
Page 1 (Goal) → Page 2 (Level) → Page 3 (Days) → Page 4 (Duration) 
    → Page 5 (Injuries) → Page 6 (Equipment) → Page 7 (Split) 
    → Page 8 (Focus) → Page 9 (Diet) → Page 10 (Final)
    ↓
Save All Data to Firebase
    ↓
Redirect to Main App (tabs)
```

## Data Structure (Firebase Realtime DB)

```
users/
  {uid}/
    uid: string
    name: string
    email: string
    createdAt: ISO string
    onboardingCompleted: boolean
    onboardingCompletedAt: ISO string (if completed)
    
    // Onboarding data
    fitnessGoal: string (e.g., 'muscle_gain')
    experienceLevel: string (e.g., 'intermediate')
    daysPerWeek: string (e.g., '4')
    sessionDuration: string (e.g., '60')
    injuries: string (e.g., 'none')
    equipment: string[] (e.g., ['barbell', 'dumbbell'])
    preferredSplit: string (e.g., 'upper_lower')
    trainingFocus: string[] (e.g., ['chest', 'back'])
    dietaryPreferences: string (e.g., 'omnivore')
    supplementsInterest: string (e.g., 'protein')
```

## Context Hooks

### useAuth()

```typescript
const { user, loading, isAuthenticated, signOut } = useAuth();

// Properties:
// - user: Firebase User object or null
// - loading: boolean (true while checking auth state)
// - isAuthenticated: boolean
// - signOut: () => Promise<void>
```

### useOnboarding()

```typescript
const { data, updateData, resetData } = useOnboarding();

// Properties:
// - data: OnboardingData object
// - updateData: (key: string, value: any) => void
// - resetData: () => void
```

## Common Tasks

### Accessing User Data

```typescript
import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { user } = useAuth();
  
  return <Text>{user?.email}</Text>;
}
```

### Accessing Onboarding Data

```typescript
import { useOnboarding } from '@/context/OnboardingContext';

export default function MyComponent() {
  const { data } = useOnboarding();
  
  return <Text>{data.fitnessGoal}</Text>;
}
```

### Updating Onboarding Data

```typescript
const { data, updateData } = useOnboarding();

updateData('fitnessGoal', 'muscle_gain');
```

## Styling

All screens use consistent styling with:
- **Primary Color**: `#007AFF` (iOS blue)
- **Success Color**: `#34C759` (iOS green)
- **Background**: `#f8f9fa` (light gray)
- **Card Background**: `white`

## Troubleshooting

### Firebase Not Initializing

- Check your Firebase config in `config/firebase.ts`
- Verify all credentials are correct
- Check Firebase console for API restrictions

### Onboarding Not Saving

- Verify Database Rules allow user writes
- Check that user is authenticated
- Check browser console for Firebase errors

### Navigation Issues

- Clear Expo's cache: `expo start -c`
- Verify all route files exist
- Check `_layout.tsx` files for correct nesting

## API Reference

### Authentication Methods

- `createUserWithEmailAndPassword(auth, email, password)`
- `signInWithEmailAndPassword(auth, email, password)`
- `sendPasswordResetEmail(auth, email)`
- `signOut(auth)`

### Database Methods

- `ref(database, path)` - Create database reference
- `set(ref, data)` - Write data
- `update(ref, data)` - Update data
- `get(ref)` - Read data

## Performance Notes

- Auth context caches user state globally
- Onboarding data persists in memory during flow
- All data writes are batched on completion
- Progress bar updates locally without API calls

## Security Considerations

- Never expose Firebase config in source code (use environment variables in production)
- Use Database Rules to restrict access
- Implement password strength validation
- Add email verification for production
- Consider rate limiting for auth endpoints

## Future Enhancements

- [ ] Social authentication (Google, Apple)
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] User profile editing
- [ ] Onboarding retake functionality
- [ ] Progress analytics
- [ ] AI recommendations based on onboarding data

## Support

For Firebase documentation, visit: https://firebase.google.com/docs

For Expo documentation, visit: https://docs.expo.dev
