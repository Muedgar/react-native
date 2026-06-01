import { useState } from "react";
import {
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

enum EMode {
  CREATE = "create",
  EDIT = "edit",
}

type ITodo = {
  id: string;
  status: boolean;
  name: string;
};

export default function SimpleTodo() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState("");
  const [mode, setMode] = useState<EMode>(EMode.CREATE);
  const [editItemId, setEditItemId] = useState("");

  const resetForm = () => {
    setTodo("");
    setEditItemId("");
    setMode(EMode.CREATE);
  };

  const addTodo = () => {
    const trimmedTodo = todo.trim();

    if (!trimmedTodo) return;

    setTodos([
      {
        id: Date.now().toString(),
        status: false,
        name: trimmedTodo,
      },
      ...todos,
    ]);

    resetForm();
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));

    if (editItemId === id) {
      resetForm();
    }
  };

  const editTodo = (item: ITodo) => {
    setTodo(item.name);
    setEditItemId(item.id);
    setMode(EMode.EDIT);
  };

  const saveTodo = () => {
    const trimmedTodo = todo.trim();

    if (!trimmedTodo) return;

    setTodos(
      todos.map((item) =>
        item.id === editItemId
          ? {
              ...item,
              name: trimmedTodo,
            }
          : item
      )
    );

    resetForm();
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? {
              ...item,
              status: !item.status,
            }
          : item
      )
    );
  };

  const submitTodo = () => {
    if (mode === EMode.CREATE) {
      addTodo();
    } else {
      saveTodo();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 px-5 pt-6">
        <Text className="text-3xl font-bold text-slate-900">
          My Todos
        </Text>

        <Text className="mt-1 text-slate-500">
          Add, edit, complete, and delete tasks.
        </Text>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <TextInput
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900"
            placeholder="Enter a todo..."
            placeholderTextColor="#94a3b8"
            value={todo}
            onChangeText={setTodo}
          />

          <View className="mt-3 flex-row gap-3">
            <Pressable
              onPress={submitTodo}
              className={`flex-1 rounded-xl py-3 ${
                mode === EMode.CREATE ? "bg-blue-600" : "bg-emerald-600"
              }`}
            >
              <Text className="text-center font-semibold text-white">
                {mode === EMode.CREATE ? "Add Todo" : "Save Changes"}
              </Text>
            </Pressable>

            {mode === EMode.EDIT && (
              <Pressable
                onPress={resetForm}
                className="rounded-xl bg-slate-200 px-5 py-3"
              >
                <Text className="font-semibold text-slate-700">
                  Cancel
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        <FlatList
          className="mt-6"
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 30,
            gap: 12,
          }}
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Text className="text-lg font-semibold text-slate-700">
                No todos yet
              </Text>
              <Text className="mt-1 text-slate-400">
                Add your first task above.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View className="rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={() => toggleTodo(item.id)}
                  className="flex-1"
                >
                  <Text
                    className={`text-lg font-medium ${
                      item.status
                        ? "text-slate-400 line-through"
                        : "text-slate-900"
                    }`}
                  >
                    {item.name}
                  </Text>

                  <Text className="mt-1 text-xs text-slate-400">
                    {item.status ? "Completed" : "Tap to mark complete"}
                  </Text>
                </Pressable>
              </View>

              <View className="mt-4 flex-row gap-3">
                <Pressable
                  onPress={() => editTodo(item)}
                  className="flex-1 rounded-xl bg-slate-100 py-3"
                >
                  <Text className="text-center font-semibold text-slate-700">
                    Edit
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => deleteTodo(item.id)}
                  className="flex-1 rounded-xl bg-red-50 py-3"
                >
                  <Text className="text-center font-semibold text-red-600">
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}