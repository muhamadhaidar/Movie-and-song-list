import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image,
  Alert, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import YoutubeIframe from 'react-native-youtube-iframe';
import type { RootStackParamList } from '../../App';
import type { Song } from '../api/data';

type Props = NativeStackScreenProps<RootStackParamList, 'SongDetail'>;

// Fungsi helper (tetap sama)
const getYouTubeId = (eId: string): string | null => {
  if (!eId) return null;
  const parts = eId.split('/yt/');
  return parts.length > 1 ? parts[1] : null;
};

export default function SongDetailScreen({ route }: Props) {
  const { song } = route.params;
  const [playing, setPlaying] = useState(true); 

  const videoId = getYouTubeId(song.eId);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended' || state === 'paused') {
      setPlaying(false);
    }
    if (state === 'playing') {
      setPlaying(true);
    }
  }, []);

  const artist = song.uNm || 'Unknown Artist';
  const playlist = song.pl ? `${song.pl.name} • ${song.pl.nbTracks} tracks` : 'Unknown Playlist';
  const score = song.sc?.score ?? 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 1. Info Header (Card Putih Pertama - NGGAK DIUBAH) */}
        <View style={styles.headerCard}>
          <Image source={{ uri: song.img }} style={styles.cover} />
          <View style={styles.info}>
            <Text numberOfLines={2} style={styles.title}>{song.name}</Text>
            <Text style={styles.artist}>{artist}</Text>
            <Text numberOfLines={1} style={styles.playlist}>{playlist}</Text>
            <Text style={styles.score}>Score: {score}</Text>
          </View>
        </View>

        {/* 2. Player (Unit Item "Ngambang") */}
        {videoId ? (
          <View style={styles.playerUnit}> 
            <View style={styles.videoContainer}>
              <YoutubeIframe
                height={220}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
              />
            </View>
            <TouchableOpacity style={styles.pauseButton} onPress={togglePlaying}>
              <Text style={styles.pauseButtonText}>
                {playing ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.videoError}>
            <Text style={styles.errorText}>Video not available for this song.</Text>
          </View>
        )}

        {/* 3. Song Information (Card Putih Terakhir - NGGAK DIUBAH) */}
        <View style={styles.infoSectionCard}>
          <Text style={styles.heading}>Song Information</Text>
          <InfoRow label="Title" value={song.name} />
          <InfoRow label="Artist" value={artist} />
          <InfoRow label="Playlist" value={playlist} />
          <InfoRow label="Score" value={score} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Komponen helper (tetap sama)
const InfoRow = ({ label, value }: { label: string, value: string | number }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// --- (STYLE DIUBAH) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffffff' }, // <-- Balikin ke Abu-abu
  container: { paddingBottom: 24 },
  
  // Card 1: Header (Putih)
  headerCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: '#ebe9e9ff', // <-- Balikin ke Putih
    elevation: 2,
  },
  cover: { width: 100, height: 100, borderRadius: 8 },
  info: { flex: 1, justifyContent: 'center', gap: 4 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  artist: { fontSize: 14, color: '#374151' },
  playlist: { fontSize: 12, color: '#6B7C80' },
  score: { color: '#16a34a', fontSize: 12, fontWeight: '600', marginTop: 2 },
  
  // Unit 2: Player (Item Gelap, "Ngambang")
  playerUnit: {
    marginHorizontal: 12,
    marginTop: 16, 
    borderRadius: 12, 
    elevation: 3,
    overflow: 'hidden', 
    backgroundColor: '#000000ff', // Ini warna "frame hitam"
 // <-- Kasih padding biar tombolnya ngambang
  },

  // --- (PERUBAHAN STYLE TOMBOL PAUSE DI SINI) ---
  pauseButton: {
    backgroundColor: '#132036ff', // <-- Warna BIRU
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8, // <-- Bikin tombolnya melengkung
    marginTop: 12, // <-- Jarak dari video (area hitam)

    marginHorizontal: 12, // Jarak kiri-kanan tombol
    marginBottom: 12
  },
  // --- (AKHIR PERUBAHAN) ---

  pauseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Fallback kalo video error
  videoError: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 12,
  },
  errorText: { color: '#6B7C80', fontWeight: '500' },
  
  // Card 3: Song Info (Putih)
  infoSectionCard: { 
    padding: 16, 
    marginHorizontal: 12, 
    marginTop: 16, 
    backgroundColor: '#ebe9e9ff', // <-- Balikin ke Putih
    borderRadius: 12,
    elevation: 2,
  },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#111827' },
  
  // Style buat baris (Title, Artist, dll)
  infoRow: { 
    flexDirection: 'row', 
    paddingVertical: 8, 
    alignItems: 'flex-start', 
  },
  infoLabel: { 
    color: '#6B7C80', 
    fontSize: 14,
    width: 80, 
  },
  infoValue: { 
    color: '#111827', 
    fontSize: 14, 
    fontWeight: '400', 
    flex: 1, 
    textAlign: 'left', 
    marginLeft: 8 
  },
});