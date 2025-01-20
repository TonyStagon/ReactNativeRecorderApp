import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <Stack>
    <Stack.Screen name="index" options={{ title: "Voice Notes", headerShown: false }} />
    <Stack.Screen name="record" options={{ title: "Record Audio" }} />
    <Stack.Screen name="playback" options={{ title: "Playback Audio" }} />
  </Stack>
  );
}
