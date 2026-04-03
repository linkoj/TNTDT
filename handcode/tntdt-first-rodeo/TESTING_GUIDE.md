# Testing Guide

Complete guide for testing the TnTdT Trainer authentication and onboarding system.

## 🧪 Test Environment Setup

### Prerequisites
- Firebase project created
- Firebase credentials configured in `config/firebase.ts`
- Dependencies installed: `npm install firebase`
- App running: `npm start`

### Test User Accounts

Use these test emails for consistency:
```
test1@tntdt.dev    password: TestPassword123
test2@tntdt.dev    password: TestPassword123
test3@tntdt.dev    password: TestPassword123
```

## ✅ Authentication Tests

### Test 1: Sign Up Flow

**Steps:**
1. Launch app
2. Tap "Sign Up"
3. Enter:
   - Name: Test User One
   - Email: test1@tntdt.dev
   - Password: TestPassword123
   - Confirm: TestPassword123
4. Tap "Sign Up" button

**Expected Result:**
- ✅ No errors shown
- ✅ Onboarding page 1 displays
- ✅ User created in Firebase Console

**Verification:**
```
Firebase Console → Authentication → Users
Should see: test1@tntdt.dev with matching UID
```

### Test 2: Email Validation

**Steps:**
1. Tap "Sign Up"
2. Enter invalid email: `invalidemail`
3. Tap "Sign Up"

**Expected Result:**
- ✅ Error alert shown
- ✅ Screen not submitted

### Test 3: Password Validation

**Test 3a: Password Too Short**
1. Tap "Sign Up"
2. Enter password: `123` (less than 6 chars)
3. Tap "Sign Up"

**Expected Result:** ✅ Error: "Password must be at least 6 characters"

**Test 3b: Passwords Don't Match**
1. Tap "Sign Up"
2. Password: TestPassword123
3. Confirm: DifferentPassword456
4. Tap "Sign Up"

**Expected Result:** ✅ Error: "Passwords do not match"

### Test 4: Email Already In Use

**Prerequisites:** User already exists with email

**Steps:**
1. Tap "Sign Up"
2. Use existing email
3. Tap "Sign Up"

**Expected Result:**
- ✅ Error: "This email is already in use"

### Test 5: Login Flow

**Steps:**
1. From login screen
2. Email: test1@tntdt.dev
3. Password: TestPassword123
4. Tap "Login"

**Expected Result:**
- ✅ Redirects to main app
- ✅ User stays logged in on app restart

### Test 6: Invalid Credentials

**Steps:**
1. From login screen
2. Email: test1@tntdt.dev
3. Password: WrongPassword
4. Tap "Login"

**Expected Result:** ✅ Error: "Incorrect password"

### Test 7: Non-existent User

**Steps:**
1. From login screen
2. Email: nonexistent@email.com
3. Password: TestPassword123
4. Tap "Login"

**Expected Result:** ✅ Error: "User not found"

### Test 8: Password Reset

**Steps:**
1. From login screen
2. Tap "Forgot Password?"
3. Enter email: test1@tntdt.dev
4. Tap "Send Reset Link"

**Expected Result:**
- ✅ Success message shown
- ✅ Redirects to login
- ✅ Email sent (check inbox or Firebase Console)

### Test 9: Sign Up Missing Fields

**Steps:**
1. Tap "Sign Up"
2. Leave any field empty
3. Tap "Sign Up"

**Expected Result:** ✅ Error: "Please fill in all fields"

### Test 10: Login Missing Fields

**Steps:**
1. From login screen
2. Leave email empty
3. Tap "Login"

**Expected Result:** ✅ Error: "Please fill in all fields"

## 🎯 Onboarding Tests

### Test 11: Complete Onboarding Flow

**Steps:**
Follow through all 10 pages:

**Page 1 - Fitness Goals:**
1. Tap "Build Muscle Mass"
2. Tap Continue

**Expected:** ✅ Navigates to page 2

**Page 2 - Experience Level:**
1. Tap "Intermediate"
2. Tap Continue

**Expected:** ✅ Navigates to page 3

**Page 3 - Days Per Week:**
1. Tap "4 Days/Week"
2. Tap Continue

**Expected:** ✅ Navigates to page 4

