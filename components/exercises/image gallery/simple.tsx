import { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type GalleryImage = {
  id: string;
  title: string;
  category: 'Nature' | 'City' | 'People';
  image: ImageSourcePropType;
  height: number;
};

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Mountain View',
    category: 'Nature',
    image: require('./assets/mountain.jpg'),
    height: 220,
  },
  {
    id: '2',
    title: 'City Lights',
    category: 'City',
    image: require('./assets/city.jpg'),
    height: 170,
  },
  {
    id: '3',
    title: 'Forest Walk',
    category: 'Nature',
    image: require('./assets/mountain.jpg'),
    height: 190,
  },
  {
    id: '4',
    title: 'Portrait Mood',
    category: 'People',
    image: require('./assets/city.jpg'),
    height: 240,
  },
];

const categories = ['All', 'Nature', 'City', 'People'] as const;

export default function AssetImageGallery() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('All');

  const [selectedImage, setSelectedImage] = useState<GalleryImage>(
    galleryImages[0],
  );

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return galleryImages;

    return galleryImages.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const leftColumn = filteredImages.filter((_, index) => index % 2 === 0);
  const rightColumn = filteredImages.filter((_, index) => index % 2 !== 0);

  return (
    <SafeAreaView className="flex-1 bg-[#0E1117]">
      <View className="flex-1 px-5 pt-6">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-4xl font-extrabold text-white">Gallery</Text>

            <Text className="mt-2 text-base text-slate-400">
              Local asset image collection
            </Text>
          </View>

          <View className="rounded-full bg-white/10 px-4 py-3">
            <Text className="font-extrabold text-white">
              {filteredImages.length}
            </Text>
          </View>
        </View>

        <View className="mt-7 overflow-hidden rounded-[36px] bg-white/10">
          <Image
            source={selectedImage.image}
            className="h-64 w-full"
            resizeMode="cover"
          />

          <View className="absolute bottom-0 left-0 right-0 p-5">
            <View className="rounded-[28px] bg-black/55 p-4">
              <Text className="text-2xl font-extrabold text-white">
                {selectedImage.title}
              </Text>

              <Text className="mt-1 font-semibold text-slate-300">
                {selectedImage.category}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
        >
          <View className="flex-row gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-3 ${
                    active ? 'bg-white' : 'bg-white/10'
                  }`}
                >
                  <Text
                    className={`font-extrabold ${
                      active ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <Text className="mt-6 text-xl font-extrabold text-white">Explore</Text>

        <ScrollView
          className="mt-4 flex-1"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row gap-4 pb-8">
            <View className="flex-1 gap-4">
              {leftColumn.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  selected={selectedImage.id === item.id}
                  onPress={() => setSelectedImage(item)}
                />
              ))}
            </View>

            <View className="flex-1 gap-4">
              {rightColumn.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  selected={selectedImage.id === item.id}
                  onPress={() => setSelectedImage(item)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function GalleryCard({
  item,
  selected,
  onPress,
}: {
  item: GalleryImage;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`overflow-hidden rounded-[28px] border ${
        selected ? 'border-white' : 'border-white/10'
      } bg-white/10`}
    >
      <Image
        source={item.image}
        style={{ height: item.height }}
        className="w-full"
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-lg font-extrabold text-white">{item.title}</Text>

        <Text className="mt-1 text-sm font-semibold text-slate-400">
          {item.category}
        </Text>
      </View>
    </Pressable>
  );
}
