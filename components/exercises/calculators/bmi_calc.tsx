import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BMICalculator() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [gender, setGender] = useState<"male" | "female">("male");

  const bmi = useMemo(() => {
    const h = Number(height) / 100;
    const w = Number(weight);

    if (!h || !w) return 0;

    return w / (h * h);
  }, [height, weight]);

  const bmiText = bmi ? bmi.toFixed(1) : "0.0";

  const status =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Healthy"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  const message =
    status === "Healthy"
      ? "Your BMI is within the healthy range."
      : "BMI is a simple guide. Use it with other health signs.";

  return (
    <SafeAreaView className="flex-1 bg-[#0B1020]">
      <View className="flex-1 px-5 pt-6">
        <View>
          <Text className="text-4xl font-extrabold text-white">
            BMI Pro
          </Text>
          <Text className="mt-2 text-base text-slate-400">
            Smart body mass calculator
          </Text>
        </View>

        <View className="mt-8 rounded-[32px] bg-[#151B2E] p-5">
          <Text className="text-sm font-semibold uppercase text-slate-400">
            Your BMI Score
          </Text>

          <View className="mt-5 flex-row items-end justify-between">
            <View>
              <Text className="text-7xl font-extrabold text-white">
                {bmiText}
              </Text>
              <Text className="mt-2 text-xl font-bold text-emerald-400">
                {status}
              </Text>
            </View>

            <View className="h-28 w-28 items-center justify-center rounded-full bg-emerald-500/15">
              <Text className="text-3xl">💪</Text>
            </View>
          </View>

          <Text className="mt-5 text-base leading-6 text-slate-300">
            {message}
          </Text>
        </View>

        <View className="mt-5 flex-row gap-3">
          {["male", "female"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setGender(item as "male" | "female")}
              className={`flex-1 rounded-3xl p-5 ${
                gender === item ? "bg-indigo-500" : "bg-[#151B2E]"
              }`}
            >
              <Text className="text-3xl">
                {item === "male" ? "♂️" : "♀️"}
              </Text>
              <Text className="mt-3 text-lg font-bold capitalize text-white">
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-3xl bg-[#151B2E] p-5">
            <Text className="text-sm font-semibold text-slate-400">
              Height
            </Text>
            <View className="mt-4 flex-row items-end">
              <TextInput
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                className="flex-1 text-4xl font-extrabold text-white"
              />
              <Text className="mb-1 text-lg font-semibold text-slate-400">
                cm
              </Text>
            </View>
          </View>

          <View className="flex-1 rounded-3xl bg-[#151B2E] p-5">
            <Text className="text-sm font-semibold text-slate-400">
              Weight
            </Text>
            <View className="mt-4 flex-row items-end">
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                className="flex-1 text-4xl font-extrabold text-white"
              />
              <Text className="mb-1 text-lg font-semibold text-slate-400">
                kg
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-5 rounded-3xl bg-[#151B2E] p-5">
          <Text className="text-lg font-bold text-white">
            BMI Formula
          </Text>

          <Text className="mt-3 text-base text-slate-400">
            BMI = weight / height²
          </Text>

          <View className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <View
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
            />
          </View>

          <View className="mt-3 flex-row justify-between">
            <Text className="text-xs text-slate-500">0</Text>
            <Text className="text-xs text-slate-500">18.5</Text>
            <Text className="text-xs text-slate-500">25</Text>
            <Text className="text-xs text-slate-500">30+</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}