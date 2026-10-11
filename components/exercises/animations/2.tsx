
import { Button, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export default function ExerciseOne() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  // two
  const xTwo = useSharedValue(0);
  const yTwo = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.inOut(Easing.ease),
  };

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(x.value, config) },
      { translateY: withTiming(y.value, config) },
    ],
  }));

  const styleTwo = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(xTwo.value, config) },
      { translateY: withTiming(yTwo.value, config) }
    ]
  }));

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        className="w-16 h-16 rounded-full bg-red-400"
        style={style}
      />

      <Animated.View 
        className="w-10 h-10 rounded-full bg-slate-300"
        style={styleTwo}
      />


      <View className="absolute top-16 gap-2">
        <Button title="Up" onPress={() => {
          y.value -= 50
          yTwo.value -=100
        }} />
        <Button title="Down" onPress={() => {
          y.value += 50
          yTwo.value += 100
        }} />
        <Button title="Left" onPress={() => {
          x.value -= 50
          xTwo.value -= 100
        }} />
        <Button title="Right" onPress={() => {
          x.value += 50
          xTwo.value += 100
        }} />
        <Button
          title="Reset"
          onPress={() => {
            x.value = 0;
            y.value = 0;
            xTwo.value = 0;
            yTwo.value = 0;
          }}
        />
      </View>
    </View>
  );
}
