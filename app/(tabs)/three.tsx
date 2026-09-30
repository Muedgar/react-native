/* eslint-disable react/no-unknown-property -- React Three Fiber uses Three.js JSX properties. */
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '@/components/exercises/three/box';
import { SceneCanvas } from '@/components/exercises/three/scene-canvas';

export default function ThreeScreen() {
  const [spinning, setSpinning] = useState(true);
  const focused = useIsFocused();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.eyebrow}>REACT THREE FIBER</Text>
      <Text style={styles.title}>Your first 3D box</Text>
      <Text style={styles.description}>
        Tap the box to change its color and size.
      </Text>
      <View style={styles.scene}>
        {focused && (
          <SceneCanvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[4, 5, 3]} intensity={2} />
            <directionalLight position={[-4, -2, 1]} intensity={0.5} />
            <Box spinning={spinning} />
          </SceneCanvas>
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={spinning ? 'Pause rotation' : 'Resume rotation'}
        onPress={() => setSpinning((value) => !value)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {spinning ? 'Pause rotation' : 'Resume rotation'}
        </Text>
      </Pressable>
      <Text style={styles.hint}>
        Try changing the geometry, material color, or rotation speed in box.tsx.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a', padding: 24 },
  eyebrow: {
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '700', marginTop: 12 },
  description: { color: '#cbd5e1', fontSize: 16, marginTop: 8 },
  scene: { flex: 1, minHeight: 180, marginVertical: 16 },
  button: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  hint: { color: '#94a3b8', fontSize: 13, lineHeight: 20, marginTop: 16 },
});
