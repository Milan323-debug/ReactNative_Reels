import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { arrayRemove, arrayUnion, doc, getFirestore, increment, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { videos, videos2, videos3 } from '../constants/index';

const { height, width } = Dimensions.get('window');


const VideoWrapper = ({ item, isActive }) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  // Listen to like count and user like state in Firestore
 useEffect(() => {
    const videoDocRef = doc(db, 'videos', item.id.toString());
    const unsubscribe = onSnapshot(videoDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikeCount(data.likeCount || 0);
        setLiked(data.likedBy?.includes(user?.uid) || false);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [item.id, user?.uid]);

  const handleLike = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    if (!user) return;
    const videoDocRef = doc(db, 'videos', item.id.toString());
    if (!liked) {
      await updateDoc(videoDocRef, {
        likeCount: increment(1),
        likedBy: arrayUnion(user.uid),
      });
    } else {
      await updateDoc(videoDocRef, {
        likeCount: increment(-1),
        likedBy: arrayRemove(user.uid),
      });
    }
  };

  return (
    <View style={{ height, width, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={["rgba(173, 129, 255, 0.7)", "rgba(22, 34, 255, 0.5)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Video
        ref={videoRef}
        source={{ uri: item.url }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={isActive}
        isLooping
        volume={1.0}
        muted={!isActive}
      />
      {/* Overlay info */}
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleLike} activeOpacity={0.7}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <AntDesign name={liked ? 'heart' : 'hearto'} size={36} color={liked ? '#ff375f' : '#fff'} />
          </Animated.View>
          <Text style={styles.likeCount}>{likeCount}</Text>
          <Text style={styles.actionLabel}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={30} color="#fff" />
          <Text style={styles.actionLabel}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="send" size={28} color="#fff" />
          <Text style={styles.actionLabel}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ReelScreen = ({ visible, onClose, initialIndex = 0 }) => {
  const allVideos = [...videos, ...videos2, ...videos3];
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <FlatList
        ref={flatListRef}
        data={allVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <VideoWrapper item={item} isActive={index === currentIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={0.98}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
        style={{ flex: 1, backgroundColor: '#000' }}
        initialScrollIndex={initialIndex}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  video: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 80,
    zIndex: 2,
  },
  actionsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    alignItems: 'center',
    zIndex: 3,
  },
  actionBtn: {
    alignItems: 'center',
    marginBottom: 28,
  },
  likeCount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    color: '#fff',
    fontSize: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReelScreen;
