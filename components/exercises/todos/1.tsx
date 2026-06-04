'use client'

import { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function OneTodo() {
    return (
        <SafeAreaView>
            <Header />
            <Hero />
            <Search />
            <QuickNav />
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
        <View className="w-full h-[250px] bg-transparent flex-row justify-evenly items-center pl-10 pr-10">
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

