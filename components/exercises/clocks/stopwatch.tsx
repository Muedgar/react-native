import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Lap = {
  id: string;
  time: number;
};

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}.${String(centiseconds).padStart(2, '0')}`;
}

export default function ProStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  const startTimeRef = useRef(0);
  const savedElapsedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - savedElapsedRef.current;

      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 30);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const lapStats = useMemo(() => {
    if (laps.length === 0) return { best: '', worst: '' };

    const sorted = [...laps].sort((a, b) => a.time - b.time);

    return {
      best: sorted[0].id,
      worst: sorted[sorted.length - 1].id,
    };
  }, [laps]);

  const handleStartPause = () => {
    if (running) {
      savedElapsedRef.current = elapsed;
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
    savedElapsedRef.current = 0;
  };

  const handleLap = () => {
    if (!running) return;

    setLaps((current) => [
      {
        id: Date.now().toString(),
        time: elapsed,
      },
      ...current,
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#090B10]">
      <View className="flex-1 px-5 pt-6">
        <View>
          <Text className="text-4xl font-extrabold text-white">Stopwatch</Text>
          <Text className="mt-2 text-base text-slate-500">
            Pro lap timer for focused training
          </Text>
        </View>

        <View className="mt-8 rounded-[40px] bg-[#111827] p-6">
          <Text className="text-sm font-bold uppercase text-slate-500">
            Current Time
          </Text>

          <Text className="mt-8 text-center text-6xl font-extrabold tracking-tight text-white">
            {formatTime(elapsed)}
          </Text>

          <View className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800">
            <View
              className="h-full rounded-full bg-cyan-400"
              style={{
                width: `${Math.min((elapsed % 60000) / 600, 100)}%`,
              }}
            />
          </View>

          <View className="mt-8 flex-row gap-3">
            <Pressable
              onPress={handleReset}
              className="flex-1 rounded-3xl bg-slate-800 py-5"
            >
              <Text className="text-center text-lg font-bold text-white">
                Reset
              </Text>
            </Pressable>

            <Pressable
              onPress={handleStartPause}
              className={`flex-[1.4] rounded-3xl py-5 ${
                running ? 'bg-orange-500' : 'bg-cyan-400'
              }`}
            >
              <Text className="text-center text-lg font-extrabold text-slate-950">
                {running ? 'Pause' : 'Start'}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleLap}
              className="flex-1 rounded-3xl bg-slate-800 py-5"
            >
              <Text className="text-center text-lg font-bold text-white">
                Lap
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-6 flex-row gap-3">
          <View className="flex-1 rounded-3xl bg-[#111827] p-5">
            <Text className="text-sm font-bold uppercase text-slate-500">
              Laps
            </Text>
            <Text className="mt-2 text-3xl font-extrabold text-white">
              {laps.length}
            </Text>
          </View>

          <View className="flex-1 rounded-3xl bg-[#111827] p-5">
            <Text className="text-sm font-bold uppercase text-slate-500">
              Status
            </Text>
            <Text
              className={`mt-2 text-3xl font-extrabold ${
                running ? 'text-cyan-400' : 'text-orange-400'
              }`}
            >
              {running ? 'Live' : 'Paused'}
            </Text>
          </View>
        </View>

        <Text className="mt-7 text-xl font-extrabold text-white">
          Lap History
        </Text>

        <ScrollView
          className="mt-4 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {laps.length === 0 ? (
            <View className="rounded-3xl border border-dashed border-slate-700 p-8">
              <Text className="text-center text-base font-semibold text-slate-500">
                No laps yet. Start the timer and tap Lap.
              </Text>
            </View>
          ) : (
            laps.map((lap, index) => {
              const label = laps.length - index;
              const isBest = lap.id === lapStats.best;
              const isWorst = lap.id === lapStats.worst;

              return (
                <View
                  key={lap.id}
                  className="mb-3 flex-row items-center justify-between rounded-3xl bg-[#111827] px-5 py-4"
                >
                  <View>
                    <Text className="text-lg font-extrabold text-white">
                      Lap {label}
                    </Text>

                    <Text
                      className={`mt-1 text-xs font-bold uppercase ${
                        isBest
                          ? 'text-emerald-400'
                          : isWorst
                            ? 'text-orange-400'
                            : 'text-slate-500'
                      }`}
                    >
                      {isBest ? 'Best Lap' : isWorst ? 'Slowest Lap' : 'Split'}
                    </Text>
                  </View>

                  <Text className="text-xl font-bold text-slate-200">
                    {formatTime(lap.time)}
                  </Text>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
