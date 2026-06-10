import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Controller, Resolver, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { priorityLabels, statusLabels, Todo, TodoInput } from './todo-store';

const colors = [
  'bg-violet-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-rose-500',
  'bg-cyan-600',
];

const icons = [
  'account-group-outline',
  'palette-outline',
  'code-braces',
  'calendar-check-outline',
  'notebook-outline',
];

const todoSchema = z.object({
  title: z.string().trim().min(3, 'Use at least 3 characters.'),
  desc: z.string().trim().min(8, 'Add a short description.'),
  time: z.string().trim().min(3, 'Add a time like 10:00 AM.'),
  dueDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD format.'),
  status: z.enum(['todo', 'progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  progress: z.coerce.number().min(0).max(100),
  color: z.string().min(1),
  icon: z.string().min(1),
});

export type TodoFormValues = z.input<typeof todoSchema>;

const todoResolver: Resolver<TodoFormValues> = async (values) => {
  const parsed = todoSchema.safeParse(values);

  if (parsed.success) {
    return {
      values: parsed.data,
      errors: {},
    };
  }

  return {
    values: {},
    errors: parsed.error.issues.reduce<Record<string, { message: string }>>(
      (result, issue) => {
        const name = issue.path[0];

        if (typeof name === 'string') {
          result[name] = { message: issue.message };
        }

        return result;
      },
      {},
    ),
  };
};

const defaults: TodoFormValues = {
  title: '',
  desc: '',
  time: '',
  dueDate: '2026-06-14',
  status: 'todo',
  priority: 'medium',
  progress: 0,
  color: colors[0],
  icon: icons[0],
};

type TodoFormScreenProps = {
  title: string;
  submitLabel: string;
  todo?: Todo;
  onSubmit: (input: TodoInput) => void;
};

export function TodoFormScreen({
  title,
  submitLabel,
  todo,
  onSubmit,
}: TodoFormScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({
    defaultValues: todo ?? defaults,
    resolver: todoResolver,
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
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
            <Text className="text-lg font-extrabold text-slate-950">
              {title}
            </Text>
            <View className="h-12 w-12" />
          </View>

          <View className="px-6 pt-8">
            <Field
              control={control}
              name="title"
              label="Title"
              placeholder="Design check-in"
              error={errors.title?.message}
            />
            <Field
              control={control}
              name="desc"
              label="Description"
              placeholder="What should happen?"
              error={errors.desc?.message}
              multiline
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Field
                  control={control}
                  name="time"
                  label="Time"
                  placeholder="10:00 AM"
                  error={errors.time?.message}
                />
              </View>
              <View className="flex-1">
                <Field
                  control={control}
                  name="dueDate"
                  label="Date"
                  placeholder="2026-06-14"
                  error={errors.dueDate?.message}
                />
              </View>
            </View>
            <Field
              control={control}
              name="progress"
              label="Progress"
              placeholder="0"
              error={errors.progress?.message}
              keyboardType="number-pad"
            />

            <SegmentedField
              control={control}
              name="status"
              label="Status"
              options={Object.entries(statusLabels)}
            />
            <SegmentedField
              control={control}
              name="priority"
              label="Priority"
              options={Object.entries(priorityLabels)}
            />
            <SwatchField control={control} />
            <IconField control={control} />

            <TouchableOpacity
              className="mt-8 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-slate-950 shadow-md"
              onPress={handleSubmit((values) => onSubmit(values as TodoInput))}
            >
              <MaterialCommunityIcons name="check" size={22} color="white" />
              <Text className="text-base font-extrabold text-white">
                {submitLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type FieldProps = {
  control: ReturnType<typeof useForm<TodoFormValues>>['control'];
  name: keyof TodoFormValues;
  label: string;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'number-pad';
};

function Field({
  control,
  name,
  label,
  placeholder,
  error,
  multiline,
  keyboardType = 'default',
}: FieldProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-extrabold text-slate-600">
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`rounded-3xl bg-white px-5 text-base text-slate-900 shadow-sm ${
              multiline ? 'min-h-28 py-4' : 'h-14'
            }`}
            keyboardType={keyboardType}
            multiline={multiline}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
            textAlignVertical={multiline ? 'top' : 'center'}
            value={String(value ?? '')}
          />
        )}
      />
      {error && (
        <Text className="mt-2 text-xs font-bold text-rose-500">{error}</Text>
      )}
    </View>
  );
}

type SegmentedFieldProps = {
  control: ReturnType<typeof useForm<TodoFormValues>>['control'];
  name: 'status' | 'priority';
  label: string;
  options: [string, string][];
};

function SegmentedField({
  control,
  name,
  label,
  options,
}: SegmentedFieldProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-extrabold text-slate-600">
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-2">
            {options.map(([key, optionLabel]) => {
              const active = value === key;

              return (
                <TouchableOpacity
                  key={key}
                  className={`h-11 flex-1 items-center justify-center rounded-2xl ${
                    active ? 'bg-slate-950' : 'bg-white'
                  } shadow-sm`}
                  onPress={() => onChange(key)}
                >
                  <Text
                    className={`text-sm font-extrabold ${
                      active ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {optionLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}

function SwatchField({
  control,
}: {
  control: ReturnType<typeof useForm<TodoFormValues>>['control'];
}) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-extrabold text-slate-600">Color</Text>
      <Controller
        control={control}
        name="color"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-3">
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                className={`h-11 w-11 items-center justify-center rounded-2xl ${color}`}
                onPress={() => onChange(color)}
              >
                {value === color && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="white"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}

function IconField({
  control,
}: {
  control: ReturnType<typeof useForm<TodoFormValues>>['control'];
}) {
  return (
    <View>
      <Text className="mb-2 text-sm font-extrabold text-slate-600">Icon</Text>
      <Controller
        control={control}
        name="icon"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-3">
            {icons.map((icon) => (
              <TouchableOpacity
                key={icon}
                className={`h-12 w-12 items-center justify-center rounded-2xl ${
                  value === icon ? 'bg-slate-950' : 'bg-white'
                } shadow-sm`}
                onPress={() => onChange(icon)}
              >
                <MaterialCommunityIcons
                  name={icon as never}
                  size={22}
                  color={value === icon ? 'white' : '#475569'}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}
