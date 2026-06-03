import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.79 },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼', rate: 1290 },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flag: '🇰🇪',
    rate: 129,
  },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[3]);

  const converted = useMemo(() => {
    const value = Number(amount);

    if (!value) return 0;

    const amountInUsd = value / from.rate;
    return amountInUsd * to.rate;
  }, [amount, from, to]);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FB]">
      <View className="flex-1 px-5 pt-6">
        <Text className="text-4xl font-extrabold text-slate-950">Convert</Text>

        <Text className="mt-2 text-base text-slate-500">
          Fast currency exchange calculator
        </Text>

        <View className="mt-8 rounded-[36px] bg-slate-950 p-6">
          <Text className="text-sm font-semibold uppercase text-slate-400">
            You send
          </Text>

          <View className="mt-4 flex-row items-center justify-between">
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              className="flex-1 text-5xl font-extrabold text-white"
              placeholder="0"
              placeholderTextColor="#64748B"
            />

            <View className="rounded-full bg-white/10 px-4 py-3">
              <Text className="text-lg font-bold text-white">
                {from.flag} {from.code}
              </Text>
            </View>
          </View>

          <View className="my-6 h-[1px] bg-white/10" />

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold uppercase text-slate-400">
                They receive
              </Text>

              <Text className="mt-3 text-5xl font-extrabold text-emerald-400">
                {to.symbol} {converted.toFixed(2)}
              </Text>
            </View>

            <View className="rounded-full bg-emerald-400/15 px-4 py-3">
              <Text className="text-lg font-bold text-emerald-300">
                {to.flag} {to.code}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={swapCurrencies}
          className="mx-auto -mt-6 h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <Text className="text-3xl">⇅</Text>
        </Pressable>

        <View className="mt-6 rounded-[30px] bg-white p-5 shadow-sm">
          <Text className="text-lg font-extrabold text-slate-900">
            Exchange Rate
          </Text>

          <Text className="mt-2 text-base text-slate-500">
            1 {from.code} = {(to.rate / from.rate).toFixed(4)} {to.code}
          </Text>

          <Text className="mt-1 text-sm text-slate-400">
            Demo rates only. Connect an API later for live rates.
          </Text>
        </View>

        <Text className="mt-6 text-lg font-extrabold text-slate-900">
          From Currency
        </Text>

        <View className="mt-3 flex-row flex-wrap gap-3">
          {currencies.map((currency) => (
            <Pressable
              key={currency.code}
              onPress={() => setFrom(currency)}
              className={`rounded-2xl px-4 py-3 ${
                from.code === currency.code ? 'bg-slate-950' : 'bg-white'
              }`}
            >
              <Text
                className={`font-bold ${
                  from.code === currency.code ? 'text-white' : 'text-slate-900'
                }`}
              >
                {currency.flag} {currency.code}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="mt-6 text-lg font-extrabold text-slate-900">
          To Currency
        </Text>

        <View className="mt-3 flex-row flex-wrap gap-3">
          {currencies.map((currency) => (
            <Pressable
              key={currency.code}
              onPress={() => setTo(currency)}
              className={`rounded-2xl px-4 py-3 ${
                to.code === currency.code ? 'bg-emerald-500' : 'bg-white'
              }`}
            >
              <Text
                className={`font-bold ${
                  to.code === currency.code ? 'text-white' : 'text-slate-900'
                }`}
              >
                {currency.flag} {currency.code}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
