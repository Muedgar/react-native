
import { Button, View } from 'react-native';
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

export default function ExerciseThree() {
  const y = useSharedValue(0);
  const scaleY = useSharedValue(1);
  const scaleX = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: y.value },
      { scaleX: scaleX.value },
      { scaleY: scaleY.value },
    ],
  }));

  const start = () => {
    // Stop previous animations before restarting
    cancelAnimation(y);
    cancelAnimation(scaleX);
    cancelAnimation(scaleY);

    y.value = 0;
    scaleX.value = 1;
    scaleY.value = 1;

    // 1. Ball jumps up, then falls down
    y.value = withRepeat(
      withSequence(
        withTiming(-150, {
          duration: 500,
          easing: Easing.out(Easing.ease),
        }),
        withTiming(0, {
          duration: 500,
          easing: Easing.in(Easing.ease),
        }),
        withTiming(0, { duration: 150 }),
      ),
      -1,
      false
    );

    // 2. Ball becomes shorter on impact
    scaleY.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 500 }),
        withTiming(1, { duration: 500 }),
        withTiming(0.7, { duration: 75 }),
        withTiming(1, { duration: 75 }),
      ),
      -1,
      false
    );

    // 3. Ball becomes wider on impact
    scaleX.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 500 }),
        withTiming(1, { duration: 500 }),
        withTiming(1.3, { duration: 75 }),
        withTiming(1, { duration: 75 }),
      ),
      -1,
      false
    );
  };

  const stop = () => {
    cancelAnimation(y);
    cancelAnimation(scaleY);
    cancelAnimation(scaleX);

    y.value = withSpring(0);
    scaleY.value = withSpring(1);
    scaleX.value = withSpring(1);
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <View className="absolute top-16 left-10 gap-3">
        <Button title="Start" onPress={start} />
        <Button title="Stop" onPress={stop} />
      </View>

      <View className="items-center justify-end h-64">
        <Animated.View
          className="w-20 h-20 rounded-full bg-purple-500"
          style={style}
        />

        {/* Ground */}
        <View className="w-64 h-1 bg-slate-500 mt-0" />
      </View>
    </View>
  );
}
