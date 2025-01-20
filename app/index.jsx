import React, { useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [audioNotes, setAudioNotes] = useState([
    // Mock data for testing
    { id: '1', name: 'Meeting Notes', date: '2024-11-06', duration: '2:34' },
    { id: '2', name: 'Grocery List', date: '2024-11-07', duration: '1:12' },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.note} 
      onPress={() => router.push(`/playback?id=${item.id}`)}
    >
      <Text style={styles.noteTitle}>{item.name}</Text>
      <Text style={styles.noteDetails}>
        {item.date} • {item.duration}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={audioNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes available</Text>}
      />
      <View style={styles.buttons}>
        <Button title="Record New Note" onPress={() => router.push('/record')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  note: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDetails: {
    color: 'gray',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  buttons: {
    marginVertical: 16,
  },
});
