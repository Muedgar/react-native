
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const GRID_SIZE = 12;
const CELL_SIZE = 24;
const SPEED = 200;

type Point = {
  x: number;
  y: number;
};

const INITIAL_SNAKE: Point[] = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

const INITIAL_FOOD: Point = { x: 8, y: 5 };

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function generateFood(snake: Point[]): Point | null {
  const emptyCells: Point[] = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const occupied = snake.some(
        part => part.x === x && part.y === y
      );

      if (!occupied) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  return emptyCells[
    Math.floor(Math.random() * emptyCells.length)
  ];
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [running, setRunning] = useState(false);

  const snakeRef = useRef<Point[]>(INITIAL_SNAKE);
  const foodRef = useRef<Point>(INITIAL_FOOD);
  const directionRef = useRef<Point>(DIRECTIONS.RIGHT);
  const runningRef = useRef(false);
  const gameOverRef = useRef(false);
  const wonRef = useRef(false);
  const turnLockedRef = useRef(false);

  const changeDirection = (direction: Point) => {
    if (
      !runningRef.current ||
      gameOverRef.current ||
      turnLockedRef.current
    ) {
      return;
    }

    const current = directionRef.current;

    if (
      current.x === -direction.x &&
      current.y === -direction.y
    ) {
      return;
    }

    directionRef.current = direction;
    turnLockedRef.current = true;
  };

  const moveSnake = () => {
    if (
      !runningRef.current ||
      gameOverRef.current ||
      wonRef.current
    ) {
      return;
    }

    const currentSnake = snakeRef.current;
    const direction = directionRef.current;
    const head = currentSnake[0];

    const newHead: Point = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    const eating =
      newHead.x === foodRef.current.x &&
      newHead.y === foodRef.current.y;

    const bodyToCheck = eating
      ? currentSnake
      : currentSnake.slice(0, -1);

    const hitWall =
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE;

    const hitBody = bodyToCheck.some(
      part =>
        part.x === newHead.x &&
        part.y === newHead.y
    );

    if (hitWall || hitBody) {
      gameOverRef.current = true;
      runningRef.current = false;

      setGameOver(true);
      setRunning(false);
      return;
    }

    const newSnake = [
      newHead,
      ...(eating
        ? currentSnake
        : currentSnake.slice(0, -1)),
    ];

    snakeRef.current = newSnake;
    setSnake(newSnake);
    turnLockedRef.current = false;

    if (eating) {
      setScore(previous => previous + 1);

      const newFood = generateFood(newSnake);

      if (newFood === null) {
        wonRef.current = true;
        runningRef.current = false;

        setWon(true);
        setRunning(false);
      } else {
        foodRef.current = newFood;
        setFood(newFood);
      }
    }
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(moveSnake, SPEED);

    return () => clearInterval(interval);
  }, [running]);

  const restartGame = () => {
    const initialSnake = INITIAL_SNAKE.map(
      point => ({ ...point })
    );

    snakeRef.current = initialSnake;
    foodRef.current = { ...INITIAL_FOOD };
    directionRef.current = DIRECTIONS.RIGHT;

    gameOverRef.current = false;
    wonRef.current = false;
    runningRef.current = false;
    turnLockedRef.current = false;

    setSnake(initialSnake);
    setFood({ ...INITIAL_FOOD });
    setScore(0);
    setGameOver(false);
    setWon(false);
    setRunning(false);
  };

  const startGame = () => {
    if (gameOverRef.current || wonRef.current) {
      restartGame();
    }

    runningRef.current = true;
    setRunning(true);
  };

  const pauseGame = () => {
    runningRef.current = false;
    setRunning(false);
  };

  return (
    <View className="flex-1 bg-slate-950 items-center justify-center px-3">
      <Text className="text-lime-400 text-3xl font-bold mb-3">
        SNAKE GAME
      </Text>

      <Text className="text-white text-xl mb-5">
        Score: {score}
      </Text>

      {/* Game board */}
      <View
        className="relative bg-slate-800 border-2 border-slate-600 overflow-hidden"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Snake */}
        {snake.map((part, index) => (
          <View
            key={`${part.x}-${part.y}`}
            className={`absolute rounded-sm ${
              index === 0 ? 'bg-lime-400' : 'bg-green-500'
            }`}
            style={{
              left: part.x * CELL_SIZE,
              top: part.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}

        {/* Food */}
        {!won && (
          <View
            className="absolute bg-rose-400 rounded-full"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        )}
      </View>

      {/* Game status */}
      {gameOver && (
        <Text className="text-rose-400 text-2xl font-bold mt-4">
          GAME OVER!
        </Text>
      )}

      {won && (
        <Text className="text-lime-400 text-2xl font-bold mt-4">
          YOU WIN!
        </Text>
      )}

      {!gameOver && !won && (
        <Text className="text-slate-400 mt-4">
          {running ? 'Playing...' : 'Paused'}
        </Text>
      )}

      {/* Direction controls */}
      <View className="items-center mt-6 gap-2">
        <ControlButton
          label="↑"
          onPress={() => changeDirection(DIRECTIONS.UP)}
        />

        <View className="flex-row gap-3">
          <ControlButton
            label="←"
            onPress={() => changeDirection(DIRECTIONS.LEFT)}
          />

          <ControlButton
            label="↓"
            onPress={() => changeDirection(DIRECTIONS.DOWN)}
          />

          <ControlButton
            label="→"
            onPress={() => changeDirection(DIRECTIONS.RIGHT)}
          />
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row gap-3 mt-6">
        {!running ? (
          <Pressable
            className="bg-lime-600 px-6 py-3 rounded-xl active:opacity-70"
            onPress={startGame}
          >
            <Text className="text-white font-bold text-base">
              {gameOver || won ? 'Play Again' : 'Start'}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            className="bg-lime-600 px-6 py-3 rounded-xl active:opacity-70"
            onPress={pauseGame}
          >
            <Text className="text-white font-bold text-base">
              Pause
            </Text>
          </Pressable>
        )}

        <Pressable
          className="bg-slate-700 px-6 py-3 rounded-xl active:opacity-70"
          onPress={restartGame}
        >
          <Text className="text-white font-bold text-base">
            Restart
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

type ControlButtonProps = {
  label: string;
  onPress: () => void;
};

function ControlButton({
  label,
  onPress,
}: ControlButtonProps) {
  return (
    <Pressable
      className="bg-slate-700 w-16 h-14 items-center justify-center rounded-xl active:bg-slate-600"
      onPress={onPress}
    >
      <Text className="text-white text-3xl font-bold">
        {label}
      </Text>
    </Pressable>
  );
}
