import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dates = [
  { day: 'Mon', date: 11 },
  { day: 'Tue', date: 12 },
  { day: 'Wed', date: 13 },
  { day: 'Thu', date: 14 },
  { day: 'Fri', date: 15 },
  { day: 'Sat', date: 16 },
  { day: 'Sun', date: 17 },
];

const tasks = [
  {
    title: 'Team Meeting',
    desc: 'Discuss new product direction',
    time: '10:00 AM',
    progress: 48,
    color: 'bg-violet-500',
    icon: 'account-group-outline',
  },
  {
    title: 'UI Review',
    desc: 'Check dashboard screens',
    time: '12:30 PM',
    progress: 72,
    color: 'bg-emerald-500',
    icon: 'palette-outline',
  },
  {
    title: 'API Cleanup',
    desc: 'Refactor task endpoints',
    time: '03:00 PM',
    progress: 35,
    color: 'bg-orange-500',
    icon: 'code-braces',
  },
];

export default function OneTodoPageTwo() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12"
      >
        <Header />
        <Title />
        <Calendar />
        <Timeline />
      </ScrollView>
    </SafeAreaView>
  );
}

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-6 pt-4">
      <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
        <MaterialCommunityIcons name="arrow-left" size={24} color="#0f172a" />
      </TouchableOpacity>

      <TouchableOpacity className="h-12 flex-row items-center gap-2 rounded-2xl bg-slate-950 px-5 shadow-md">
        <MaterialCommunityIcons name="plus" size={22} color="white" />
        <Text className="font-bold text-white">Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const Title = () => {
  return (
    <View className="px-6 pt-8">
      <Text className="text-base font-medium text-slate-500">Today</Text>

      <Text className="mt-2 text-4xl font-extrabold leading-tight text-slate-950">
        Schedule
      </Text>

      <Text className="mt-2 text-sm font-medium text-slate-400">
        Thursday, 14 June
      </Text>
    </View>
  );
};

const Calendar = () => {
  return (
    <View className="mt-8 px-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3"
      >
        {dates.map((item, index) => {
          const active = index === 3;

          return (
            <TouchableOpacity
              key={item.date}
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

              {active && <View className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Timeline = () => {
  return (
    <View className="mt-10 px-6">
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-2xl font-extrabold text-slate-950">
          Tasks
        </Text>

        <TouchableOpacity>
          <Text className="font-bold text-violet-600">See all</Text>
        </TouchableOpacity>
      </View>

      {tasks.map((task, index) => (
        <TimelineItem
          key={task.title}
          task={task}
          isLast={index === tasks.length - 1}
        />
      ))}
    </View>
  );
};

const TimelineItem = ({
  task,
  isLast,
}: {
  task: {
    title: string;
    desc: string;
    time: string;
    progress: number;
    color: string;
    icon: string;
  };
  isLast: boolean;
}) => {
  return (
    <View className="flex-row">
      <View className="w-10 items-center">
        <View className="h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-violet-500 shadow-sm">
          <View className="h-2.5 w-2.5 rounded-full bg-white" />
        </View>

        {!isLast && <View className="h-28 w-0.5 bg-slate-200" />}
      </View>

      <View className="flex-1 pb-5">
        <View className={`rounded-[30px] ${task.color} p-5 shadow-md`}>
          <View className="flex-row items-start justify-between">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/25">
              <MaterialCommunityIcons
                name={task.icon as any}
                size={24}
                color="white"
              />
            </View>

            <View className="rounded-full bg-white/20 px-3 py-1">
              <Text className="text-xs font-bold text-white">{task.time}</Text>
            </View>
          </View>

          <Text className="mt-5 text-xl font-extrabold text-white">
            {task.title}
          </Text>

          <Text className="mt-2 text-sm leading-5 text-white/80">
            {task.desc}
          </Text>

          <View className="mt-5">
            <View className="mb-2 flex-row justify-between">
              <Text className="text-xs font-semibold text-white/80">
                Progress
              </Text>
              <Text className="text-xs font-bold text-white">
                {task.progress}%
              </Text>
            </View>

            <View className="h-2 overflow-hidden rounded-full bg-white/25">
              <View
                className="h-full rounded-full bg-white"
                style={{ width: `${task.progress}%` }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};