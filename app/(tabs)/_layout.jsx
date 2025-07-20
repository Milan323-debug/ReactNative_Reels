import { useAuth } from "@/hooks/useAuth.jsx";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, Tabs } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Animated, View } from "react-native";

const TabsLayout = () => {
  const { user, loading } = useAuth();
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const tabBarAnim = useRef(new Animated.Value(0)).current; // 0: visible, 1: hidden

  useEffect(() => {
    // Expose setter globally for feed screen to call
    window.__setTabBarVisible = (visible) => setTabBarVisible(visible);
    return () => {
      window.__setTabBarVisible = undefined;
    };
  }, []);

  useEffect(() => {
    Animated.timing(tabBarAnim, {
      toValue: tabBarVisible ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [tabBarVisible]);

  if (loading) return null;
  if (!user) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: () => (
            <View edges={["bottom"]} style={{ flex: 1, paddingBottom: 0 }}>
              <LinearGradient
                colors={["rgba(153, 106, 255, 0.93)", "rgba(16, 104, 255, 0.93)"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              />
            </View>
          )}}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#ccc",
          tabBarStyle: [
            {
              position: 'absolute',
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              elevation: 0,
              height: 48,
              minHeight: 48,
              maxHeight: 56,
              paddingTop: 8,
              borderRadius: 8,
              overflow: 'hidden',
              transform: [{
                translateY: tabBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                })
              }],
              opacity: tabBarAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }
          ],
          tabBarHideOnKeyboard: true,
          tabBarBackground: () => (
            <View edges={["bottom"]} style={{ flex: 1, paddingBottom: 0 }}>
              <LinearGradient
                colors={["rgba(153, 106, 255, 0.93)", "rgba(16, 104, 255, 0.93)"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
              />
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

export default TabsLayout;
