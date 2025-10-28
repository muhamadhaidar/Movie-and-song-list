import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// Path import (udah bener)
import FontAwesome from '@react-native-vector-icons/fontawesome';
import type { Song } from '../api/data';

type Props = {
  song: Song;
  onPress: () => void;
};

export default function SongCard({ song, onPress }: Props) {
  const artist = song.uNm || 'Unknown Artist';
  const playlist = song.pl ? `${song.pl.name} • ${song.pl.nbTracks} tracks` : 'Unknown Playlist';
  const genre = song.name.split('//').pop()?.split('-').pop()?.trim() || 'Music';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: song.img }} style={styles.cover} />
      
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{song.name}</Text>
        <Text style={styles.artist}>{artist}</Text>
        <Text numberOfLines={1} style={styles.playlist}>{playlist || genre}</Text>
        <Text style={styles.score}>Score: {song.sc?.score || 0}</Text>
      </View>
      
      {/* --- (PERUBAHAN IKON PLAY DI SINI) --- */}
      <View style={styles.playButtonContainer}>
        {/* Kita bikin lingkaran (View) dan taro ikon 'play' (FontAwesome) di dalemnya */}
        <View style={styles.playButtonCircle}>
          <FontAwesome 
            name="play" 
            size={14} 
            color="white" 
            style={{ marginLeft: 3 }} // <-- Bikin ikon segitiganya pas di tengah lingkaran
          />
        </View>
      </View>
      {/* --- (AKHIR PERUBAHAN) --- */}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cover: { 
    width: 70, 
    height: 70, 
    borderRadius: 8, 
    backgroundColor: '#E5E7EB' 
  },
  info: { 
    flex: 1, 
    justifyContent: 'center', 
    gap: 2,
  },
  title: { 
    color: '#111827', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  
  // --- (PERUBAHAN FONT DI SINI) ---
  artist: { 
    color: '#374151', 
    fontSize: 13, 
    fontWeight: '400' // <-- Ganti dari 500 (Medium) jadi 400 (Normal)
  },
  playlist: { 
    color: '#6B7C80', 
    fontSize: 12,
    fontWeight: '400' // <-- Tambahin biar konsisten
  },
  // --- (AKHIR PERUBAHAN) ---

  score: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  playButtonContainer: {
    paddingLeft: 8,
    justifyContent: 'center', // Bikin ikonnya di tengah vertikal card
  },

  // --- (STYLE BARU BUAT IKON PLAY) ---
  playButtonCircle: {
    width: 32, // Ukuran lingkaran item (lumayan besar)
    height: 32,
    borderRadius: 16, // Setengahnya
    backgroundColor: '#111827', // Warna lingkaran
    justifyContent: 'center',
    alignItems: 'center',
  },
});