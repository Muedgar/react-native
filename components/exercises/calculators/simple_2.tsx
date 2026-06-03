'use client'

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
  const [expression, setExpression] = useState('')
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
  }

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

      const next = expression.startsWith('-') ? expression.slice(1) : `-${expression}`;

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
    calculate(next)
  };

  const isOperator = (btn: string) => ['÷', '×', '-', '+', '='].includes(btn);
  const isTop = (btn: string) => ['⌫', 'C', '%'].includes(btn);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='w-full h-full'>
        <View className='w-full h-[200px] p-4 mt-20'>
            <View className='w-full h-[65%]'>
              <Text className='w-full h-full text-right pt-5 pr-5 font-bold text-3xl'>
                {expression || '0'}
              </Text>
            </View>
            <View className='w-full h-[35%]'>
              <Text className='w-full h-full text-right pt-5 pr-5 font-bold text-3xl'>
                {result}
              </Text>
            </View>
        </View>
        {buttons.map((button, index) => (
          <View key={index} className="h-[100px] w-full flex-row justify-evenly p-4">
            {button.map((btn, index) => (
                <Pressable
            key={index}
            onPress={() => handlePress(btn)}
          >
            <View className="h-[70px] w-[70px] flex flex-col justify-center items-center cursor-pointer bg-amber-200 rounded-full">
              <Text className="h-[70px] w-[70px] text-4xl font-bold text-center pt-3">{btn}</Text>
            </View>
          </Pressable>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
