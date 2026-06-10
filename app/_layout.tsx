import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { TodoProvider } from '@/components/todos/todo-store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TodoProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="tasks/new" options={{ headerShown: false }} />
          <Stack.Screen
            name="tasks/[id]/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="tasks/[id]/edit"
            options={{ headerShown: false }}
          />
        </Stack>
      </TodoProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
