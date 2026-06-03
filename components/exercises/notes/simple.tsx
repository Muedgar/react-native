import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Note = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
};

const starterNotes: Note[] = [
  {
    id: '1',
    title: 'React Native idea',
    body: 'Build small apps every day to master UI, state, and layout.',
    pinned: true,
    createdAt: 'Today',
  },
  {
    id: '2',
    title: 'Shopping list',
    body: 'Rice, eggs, bananas, water, coffee.',
    pinned: false,
    createdAt: 'Yesterday',
  },
];

export default function ProNotesApp() {
  const [notes, setNotes] = useState<Note[]>(starterNotes);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const text = `${note.title} ${note.body}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [notes, query]);

  const selectedNote = notes.find((note) => note.id === selectedId);

  const createNote = () => {
    if (!title.trim() && !body.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim() || 'Untitled Note',
      body: body.trim(),
      pinned: false,
      createdAt: 'Just now',
    };

    setNotes((prev) => [newNote, ...prev]);
    setTitle('');
    setBody('');
    setSelectedId(newNote.id);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));

    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const togglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note,
      ),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F3EA]">
      <View className="flex-1 px-5 pt-6">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-4xl font-extrabold text-stone-950">
              Notes
            </Text>
            <Text className="mt-2 text-base text-stone-500">
              Capture ideas before they escape
            </Text>
          </View>

          <View className="rounded-full bg-stone-950 px-4 py-3">
            <Text className="font-extrabold text-white">{notes.length}</Text>
          </View>
        </View>

        <View className="mt-6 rounded-3xl bg-white px-5 py-4">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search notes..."
            placeholderTextColor="#A8A29E"
            className="text-base font-semibold text-stone-900"
          />
        </View>

        <View className="mt-5 rounded-[32px] bg-stone-950 p-5">
          <Text className="text-sm font-bold uppercase text-stone-400">
            New Note
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor="#78716C"
            className="mt-4 text-2xl font-extrabold text-white"
          />

          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Write something..."
            placeholderTextColor="#78716C"
            multiline
            className="mt-3 min-h-20 text-base font-medium leading-6 text-stone-200"
          />

          <Pressable
            onPress={createNote}
            className="mt-5 rounded-2xl bg-amber-400 py-4"
          >
            <Text className="text-center text-base font-extrabold text-stone-950">
              Add Note
            </Text>
          </Pressable>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-xl font-extrabold text-stone-950">
            Your Notes
          </Text>
          <Text className="font-bold text-stone-500">
            {filteredNotes.length} found
          </Text>
        </View>

        <ScrollView
          className="mt-4 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {filteredNotes.length === 0 ? (
            <View className="rounded-3xl border border-dashed border-stone-300 p-8">
              <Text className="text-center text-base font-semibold text-stone-400">
                No notes found.
              </Text>
            </View>
          ) : (
            filteredNotes.map((note) => {
              const active = selectedId === note.id;

              return (
                <Pressable
                  key={note.id}
                  onPress={() => setSelectedId(note.id)}
                  className={`mb-4 rounded-[30px] p-5 ${
                    active ? 'bg-amber-300' : 'bg-white'
                  }`}
                >
                  <View className="flex-row items-start justify-between gap-4">
                    <View className="flex-1">
                      <Text className="text-xl font-extrabold text-stone-950">
                        {note.pinned ? '📌 ' : ''}
                        {note.title}
                      </Text>

                      <Text
                        numberOfLines={2}
                        className="mt-2 text-base leading-6 text-stone-600"
                      >
                        {note.body || 'No extra details.'}
                      </Text>

                      <Text className="mt-4 text-xs font-bold uppercase text-stone-400">
                        {note.createdAt}
                      </Text>
                    </View>

                    <View className="gap-2">
                      <Pressable
                        onPress={() => togglePin(note.id)}
                        className="rounded-full bg-stone-950 px-3 py-2"
                      >
                        <Text className="font-bold text-white">
                          {note.pinned ? 'Unpin' : 'Pin'}
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => deleteNote(note.id)}
                        className="rounded-full bg-red-100 px-3 py-2"
                      >
                        <Text className="font-bold text-red-500">Delete</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>

        {selectedNote && (
          <View className="mb-3 rounded-[28px] bg-stone-950 p-5">
            <Text className="text-sm font-bold uppercase text-stone-400">
              Selected Note
            </Text>
            <Text className="mt-2 text-xl font-extrabold text-white">
              {selectedNote.title}
            </Text>
            <Text className="mt-2 text-sm leading-5 text-stone-300">
              {selectedNote.body || 'No body text.'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