**Page 4 - Session Duration:**
1. Tap "60 Minutes"
2. Tap Continue

**Expected:** ✅ Navigates to page 5

**Page 5 - Injuries:**
1. Tap "No Injuries/Limitations"
2. Tap Continue

**Expected:** ✅ Navigates to page 6

**Page 6 - Equipment:**
1. Tap "Barbell"
2. Tap "Dumbbells"
3. Tap Continue

**Expected:** ✅ Both selected, navigates to page 7

**Page 7 - Training Split:**
1. Tap "Upper/Lower"
2. Tap Continue

**Expected:** ✅ Navigates to page 8

**Page 8 - Focus Areas:**
1. Tap "Chest"
2. Tap "Back"
3. Tap "Shoulders"
4. Tap Continue

**Expected:** ✅ All selected, navigates to page 9

**Page 9 - Dietary Preferences:**
1. Tap "Omnivore"
2. Tap Continue

**Expected:** ✅ Navigates to page 10

**Page 10 - Supplements & Completion:**
1. Tap "Protein Powder"
2. Tap "Complete & Start Training 🚀"

**Expected:**
- ✅ Loading indicator shows
- ✅ Redirects to main app
- ✅ No errors

### Test 12: Back Navigation

**Steps:**
1. Complete page 1
2. On page 2, tap "← Back"

**Expected:** ✅ Returns to page 1 with data preserved

### Test 13: Data Persistence During Navigation

**Steps:**
1. Page 1: Select "Lose Fat"
2. Continue to page 2
3. Go back to page 1

**Expected:** ✅ "Lose Fat" is still selected

### Test 14: Multi-select Options

**Steps:**
1. On page 6 (Equipment):
   - Tap "Barbell" (should select)
   - Tap "Dumbbells" (should select)
   - Tap "Kettlebells" (should select)
   - Tap "Barbell" again (should deselect)

**Expected:** ✅ Selections work correctly with checkmarks

### Test 15: Mandatory Field Validation

**Steps:**
1. On page 6 (Equipment):
2. Don't select any equipment
3. Tap "Continue"

**Expected:** ✅ Alert: "Please select at least one equipment option"

### Test 16: Progress Bar Accuracy

**Steps:**
1. Complete page 1

**Expected:** ✅ Progress bar shows 10% filled

**Steps:**
2. Complete page 9

**Expected:** ✅ Progress bar shows 90% filled

**Steps:**
3. On Final page

**Expected:** ✅ Progress bar shows 100% filled

### Test 17: Injury Notes (Conditional Field)

**Steps:**
1. Page 5: Select "Lower Back Issues"
2. See text input appear

**Expected:** ✅ Notes input appears

**Steps:**
3. Cancel and select "No Injuries"

**Expected:** ✅ Notes input disappears

## 💾 Firebase Data Tests

### Test 18: Data Saved After Onboarding

**Steps:**
1. Complete entire onboarding
2. Check Firebase Console

**Path:** Realtime Database → users → [user-uid]

**Expected Data:**
```json
{
  "uid": "abc123...",
  "name": "Test User One",
  "email": "test1@tntdt.dev",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "onboardingCompleted": true,
  "onboardingCompletedAt": "2024-01-15T10:35:00.000Z",
  "fitnessGoal": "muscle_gain",
  "experienceLevel": "intermediate",
  "daysPerWeek": "4",
  "sessionDuration": "60",
  "injuries": "none",
  "equipment": ["barbell", "dumbbell"],
  "preferredSplit": "upper_lower",
  "trainingFocus": ["chest", "back", "shoulders"],
  "dietaryPreferences": "omnivore",
  "supplementsInterest": "protein"
}
```

### Test 19: Data Format Validation

**Steps:** Check Firebase Console after onboarding

**Verify:**
- ✅ String fields are strings
- ✅ Array fields are arrays
- ✅ Boolean fields are booleans
- ✅ Dates are ISO format
- ✅ No null/undefined values

### Test 20: User Profile Creation

**Steps:**
1. After sign up but before onboarding
2. Check Firebase Console

**Expected Path:** users → [uid]

**Expected Fields:**
- ✅ uid
- ✅ name
- ✅ email
- ✅ createdAt
- ✅ onboardingCompleted: false

## 🔄 State Management Tests

