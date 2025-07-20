import { useAuth } from '@/hooks/useAuth.jsx';
import { Redirect, Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) {
    return <Redirect href={'/'} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}