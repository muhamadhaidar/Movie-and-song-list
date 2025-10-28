import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getSongs, Song } from '../api/data';
import SongCard from '../components/SongCard';
import type { RootStackParamList } from '../../App';

// Tipe untuk navigasi dari Stack
type SongListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeTabs'>;

export default function SongListScreen() {
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gunakan useNavigation untuk navigasi ke Detail
  const navigation = useNavigation<SongListNavigationProp>();

  const load = async () => {
    try {
      setError(null);
      const songs = await getSongs();
      setData(songs);
    } catch (e: any) {
      setError(e.message || 'Failed to load songs');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading songs…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <Text style={styles.muted}>Pull to retry.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 8 }}
        data={data}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <SongCard
            song={item}
            onPress={() =>
              navigation.navigate('SongDetail', { song: item })
            }
          />
        )}
        ListHeaderComponent={
          <Text style={styles.header}>Hot Electro Songs</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // --- (PERUBAHAN DI SINI) ---
  safeArea: { flex: 1, backgroundColor: '#f3f3f3ff' }, // <-- Ganti jadi PUTIH
  // --- (AKHIR PERUBAHAN) ---
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  muted: { color: '#6B7280', marginTop: 8 },
  error: { color: '#ef4444', fontWeight: '600' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#111827', // Teks gelap
  },
});