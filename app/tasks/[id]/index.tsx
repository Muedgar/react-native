import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  priorityLabels,
  statusLabels,
  useTodos,
} from '@/components/todos/todo-store';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { deleteTodo, getTodo, toggleStatus } = useTodos();
  const todo = getTodo(id);

  if (!todo) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 px-6">
        <View className="rounded-3xl bg-white p-6 shadow-sm">
          <Text className="text-center text-lg font-extrabold text-slate-950">
            Task not found
          </Text>
          <TouchableOpacity
            className="mt-5 h-12 items-center justify-center rounded-2xl bg-slate-950 px-6"
            onPress={() => router.replace('/')}
          >
            <Text className="font-bold text-white">Back to Tasks</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          <View className="flex-row gap-3">
            <Link href={`/tasks/${todo.id}/edit`} asChild>
              <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={22}
                  color="#0f172a"
                />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              className="h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 shadow-sm"
              onPress={() => {
                deleteTodo(todo.id);
                router.replace('/');
              }}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 pt-8">
          <View
            className={`min-h-[270px] rounded-[34px] ${todo.color} p-6 shadow-md`}
          >
            <View className="flex-row items-start justify-between">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/25">
                <MaterialCommunityIcons
                  name={todo.icon as never}
                  size={28}
                  color="white"
                />
              </View>
              <View className="rounded-full bg-white/20 px-4 py-2">
                <Text className="text-xs font-extrabold text-white">
                  {statusLabels[todo.status]}
                </Text>
              </View>
            </View>

            <Text className="mt-8 text-4xl font-extrabold leading-tight text-white">
              {todo.title}
            </Text>
            <Text className="mt-4 text-base leading-6 text-white/85">
              {todo.desc}
            </Text>

            <View className="mt-8">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm font-bold text-white/80">
                  Progress
                </Text>
                <Text className="text-sm font-extrabold text-white">
                  {todo.progress}%
                </Text>
              </View>
              <View className="h-2.5 overflow-hidden rounded-full bg-white/25">
                <View
                  className="h-full rounded-full bg-white"
                  style={{ width: `${todo.progress}%` }}
                />
              </View>
            </View>
          </View>

          <View className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
            <DetailRow icon="clock-outline" label="Time" value={todo.time} />
            <DetailRow
              icon="calendar-outline"
              label="Due Date"
              value={todo.dueDate}
            />
            <DetailRow
              icon="flag-outline"
              label="Priority"
              value={priorityLabels[todo.priority]}
            />
          </View>

          <TouchableOpacity
            className="mt-6 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-slate-950 shadow-md"
            onPress={() => toggleStatus(todo.id)}
          >
            <MaterialCommunityIcons
              name="progress-check"
              size={22}
              color="white"
            />
            <Text className="text-base font-extrabold text-white">
              Move Status Forward
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center border-b border-slate-100 py-4 last:border-b-0">
      <View className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
        <MaterialCommunityIcons
          name={icon as never}
          size={22}
          color="#475569"
        />
      </View>
      <View>
        <Text className="text-xs font-bold uppercase text-slate-400">
          {label}
        </Text>
        <Text className="mt-1 text-base font-extrabold text-slate-950">
          {value}
        </Text>
      </View>
    </View>
  );
}
