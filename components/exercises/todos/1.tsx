'use client'

import { useState } from "react"
import { ScrollView, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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
    )
}

// component 1

const Header = () => {
    return (
        <View className="w-full h-20 bg-transparent flex-row justify-between items-center pl-10 pr-10">
            <View className="w-14 h-14 bg-transparent items-center">
                <Text className="w-[90%] h-[90%] rounded-full bg-slate-300 mt-[2px]"></Text>
            </View>
            <View className="w-14 h-14 bg-transparent items-center shadow-lg shadow-green-500">
                <Text className="w-[90%] h-[90%] rounded-2xl bg-slate-300 mt-[2px]"></Text>
            </View>
        </View>
    )
}

// component 2

const Hero = () => {
    return (
        <View className="w-full h-[150px] bg-transparent flex-col justify-start items-center pl-10 pr-10 pt-[20px]">
            <View className="w-full h-fit bg-transparent">
                <Text className="ml-2 mt-2 font-light text-xl">Good Morning, Rifat!</Text>
            </View>
            <View className="w-full h-fit bg-transparent">
                <Text className="ml-2 mt-2 font-bold text-4xl">You have <Text className="text-purple-800">49 tasks</Text> this month</Text>
            </View>
        </View>
    )
}

// component 3

const Search = () => {
    const [search, setSearch] = useState("");
    return (
        <View className="w-full h-[100px] bg-transparent flex-col justify-start items-center pl-10 pr-10 pt-[20px]">
            <View className="w-[90%] h-[50px] rounded-2xl bg-slate-100 flex-row">
                <View className="w-[17%] h-full bg-transparent rounded-tl-2xl rounded-bl-2xl flex-col justify-center items-center">
                    <View className="w-[80%] h-[80%] bg-white rounded-full"></View>
                </View>
                <View className="w-[83%] h-full bg-transparent overflow-hidden rounded-tr-2xl rounded-br-2xl">
                    <TextInput className="w-full h-full bg-slate-100 p-2 overflow-x-auto font-light text-xl" value={search} onChangeText={setSearch} />
                </View>
            </View>
        </View>
    )
}

// component 4

const QuickNav = () => {

    return (
        <View className="w-full h-[200px] bg-transparent flex-row justify-evenly items-center pl-10 pr-10">
            <View className="w-[100px] h-[150px] flex-col justify-center items-center bg-slate-200 rounded-[100px]">
                <View className="w-[55px] h-[55px] bg-pink-600 rounded-full"></View>
                <View className="mt-2">
                    <Text className="text-sm">To-Do</Text>
                </View>
            </View>
            <View className="w-[100px] h-[150px] flex-col justify-center items-center bg-slate-200 rounded-[100px]">
                <View className="w-[55px] h-[55px] bg-yellow-600 rounded-full"></View>
                <View className="mt-2">
                    <Text className="text-sm">In-Progress</Text>
                </View>
            </View>
            <View className="w-[100px] h-[150px] flex-col justify-center items-center bg-slate-200 rounded-[100px]">
                <View className="w-[55px] h-[55px] bg-green-600 rounded-full"></View>
                <View className="mt-2">
                    <Text className="text-sm">Done</Text>
                </View>
            </View>
        </View>
    )
}

// component 5
const Tasks = () => {
    return (
        <View className="w-full h-fit flex flex-col justify-start mb-4">
            <View className="w-full h-[50px] bg-trasparent flex-row justify-between items-center pl-10 pr-10">
                <Text className="font-bold text-3xl">Today's Tasks</Text>
                <Text className="text-slate-400 cursor-pointer underline">See all</Text>
            </View>
            <View className="w-fit h-fit flex flex-row justify-evenly">
                <TaskView color={'bg-purple-400'}/>
                <TaskView color={'bg-green-400'}/>
                <TaskView color={'bg-yellow-400'}/>
            </View>
        </View>
    )
}


const TaskView = ({color}:{color: string}) => {
   return (
     <View className={`w-[180px] h-[215px] ml-2 mr-2 rounded-3xl ${color} elevation-xl flex flex-col flex-wrap p-4`}>
                <View className="w-fit flex flex-row justify-between">
                    <Text className="text-white font-bold text-lg mt-2">Team Meeting</Text>
                    <View className="w-10 h-10 bg-slate-50 rounded-full"></View>
                </View>
                <View className="w-fit flex flex-row justify-between pt-3">
                    <Text className="text-white font-light text-lg">Group discussion for the new product</Text>
                </View>
                <View className="w-fit flex flex-row justify-between pt-3">
                    <Text className="text-white font-medium text-lg">10:00 AM</Text>
                </View>
                <View className="w-fit flex flex-row justify-between pt-3">
                    <Text className="text-white font-medium text-md">Progress</Text>
                    <Text className="text-white font-medium text-md">48%</Text>
                </View>
                <View className="w-fit flex flex-row justify-between relative pt-3">
                    <View className="w-full h-1 bg-slate-300 absolute top-3 rounded-lg"></View>
                    <View className="w-[48%] h-1 bg-white absolute top-3 rounded-lg"></View>
                    <View className="w-2 h-2  bg-white absolute top-[9px] left-20 rounded-full"></View>
                </View>
            </View>
   )
}