import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const buttons = [
  ["⌫", "C", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="],
];

const operators = ["+", "-", "×", "÷", "%"];

export default function SimpleCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const calculate = (value: string, showError = false) => {
    try {
      if (!value) {
        setResult("0");
        return;
      }

      const lastChar = value[value.length - 1];

      if ([...operators, "."].includes(lastChar)) {
        if (showError) setResult("Invalid expression");
        return;
      }

      const clean = value.replaceAll("×", "*").replaceAll("÷", "/");

      if (!/^[0-9+\-*/%.()\s]+$/.test(clean)) return;

      const answer = Function(`"use strict"; return (${clean})`)();

      if (!Number.isFinite(answer)) {
        if (showError) setResult("Cannot divide by 0");
        return;
      }

      setResult(Number(answer.toFixed(8)).toString());
    } catch {
      if (showError) setResult("Invalid expression");
    }
  };

  const handlePress = (btn: string) => {
    if (btn === "C") {
      setExpression("");
      setResult("0");
      return;
    }

    if (btn === "⌫") {
      const next = expression.slice(0, -1);
      setExpression(next);
      calculate(next);
      return;
    }

    if (btn === "=") {
      calculate(expression, true);
      return;
    }

    if (btn === "±") {
      if (!expression) return;

      const next = expression.startsWith("-")
        ? expression.slice(1)
        : `-${expression}`;

      setExpression(next);
      calculate(next);
      return;
    }

    const lastChar = expression[expression.length - 1];

    if (operators.includes(btn) && operators.includes(lastChar)) {
      const next = expression.slice(0, -1) + btn;
      setExpression(next);
      calculate(next);
      return;
    }

    if (btn === "." && lastChar === ".") return;

    const next = expression + btn;
    setExpression(next);
    calculate(next);
  };

  const isOperator = (btn: string) => ["÷", "×", "-", "+", "="].includes(btn);
  const isTop = (btn: string) => ["⌫", "C", "%"].includes(btn);

  return (
    <SafeAreaView className="flex-1 bg-[#111111]">
      <View className="flex-1 px-5 pb-6">
        <View className="flex-1 justify-end">
          <Text
            numberOfLines={1}
            className="text-right text-5xl font-light text-white"
          >
            {expression || "0"}
          </Text>

          <Text
            numberOfLines={1}
            className="mt-3 text-right text-2xl font-semibold text-zinc-400"
          >
            {result}
          </Text>
        </View>

        <View className="mt-8 gap-3">
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row gap-3">
              {row.map((btn) => (
                <Pressable
                  key={btn}
                  onPress={() => handlePress(btn)}
                  className={`
                    h-20 flex-1 items-center justify-center rounded-full
                    ${isOperator(btn) ? "bg-orange-500" : ""}
                    ${isTop(btn) ? "bg-zinc-500" : ""}
                    ${!isOperator(btn) && !isTop(btn) ? "bg-zinc-800" : ""}
                  `}
                >
                  <Text className="text-4xl font-medium text-white">
                    {btn}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}