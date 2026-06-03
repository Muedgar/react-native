import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SimpleCalculatorTwo() {
  const buttons = [
    ['⌫', 'C', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '='],
  ];

  const handlePress = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='w-full h-full bg-black'>
        <View className='w-full h-[200px] bg-slate-300 p-4 mt-20'>
            <View className='w-full h-[65%] bg-green-100'></View>
            <View className='w-full h-[35%] bg-green-200'></View>
        </View>
        {buttons.map((button, index) => (
          <View key={index} className="h-[100px] w-full flex-row justify-evenly p-4 bg-green-500">
            {button.map((btn, index) => (
                <Pressable
            key={index}
            onPress={handlePress}
          >
            <View className="h-[70px] w-[70px] bg-amber-200">
              <Text className="h-[40px] w-[40px]">{button}</Text>
            </View>
          </Pressable>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
