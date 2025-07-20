import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { videos, videos2, videos3 } from '../../constants/index';
import ReelScreen from '../ReelScreen';

const {height, width} = Dimensions.get('window');

const VideoFeedItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.feedItem} activeOpacity={0.8}>
    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
    <View style={styles.feedOverlay}>
      <Text style={styles.feedTitle}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const allVideos = [...videos, ...videos2, ...videos3];
  const [reelVisible, setReelVisible] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const lastOffset = useRef(0);

  const openReel = (index) => {
    setReelIndex(index);
    setReelVisible(true);
  };

  const closeReel = () => setReelVisible(false);

  // Scroll handler to show/hide tab bar
  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffset.current ? 'down' : 'up';
    if (direction === 'down' && currentOffset > 30) {
      setTabBarVisible(false);
    } else if (direction === 'up') {
      setTabBarVisible(true);
    }
    lastOffset.current = currentOffset;
  };


  // Communicate tabBarVisible to parent via context or event (see _layout.jsx for implementation)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__setTabBarVisible && window.__setTabBarVisible(tabBarVisible);
    }
  }, [tabBarVisible]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <LinearGradient
        colors={["rgba(125, 72, 230, 0.7)", "rgba(36, 45, 211, 0.2)"]}
        start={{ x: 1, y:  0}}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', margin: 16 }}>Video Feed</Text>
      <FlatList
        data={allVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <VideoFeedItem item={item} onPress={() => openReel(index)} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <ReelScreen visible={reelVisible} onClose={closeReel} initialIndex={reelIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    height: 220,
    width: width - 32,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  feedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
  },
  feedTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
    color: '#222',
  },
});

export default HomeScreen