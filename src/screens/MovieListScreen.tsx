import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList, 
  RefreshControl, 
  StyleSheet,
  SafeAreaView // Tambah SafeAreaView
} from 'react-native';
// --- (PERUBAHAN IMPORT) ---
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// --- (AKHIR PERUBAHAN IMPORT) ---
import { getFilms, Film } from '../api/data';
import MovieCard from '../components/MovieCard';
import type { RootStackParamList } from '../../App'; // Import tipe dari App.tsx

// --- (HAPUS TIPE PROPS LAMA) ---
// type Props = NativeStackScreenProps<RootStackParamList, 'MovieList'>;

// Tipe navigasi baru
type MovieListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeTabs'>;

export default function MovieListScreen() { // Hapus { navigation }
  // --- (PERUBAHAN: Gunakan useNavigation) ---
  const navigation = useNavigation<MovieListNavigationProp>();

  const [data, setData] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      const films = await getFilms();
      films.sort((a, b) => Number(b.rt_score) - Number(a.rt_score));
      setData(films);
    } catch (e: any) {
      setError(e.message || 'Failed to load');
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
        <Text style={styles.muted}>Loading movies…</Text>
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
    // Tambah SafeAreaView
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 8 }}
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <MovieCard
            film={item}
            onPress={() =>
              // Navigasi tetap sama
              navigation.navigate('MovieDetail', { id: item.id, title: item.title })
            }
          />
        )}
        ListHeaderComponent={
          <Text style={styles.header}>Top Movies</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' }, // Background putih
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  muted: { color: '#6B7C80', marginTop: 8 },
  error: { color: '#ef4444', fontWeight: '600' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#111827', // Teks gelap
  },
});