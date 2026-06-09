'use client';

import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const navItems = [
  { label: 'To-Do', count: 18, color: 'bg-rose-500', bg: 'bg-rose-50' },
  { label: 'Progress', count: 12, color: 'bg-amber-500', bg: 'bg-amber-50' },
  { label: 'Done', count: 19, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
];

const tasks = [
  {
    title: 'Team Meeting',
    desc: 'Discuss new product direction',
    time: '10:00 AM',
    progress: 48,
    color: 'bg-violet-500',
  },
  {
    title: 'UI Review',
    desc: 'Check dashboard screens',
    time: '12:30 PM',
    progress: 72,
    color: 'bg-emerald-500',
  },
  {
    title: 'API Cleanup',
    desc: 'Refactor task endpoints',
    time: '03:00 PM',
    progress: 35,
    color: 'bg-orange-500',
  },
];

export default function OneTodo() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        <Header />
        <Hero />
        <Search />
        <QuickNav />
        <Tasks />
      </ScrollView>
    </SafeAreaView>
  );
}

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-6 pt-4">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <Text className="text-xl">👋</Text>
      </View>

      <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-md">
        <Text className="text-xl text-white">🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

const Hero = () => {
  return (
    <View className="px-6 pt-8">
      <Text className="text-base font-medium text-slate-500">
        Good morning, Rifat
      </Text>

      <Text className="mt-3 text-4xl font-extrabold leading-tight text-slate-950">
        You have <Text className="text-violet-600">49 tasks</Text>
        {'\n'}this month
      </Text>
    </View>
  );
};

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <View className="px-6 pt-8">
      <View className="h-14 flex-row items-center rounded-3xl bg-white px-4 shadow-sm">
        <Text className="mr-3 text-lg text-slate-400">🔍</Text>

        <TextInput
          className="flex-1 text-base text-slate-800"
          placeholder="Search your tasks..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
        />
      </View>
    </View>
  );
};

const QuickNav = () => {
  return (
    <View className="mt-8 px-6">
      <View className="flex-row justify-between">
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            className={`w-[31%] rounded-3xl ${item.bg} p-4`}
          >
            <View
              className={`mb-4 h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
            >
              <Text className="text-lg text-white">✓</Text>
            </View>

            <Text className="text-xl font-extrabold text-slate-950">
              {item.count}
            </Text>

            <Text className="mt-1 text-sm font-medium text-slate-500">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const Tasks = () => {
  return (
    <View className="mt-10">
      <View className="mb-5 flex-row items-center justify-between px-6">
        <Text className="text-2xl font-extrabold text-slate-950">
          Today’s Tasks
        </Text>

        <TouchableOpacity>
          <Text className="font-semibold text-violet-600">See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-6"
      >
        {tasks.map((task) => (
          <TaskView key={task.title} task={task} />
        ))}
      </ScrollView>
    </View>
  );
};

const TaskView = ({
  task,
}: {
  task: {
    title: string;
    desc: string;
    time: string;
    progress: number;
    color: string;
  };
}) => {
  return (
    <View className={`h-[230px] w-[190px] rounded-[32px] ${task.color} p-5`}>
      <View className="flex-row items-start justify-between">
        <Text className="w-[110px] text-xl font-extrabold text-white">
          {task.title}
        </Text>

        <View className="h-10 w-10 items-center justify-center rounded-full bg-white/25">
          <Text className="text-white">⋯</Text>
        </View>
      </View>

      <Text className="mt-4 text-sm leading-5 text-white/80">{task.desc}</Text>

      <View className="mt-auto">
        <Text className="mb-4 text-lg font-bold text-white">{task.time}</Text>

        <View className="mb-2 flex-row justify-between">
          <Text className="text-sm font-semibold text-white/80">Progress</Text>
          <Text className="text-sm font-bold text-white">{task.progress}%</Text>
        </View>

        <View className="h-2 overflow-hidden rounded-full bg-white/25">
          <View
            className="h-full rounded-full bg-white"
            style={{ width: `${task.progress}%` }}
          />
        </View>
      </View>
    </View>
  );
};
