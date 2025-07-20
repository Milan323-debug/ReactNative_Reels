// ProfileScreen.jsx
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const gradAnim = useRef(new Animated.Value(0)).current;

  // Fade content in (JS driver)
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,      // <- switched to false
    }).start();
  }, []);

  // Loop gradient animation 0→1 (JS driver)
  useEffect(() => {
    Animated.loop(
      Animated.timing(gradAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: false,     // <- must be false for start/end props
      })
    ).start();
  }, []);

  // Interpolate gradient start/end
  const start = {
    x: gradAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    y: gradAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }),
  };
  const end = {
    x: gradAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    y: gradAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }),
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <AnimatedGradient
        colors={['#f400abff', '#e659ffff', '#0077ffff']}
        start={start}
        end={end}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.avatarWrapper,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
          style={styles.avatar}
        />
      </Animated.View>

      <Animated.View style={[styles.infoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.name}>Alex Smith</Text>
        <Text style={styles.bio}>Digital Nomad • Traveler • Dev Enthusiast</Text>
      </Animated.View>

      <Animated.View style={[styles.statsRow, { opacity: fadeAnim }]}>
        {['Posts', 'Followers', 'Following'].map((label, i) => (
          <View key={i} style={styles.stat}>
            <Text style={styles.statNum}>
              {label === 'Followers' ? '12K' : label === 'Posts' ? '256' : '400'}
            </Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </Animated.View>

      <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followBtnText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageBtnText}>Message</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const AVATAR_SIZE = 120;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
    backgroundColor: '#000',
  },
  logoutBtn: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 1,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  bio: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 32,
  },
  stat: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  actions: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  followBtn: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 25,
    alignItems: 'center',
  },
  followBtnText: {
    color: '#242DD3',
    fontWeight: '600',
    fontSize: 16,
  },
  messageBtn: {
    flex: 1,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 25,
    alignItems: 'center',
  },
  messageBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
