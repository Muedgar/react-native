import { useEffect } from 'react';
import { Button, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function AnimationOne() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  useEffect(() => {
    
  }, []);

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Animated.View className="absolute top-10">
        <Animated.View className="w-32 h-32 bg-red-300 rounded-full" style={[style]} />
        <Animated.View className="absolute top-5 left-5 w-10 h-10 bg-black rounded-full" />
      </Animated.View>
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = randomWidth.value + 20;
        }}
      />
    </View>
  );
}
