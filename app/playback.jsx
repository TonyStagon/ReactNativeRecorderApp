import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

export default function PlaybackScreen() {
  const router = useRouter();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const uri = router.query?.uri;

  useEffect(() => {
    if (uri) {
      const loadSound = async () => {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: decodeURIComponent(uri) },
            { shouldPlay: false }
          );
          setSound(sound);
        } catch (error) {
          console.error('Error loading sound:', error);
        }
      };

      loadSound();

      return () => {
        if (sound) {
          sound.unloadAsync(); // Unload sound when component is unmounted
        }
      };
    }
  }, [uri]);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  if (!uri) {
    return (
      <View style={styles.container}>
        <Text>No audio file found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Playback Screen</Text>
      <Button
        title={isPlaying ? 'Pause Audio' : 'Play Audio'}
        onPress={togglePlayback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
});
