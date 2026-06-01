import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Counter() {
  const [count, setCount] = useState(0);

  const handlePress = (mode: 'up' | 'down') => {
    switch (mode) {
      case 'up':
        setCount((prev) => prev + 1);
        break;
      case 'down':
        setCount((prev) => Math.max(prev - 1, 0));
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <View className="flex-1 flex-col items-center justify-center px-4">
        <View className="w-full items-center">
          <TouchableOpacity
            onPress={() => handlePress('up')}
            className="rounded-lg bg-black px-6 py-3 shadow-lg shadow-black/30"
          >
            <Text className="text-4xl font-bold text-white">Increase</Text>
          </TouchableOpacity>
        </View>
        <View className="mb-10 mt-10 w-full items-center">
          <Text className="text-7xl font-bold text-black">{count}</Text>
        </View>
        <View className="w-full items-center">
          <TouchableOpacity
            onPress={() => handlePress('down')}
            className="rounded-lg bg-black px-6 py-3 shadow-lg shadow-black/30"
          >
            <Text className="text-4xl font-bold text-white">Decrease</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
