'use client';

import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OneTodo() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <Hero />
        <Search />
        <QuickNav />
        <Tasks />
      </ScrollView>
    </SafeAreaView>
  );
}

// component 1

const Header = () => {
  return (
    <View className="h-20 w-full flex-row items-center justify-between bg-transparent pl-10 pr-10">
      <View className="h-14 w-14 items-center bg-transparent">
        <Text className="mt-[2px] h-[90%] w-[90%] rounded-full bg-slate-300"></Text>
      </View>
      <View className="h-14 w-14 items-center bg-transparent shadow-lg shadow-green-500">
        <Text className="mt-[2px] h-[90%] w-[90%] rounded-2xl bg-slate-300"></Text>
      </View>
    </View>
  );
};

// component 2

const Hero = () => {
  return (
    <View className="h-[150px] w-full flex-col items-center justify-start bg-transparent pl-10 pr-10 pt-[20px]">
      <View className="h-fit w-full bg-transparent">
        <Text className="ml-2 mt-2 text-xl font-light">
          Good Morning, Rifat!
        </Text>
      </View>
      <View className="h-fit w-full bg-transparent">
        <Text className="ml-2 mt-2 text-4xl font-bold">
          You have <Text className="text-purple-800">49 tasks</Text> this month
        </Text>
      </View>
    </View>
  );
};

// component 3

const Search = () => {
  const [search, setSearch] = useState('');
  return (
    <View className="h-[100px] w-full flex-col items-center justify-start bg-transparent pl-10 pr-10 pt-[20px]">
      <View className="h-[50px] w-[90%] flex-row rounded-2xl bg-slate-100">
        <View className="h-full w-[17%] flex-col items-center justify-center rounded-bl-2xl rounded-tl-2xl bg-transparent">
          <View className="h-[80%] w-[80%] rounded-full bg-white"></View>
        </View>
        <View className="h-full w-[83%] overflow-hidden rounded-br-2xl rounded-tr-2xl bg-transparent">
          <TextInput
            className="h-full w-full overflow-x-auto bg-slate-100 p-2 text-xl font-light"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
    </View>
  );
};

// component 4

const QuickNav = () => {
  return (
    <View className="h-[200px] w-full flex-row items-center justify-evenly bg-transparent pl-10 pr-10">
      <View className="h-[150px] w-[100px] flex-col items-center justify-center rounded-[100px] bg-slate-200">
        <View className="h-[55px] w-[55px] rounded-full bg-pink-600"></View>
        <View className="mt-2">
          <Text className="text-sm">To-Do</Text>
        </View>
      </View>
      <View className="h-[150px] w-[100px] flex-col items-center justify-center rounded-[100px] bg-slate-200">
        <View className="h-[55px] w-[55px] rounded-full bg-yellow-600"></View>
        <View className="mt-2">
          <Text className="text-sm">In-Progress</Text>
        </View>
      </View>
      <View className="h-[150px] w-[100px] flex-col items-center justify-center rounded-[100px] bg-slate-200">
        <View className="h-[55px] w-[55px] rounded-full bg-green-600"></View>
        <View className="mt-2">
          <Text className="text-sm">Done</Text>
        </View>
      </View>
    </View>
  );
};

// component 5
const Tasks = () => {
  return (
    <View className="mb-4 flex h-fit w-full flex-col justify-start">
      <View className="bg-trasparent h-[50px] w-full flex-row items-center justify-between pl-10 pr-10">
        <Text className="text-3xl font-bold">Today's Tasks</Text>
        <Text className="cursor-pointer text-slate-400 underline">See all</Text>
      </View>
      <View className="flex h-fit w-fit flex-row justify-evenly">
        <TaskView color={'bg-purple-400'} />
        <TaskView color={'bg-green-400'} />
        <TaskView color={'bg-yellow-400'} />
      </View>
    </View>
  );
};

const TaskView = ({ color }: { color: string }) => {
  return (
    <View
      className={`ml-2 mr-2 h-[215px] w-[180px] rounded-3xl ${color} elevation-xl flex flex-col flex-wrap p-4`}
    >
      <View className="flex w-fit flex-row justify-between">
        <Text className="mt-2 text-lg font-bold text-white">Team Meeting</Text>
        <View className="h-10 w-10 rounded-full bg-slate-50"></View>
      </View>
      <View className="flex w-fit flex-row justify-between pt-3">
        <Text className="text-lg font-light text-white">
          Group discussion for the new product
        </Text>
      </View>
      <View className="flex w-fit flex-row justify-between pt-3">
        <Text className="text-lg font-medium text-white">10:00 AM</Text>
      </View>
      <View className="flex w-fit flex-row justify-between pt-3">
        <Text className="text-md font-medium text-white">Progress</Text>
        <Text className="text-md font-medium text-white">48%</Text>
      </View>
      <View className="relative flex w-fit flex-row justify-between pt-3">
        <View className="absolute top-3 h-1 w-full rounded-lg bg-slate-300"></View>
        <View className="absolute top-3 h-1 w-[48%] rounded-lg bg-white"></View>
        <View className="absolute left-20  top-[9px] h-2 w-2 rounded-full bg-white"></View>
      </View>
    </View>
  );
};
