import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TodoCard } from '@/components/todos/todo-card';
import { useTodos } from '@/components/todos/todo-store';

const dates = [
  { day: 'Mon', date: 11, key: '2026-06-11' },
  { day: 'Tue', date: 12, key: '2026-06-12' },
  { day: 'Wed', date: 13, key: '2026-06-13' },
  { day: 'Thu', date: 14, key: '2026-06-14' },
  { day: 'Fri', date: 15, key: '2026-06-15' },
  { day: 'Sat', date: 16, key: '2026-06-16' },
  { day: 'Sun', date: 17, key: '2026-06-17' },
];

export default function ScheduleScreen() {
  const { todos, toggleStatus } = useTodos();
  const activeDate = '2026-06-14';

  const scheduledTodos = useMemo(
    () =>
      [...todos].sort((a, b) =>
        `${a.dueDate} ${a.time}`.localeCompare(`${b.dueDate} ${b.time}`),
      ),
    [todos],
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12"
      >
        <View className="flex-row items-center justify-between px-6 pt-4">
          <TouchableOpacity
            className="h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#0f172a"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="h-12 flex-row items-center gap-2 rounded-2xl bg-slate-950 px-5 shadow-md"
            onPress={() => router.push('/tasks/new')}
          >
            <MaterialCommunityIcons name="plus" size={22} color="white" />
            <Text className="font-bold text-white">Add Task</Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 pt-8">
          <Text className="text-base font-medium text-slate-500">Today</Text>
          <Text className="mt-2 text-4xl font-extrabold leading-tight text-slate-950">
            Schedule
          </Text>
          <Text className="mt-2 text-sm font-medium text-slate-400">
            Thursday, 14 June
          </Text>
        </View>

        <View className="mt-8 px-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3"
          >
            {dates.map((item) => {
              const active = item.key === activeDate;

              return (
                <View
                  key={item.key}
                  className={`h-24 w-16 items-center justify-center rounded-3xl ${
                    active ? 'bg-slate-950' : 'bg-white'
                  } shadow-sm`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      active ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {item.day}
                  </Text>
                  <Text
                    className={`mt-2 text-2xl font-extrabold ${
                      active ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.date}
                  </Text>
                  {active && (
                    <View className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View className="mt-10 px-6">
          <Text className="mb-5 text-2xl font-extrabold text-slate-950">
            Timeline
          </Text>
          {scheduledTodos.map((todo, index) => (
            <View className="flex-row" key={todo.id}>
              <View className="w-10 items-center">
                <View className="h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-violet-500 shadow-sm">
                  <View className="h-2.5 w-2.5 rounded-full bg-white" />
                </View>
                {index !== scheduledTodos.length - 1 && (
                  <View className="h-32 w-0.5 bg-slate-200" />
                )}
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-xs font-extrabold text-slate-400">
                  {todo.dueDate} at {todo.time}
                </Text>
                <TodoCard
                  compact
                  todo={todo}
                  onStatusPress={() => toggleStatus(todo.id)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
