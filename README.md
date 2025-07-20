
# Video_FEED App

An advanced social video feed application built with [Expo](https://expo.dev) and React Native, featuring Firebase authentication, TikTok/Instagram-style reels, animated like functionality, and a modern tab navigation experience.

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


## 📱 App Interface Screenshots

<!-- Add your screenshots here. Example: -->
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/badf5ba7-d768-4bbc-a451-35a3a28fc177" width="200"/><br/><sub>Home Screen</sub></td>
    <td><img src="https://github.com/user-attachments/assets/b0459561-d524-4076-8319-9d88f407a7e6" width="200"/><br/><sub>Settings Screen</sub></td>
  </tr>
</table>

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
