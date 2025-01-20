import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

export default function RecordScreen() {
  const [recording, setRecording] = useState(null);
  const [message, setMessage] = useState('');
  const [uri, setUri] = useState('');
  const router = useRouter();

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        setMessage('Permission to access microphone is required.');
        return;
      }

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(newRecording);
      setMessage('Recording...');
    } catch (err) {
      console.error('Failed to start recording:', err);
      setMessage('Could not start recording.');
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      setMessage('No active recording to stop.');
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const fileUri = recording.getURI();
      console.log('Recording saved at:', fileUri);
      setUri(fileUri); // Save URI to state
      setMessage('Recording saved!');
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording:', err);
      setMessage('Could not stop recording.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      {uri ? <Text>File saved at: {uri}</Text> : null}
      {recording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      {uri ? (
        <Button
          title="Open File"
          onPress={() => router.push(`/playback?uri=${encodeURIComponent(uri)}`)}
        />
      ) : null}
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
