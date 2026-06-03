import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: 'What does React Native help you build?',
    options: ['Mobile apps', 'Databases', 'Operating systems', 'Browsers'],
    answer: 'Mobile apps',
  },
  {
    question: 'Which hook is used to store changing data?',
    options: ['useMap', 'useState', 'useStyle', 'useScreen'],
    answer: 'useState',
  },
  {
    question: 'What does JSX look like?',
    options: ['SQL', 'HTML inside JavaScript', 'CSS only', 'JSON only'],
    answer: 'HTML inside JavaScript',
  },
  {
    question: 'Which component is used for clickable UI?',
    options: ['Pressable', 'Database', 'Folder', 'Server'],
    answer: 'Pressable',
  },
];

export default function BasicQuizApp() {
  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[step];
  const selected = selectedAnswers[step];

  const score = useMemo(() => {
    return questions.reduce((total, q, index) => {
      return selectedAnswers[index] === q.answer ? total + 1 : total;
    }, 0);
  }, [selectedAnswers]);

  const progress = ((step + 1) / questions.length) * 100;

  const chooseAnswer = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [step]: option,
    }));
  };

  const goNext = () => {
    if (step === questions.length - 1) {
      setFinished(true);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const restart = () => {
    setStep(0);
    setSelectedAnswers({});
    setFinished(false);
  };

  if (finished) {
    return (
      <SafeAreaView className="flex-1 bg-[#F6F7FB]">
        <View className="flex-1 px-5 pt-6">
          <Text className="text-4xl font-extrabold text-slate-950">
            Quiz Result
          </Text>

          <Text className="mt-2 text-base text-slate-500">
            Nice work. Here is your final score.
          </Text>

          <View className="mt-10 rounded-[40px] bg-slate-950 p-8">
            <Text className="text-center text-sm font-bold uppercase text-slate-400">
              Your Score
            </Text>

            <Text className="mt-6 text-center text-7xl font-extrabold text-white">
              {score}/{questions.length}
            </Text>

            <Text className="mt-4 text-center text-lg font-semibold text-emerald-400">
              {score === questions.length
                ? 'Excellent!'
                : score >= questions.length / 2
                  ? 'Good progress!'
                  : 'Keep practicing!'}
            </Text>
          </View>

          <View className="mt-8">
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.answer;

              return (
                <View
                  key={q.question}
                  className="mb-3 rounded-3xl bg-white p-5"
                >
                  <Text className="text-base font-extrabold text-slate-900">
                    {index + 1}. {q.question}
                  </Text>

                  <Text
                    className={`mt-2 font-bold ${
                      isCorrect ? 'text-emerald-500' : 'text-red-500'
                    }`}
                  >
                    Your answer: {userAnswer || 'Not answered'}
                  </Text>

                  {!isCorrect && (
                    <Text className="mt-1 font-semibold text-slate-500">
                      Correct answer: {q.answer}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>

          <Pressable
            onPress={restart}
            className="mt-auto rounded-3xl bg-indigo-600 py-5"
          >
            <Text className="text-center text-lg font-extrabold text-white">
              Try Again
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F6F7FB]">
      <View className="flex-1 px-5 pt-6">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-4xl font-extrabold text-slate-950">
              Quick Quiz
            </Text>

            <Text className="mt-2 text-base text-slate-500">
              Test your React Native basics
            </Text>
          </View>

          <View className="rounded-full bg-white px-4 py-3">
            <Text className="font-extrabold text-slate-900">
              {step + 1}/{questions.length}
            </Text>
          </View>
        </View>

        <View className="mt-8 h-3 overflow-hidden rounded-full bg-slate-200">
          <View
            className="h-full rounded-full bg-indigo-600"
            style={{ width: `${progress}%` }}
          />
        </View>

        <View className="mt-8 rounded-[40px] bg-white p-6">
          <Text className="text-sm font-bold uppercase text-indigo-500">
            Question {step + 1}
          </Text>

          <Text className="mt-5 text-3xl font-extrabold leading-10 text-slate-950">
            {currentQuestion.question}
          </Text>
        </View>

        <View className="mt-6 gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selected === option;

            return (
              <Pressable
                key={option}
                onPress={() => chooseAnswer(option)}
                className={`rounded-3xl border p-5 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <Text
                  className={`text-lg font-bold ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-auto flex-row gap-3 pb-4">
          <Pressable
            onPress={goBack}
            className={`flex-1 rounded-3xl py-5 ${
              step === 0 ? 'bg-slate-200' : 'bg-slate-900'
            }`}
          >
            <Text
              className={`text-center text-lg font-extrabold ${
                step === 0 ? 'text-slate-400' : 'text-white'
              }`}
            >
              Back
            </Text>
          </Pressable>

          <Pressable
            onPress={goNext}
            disabled={!selected}
            className={`flex-[1.5] rounded-3xl py-5 ${
              selected ? 'bg-indigo-600' : 'bg-indigo-200'
            }`}
          >
            <Text className="text-center text-lg font-extrabold text-white">
              {step === questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
