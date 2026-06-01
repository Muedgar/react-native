import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SimpleTimer() {
    const [simpleTimer, setSimpleTimer] = useState<{
        hour: string,
        minute: string,
        second: string
    }>();

    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            const newTime = {
                hour: String(time.getHours()).padStart(2, '0'),
                minute: String(time.getMinutes()).padStart(2, '0'),
                second: String(time.getSeconds()).padStart(2, '0')
            }
            setSimpleTimer(newTime);
        }, 1000);
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 flex-col items-center justify-center px-4">
                <Text className="font-bold text-2xl text-white">{simpleTimer?.hour} : {simpleTimer?.minute} : {simpleTimer?.second}</Text>
            </View>
        </SafeAreaView>
    )
}