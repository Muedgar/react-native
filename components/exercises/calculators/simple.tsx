import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SimpleCalculator() {
    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            <View className="flex-1 px-5 pt-6">
                <Text className="text-3xl font-bold text-slate-900">
                    Simple Calculator
                </Text>

                <Text className="mt-1 text-slate-500">
                    Do simple arthimetic
                </Text>
            </View>
        </SafeAreaView>
    )
}