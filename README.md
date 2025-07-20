
# Video_FEED App

An advanced social video feed application built with [Expo](https://expo.dev) and React Native, featuring Firebase authentication, TikTok/Instagram-style reels, animated like functionality, and a modern tab navigation experience.

---
## 📱 App Interface Screenshots

<!-- Add your screenshots here. Example: -->
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a6c29b90-56ef-422d-8e82-1a49a8ba159d" width="200"/><br/><sub>Login Screen</sub></td>
    <td><img src="https://github.com/user-attachments/assets/e9468a44-df51-4af7-9e5e-857833f5915b" width="200"/><br/><sub>Sign In Screen</sub></td>
  </tr>
   <tr>
    <td><img src="https://github.com/user-attachments/assets/52887c52-a11b-453d-80fb-ef309e78a895" width="200"/><br/><sub>Feeds Screen</sub></td>
    <td><img src="https://github.com/user-attachments/assets/53d0fb02-0966-42f3-9342-cf591ed612b2" width="200"/><br/><sub>Reels Screen</sub></td>
    <td><img src="https://github.com/user-attachments/assets/d1d851d4-19e5-4982-bf9f-bb3a66bdb4cc" width="200"/><br/><sub>Profile Screen</sub></td>
  </tr>
</table>

---

## 🚀 Features

- Firebase Authentication (Sign In/Sign Up)
- Infinite vertical video feed (reels)
- Animated like button with real-time like count (Firestore)
- Modal full-screen video viewing
- Custom bottom tab navigation (Home, Discover, Upload, Notifications, Profile)
- User profile with photo, name, email, and liked videos
- Responsive design and safe area handling

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase Project](https://firebase.google.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Video_FEED
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Update `FirebaseConfig.ts` with your Firebase project credentials.

### Running the App
Start the Expo development server:
```bash
npx expo start
```
You can open the app in:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

---

## 🗂️ Project Structure

- `app/` — Main application code (screens, navigation, layouts)
- `components/` — Reusable UI components
- `constants/` — Static data and configuration
- `assets/` — Images, fonts, and other static assets
- `FirebaseConfig.ts` — Firebase setup

---

## 🛠️ Development

- Edit files in the `app` directory to add or modify screens and features.
- This project uses [file-based routing](https://docs.expo.dev/router/introduction/).

### Resetting the Project
To reset to a blank project:
```bash
npm run reset-project
```
This will move starter code to `app-example/` and create a blank `app/` directory.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

## 💬 Community & Support

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord Community](https://chat.expo.dev)
