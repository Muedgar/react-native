
import { Button, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export default function ExerciseTwo() {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const rotateXTwo = useSharedValue(0);
  const rotateYTwo = useSharedValue(0);
  const rotateZTwo = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 600 },
      { rotateX: withTiming(`${rotateX.value}deg`, { duration: 500 }) },
      { rotateY: withTiming(`${rotateY.value}deg`, { duration: 500 }) },
    ],
  }));

  const styleTwo = useAnimatedStyle(() => ({
    transform: [
      { perspective: 700 },
      { rotateX: withTiming(`${rotateXTwo.value}deg`, { duration: 500 }) },
      { rotateY: withTiming(`${rotateYTwo.value}deg`, { duration: 500 }) },
      { rotateZ: withTiming(`${rotateZTwo.value}deg`, { duration: 500 }) }
    ]
  }));

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        className="w-40 h-40 bg-blue-500 rounded-xl"
        style={style}
      />

      <Animated.View 
        className="w-44 h-44 bg-yellow-400 rounded-xl absolute top-[400px]"
        style={styleTwo}
      />

      <View className="absolute top-36 gap-3">
        <Button
          title="Rotate X +45"
          onPress={() => {
            rotateX.value += 45
            rotateXTwo.value += 45
          }}
        />
        <Button
          title="Rotate Y +45"
          onPress={() => {
            rotateY.value += 45
            rotateYTwo.value += 45
          }}
        />
        <Button
          title="Rotate X -45"
          onPress={() => {
            rotateX.value -= 45
            rotateXTwo.value -= 45
          }}
        />
        <Button
          title="Rotate Y -45"
          onPress={() => {
            rotateY.value -= 45
            rotateYTwo.value -= 45
          }}
        />
        <Button
          title="Rotate Z -45"
          onPress={() => {
            rotateZTwo.value -= 45
          }}
        />
        <Button
          title="Rotate Z +45"
          onPress={() => {
            rotateZTwo.value += 45
          }}
        />
        <Button
          title="Reset"
          onPress={() => {
            rotateX.value = 0;
            rotateY.value = 0;
            rotateXTwo.value = 0;
            rotateYTwo.value = 0;
          }}
        />
      </View>
    </View>
  );
}