### Test 21: Auth Context Updates

**Steps:**
1. Open developer console
2. Monitor auth context changes
3. Sign up → onboarding → completion

**Expected:**
- ✅ Auth context has user object
- ✅ isAuthenticated changes appropriately
- ✅ signOut function works

### Test 22: Onboarding Context Updates

**Steps:**
1. Complete page 1
2. Check context data

**Expected:**
```typescript
{
  fitnessGoal: "muscle_gain",
  experienceLevel: "",
  // ... other empty fields
}
```

## 🎨 UI/UX Tests

### Test 23: Loading States

**Steps:**
1. Tap login button
2. Observe immediately

**Expected:** ✅ Button shows loading spinner

### Test 24: Keyboard Handling

**Steps:**
1. Tap email input
2. Enter text
3. Tap next field

**Expected:** ✅ Keyboard appears/disappears appropriately

### Test 25: Error Messages Display

**Steps:**
1. Attempt invalid action
2. Check error alert

**Expected:**
- ✅ Clear error message shown
- ✅ Message is readable
- ✅ OK button dismisses alert

### Test 26: Screen Orientation

**Steps:**
1. On any screen
2. Rotate device

**Expected:** ✅ Layout adjusts properly (if implemented)

### Test 27: Disabled States

**Steps:**
1. On sign up
2. Tap Sign Up immediately
3. While loading, try to tap again

**Expected:** ✅ Button is disabled during loading

### Test 28: Visual Feedback

**Steps:**
1. Select option
2. Observe visual change

**Expected:**
- ✅ Border color changes to blue
- ✅ Background color changes to light blue
- ✅ Selection indicator shows

## ⚠️ Error Recovery Tests

### Test 29: Network Disconnection

**Steps:**
1. Go offline (disable WiFi/data)
2. Try to sign up

**Expected:**
- ✅ Error displayed
- ✅ Can retry when online

### Test 30: Firebase Connection Issues

**Steps:**
1. Wrong Firebase credentials
2. Try to sign up

**Expected:**
- ✅ Error: Firebase configuration issue
- ✅ User informed

## 🔐 Security Tests

### Test 31: Password Field Masking

**Steps:**
1. On sign up
2. Look at password field

**Expected:** ✅ Password characters shown as dots

### Test 32: Auth Persistence

**Steps:**
1. Sign up and complete onboarding
2. Close app completely
3. Reopen app

**Expected:** ✅ Still logged in (no login screen)

### Test 33: Logout Test

**Steps:**
1. Add logout button to profile
2. Tap logout
3. Check login screen appears

**Expected:** ✅ Session cleared, redirected to login

## 📊 Performance Tests

### Test 34: Page Load Time

**Steps:**
1. Time each page load
2. Should be < 500ms

**Expected:** ✅ Smooth transitions

### Test 35: Data Entry Speed

**Steps:**
1. Try typing quickly
2. Check for lag

**Expected:** ✅ Smooth text input

## 🔬 Debugging Tests

### Test 36: Console Messages

**Steps:**
1. Press `d` in Expo
2. Check developer console

**Expected:**
- ✅ Can see errors if they occur
- ✅ Can debug issues
- ✅ React Native debugging works

## ✅ Final Checklist

Before deployment:

- [ ] All 36 tests passed
- [ ] No console errors
- [ ] Firebase data correct
- [ ] Navigation smooth
- [ ] Error handling works
- [ ] Data persists
- [ ] UI responsive
- [ ] Performance acceptable
- [ ] No security issues
- [ ] Ready for production

## 📝 Test Report Template

```
Date: ___________
Tester: ___________
App Version: ___________

Tests Passed: ___/36
Tests Failed: ___/36

Failed Tests:
- Test #: ___________
  Issue: ___________
  Steps to Reproduce: ___________
  
Severity (1-5): _____
Assignee: ___________

Notes:
___________________________________________________________
```

## 🚀 Continuous Testing

After each code change:
- [ ] Run sign up test
- [ ] Run onboarding test
- [ ] Check Firebase data
- [ ] Test navigation

## Support

Issues during testing?
1. Check `QUICK_START.md`
2. Review `FIREBASE_SETUP.md`
3. Check Firebase Console
4. Review browser console errors
