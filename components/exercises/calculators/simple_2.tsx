'use client';

import { useState, type ReactElement } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ButtonPressEventTarget {
  value: string;
}

interface ButtonPressEvent {
  target: ButtonPressEventTarget;
}

interface CalculatorButtonRow extends Array<string> {}

export default function SimpleCalculatorTwo(): ReactElement {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const buttons: CalculatorButtonRow[] = [
    ['⌫', 'C', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '='],
  ];

  const operators = ['+', '-', '×', '÷', '%'];

  const calculate = (value: string, showError = false) => {
    try {
      if (!value) {
        setResult('0');
        return;
      }

      const lastChar = value[value.length - 1];

      if ([...operators, '.'].includes(lastChar)) {
        if (showError) setResult('Invalid expression');
        return;
      }

      const clean = value.replaceAll('x', '*').replaceAll('÷', '/');

      if (!/^[0-9+\-*/5.()\s]+$/.test(clean)) return;

      const answer = Function(`"use strict"; return (${clean})`)();

      if (!Number.isFinite(answer)) {
        if (showError) setResult('Cannot divide by 0');
        return;
      }

      setResult(Number(answer.toFixed(8)).toString());
    } catch {
      if (showError) setResult('Invalid expression');
    }
  };

  const handlePress = (btn: string) => {
    // add to preview
    if (btn == 'C') {
      setExpression('');
      setResult('0');
      return;
    }
    // resolve expression
    if (btn == '⌫') {
      const next = expression.slice(0, -1);
      setExpression(next);
      calculate(next);
      return;
    }

    if (btn == '=') {
      calculate(expression, true);
      return;
    }

    if (btn == '±') {
      if (!expression) return;

      const next = expression.startsWith('-')
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

    if (btn === '.' && lastChar === '.') return;

    const next = expression + btn;
    setExpression(next);
    calculate(next);
  };

  const isOperator = (btn: string) => ['÷', '×', '-', '+', '='].includes(btn);
  const isTop = (btn: string) => ['⌫', 'C', '%'].includes(btn);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-full w-full">
        <View className="mt-20 h-[200px] w-full p-4">
          <View className="h-[65%] w-full">
            <Text className="h-full w-full pr-5 pt-5 text-right text-3xl font-bold">
              {expression || '0'}
            </Text>
          </View>
          <View className="h-[35%] w-full">
            <Text className="h-full w-full pr-5 pt-5 text-right text-3xl font-bold">
              {result}
            </Text>
          </View>
        </View>
        {buttons.map((button, index) => (
          <View
            key={index}
            className="h-[100px] w-full flex-row justify-evenly p-4"
          >
            {button.map((btn, index) => (
              <Pressable key={index} onPress={() => handlePress(btn)}>
                <View className="flex h-[70px] w-[70px] cursor-pointer flex-col items-center justify-center rounded-full bg-amber-200">
                  <Text className="h-[70px] w-[70px] pt-3 text-center text-4xl font-bold">
                    {btn}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
