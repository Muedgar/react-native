import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { statusLabels, Todo } from './todo-store';

type TodoCardProps = {
  todo: Todo;
  compact?: boolean;
  onStatusPress?: () => void;
};

export function TodoCard({ todo, compact, onStatusPress }: TodoCardProps) {
  return (
    <Link href={`/tasks/${todo.id}`} asChild>
      <TouchableOpacity
        className={`${compact ? 'mb-4' : 'mr-4 h-[230px] w-[190px]'} rounded-[30px] ${
          todo.color
        } p-5 shadow-md`}
      >
        <View className="flex-row items-start justify-between">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/25">
            <MaterialCommunityIcons
              name={todo.icon as never}
              size={24}
              color="white"
            />
          </View>
          <TouchableOpacity
            className="rounded-full bg-white/20 px-3 py-1"
            onPress={onStatusPress}
          >
            <Text className="text-xs font-extrabold text-white">
              {statusLabels[todo.status]}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-5 text-xl font-extrabold text-white">
          {todo.title}
        </Text>
        <Text className="mt-2 text-sm leading-5 text-white/80">
          {todo.desc}
        </Text>

        <View className="mt-auto pt-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-sm font-bold text-white">{todo.time}</Text>
            <Text className="text-xs font-bold text-white/80">
              {todo.progress}%
            </Text>
          </View>
          <View className="h-2 overflow-hidden rounded-full bg-white/25">
            <View
              className="h-full rounded-full bg-white"
              style={{ width: `${todo.progress}%` }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
