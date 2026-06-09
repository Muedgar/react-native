import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dates = [
    {
        day: "Mon",
        date: 11
    },
    {
        day: "Tue",
        date: 12
    },
    {
        day: "Wed",
        date: 13
    },
    {
        day: "Thu",
        date: 14
    },
    {
        day: "Fri",
        date: 15
    },
    {
        day: "Sat",
        date: 16
    },
    {
        day: "Sun",
        date: 17
    }
]

export default function OneTodoPageTwo() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        <Header />
        <Calendar />
      </ScrollView>
    </SafeAreaView>
  );
}

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-6 pt-4">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <Text className="text-xl">
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </Text>        
      </View>
      <TouchableOpacity className="h-12 w-fit pl-4 pr-4 flex flex-row items-center justify-center rounded-xl bg-blue-600">
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text className='text-white'>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const Calendar = () => {
    return (
        <View className='h-20 flex-row items-center justify-evenly px-6 mt-5'>
            {dates.map((item, index) => (
            <View key={index} className='flex-col justify-center items-center'>
                <Text className={`${index != 3 ? 'text-slate-600' : 'text-blue-600'}  font-bold`}>{item.day}</Text>
                <View className={`flex flex-col justify-center items-center ${index != 3 ? 'text-slate-600' : 'text-blue-600'}`}>
                    {index === 3 ? <Text className='text-blue-600'>{item.date}</Text>: <Text>{item.date}</Text>}
                    {index === 3 && <View className='w-1 h-1 rounded-full bg-blue-500'></View>}
                </View>
            </View>
            ))}
        </View>
    )
}

