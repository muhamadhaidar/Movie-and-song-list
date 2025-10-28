import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Tab Navigator baru lo
import TabNavigator, { RootTabParamList } from './src/navigation/TabNavigator';

// Import screen detail
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';

// Import tipe data
import type { Film, Song } from './src/api/data';
import { NavigatorScreenParams } from '@react-navigation/native';

// --- (PERUBAHAN BESAR DI SINI) ---
// Definisikan tipe untuk Root Stack
export type RootStackParamList = {
  // Rute ini nampilin Bottom Tab Navigator
  HomeTabs: NavigatorScreenParams<RootTabParamList>;
  // Rute ini adalah screen detail
  MovieDetail: { id: string; title?: string };
  SongDetail: { song: Song }; // Kirim seluruh objek lagu
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator jadi parent.
        Screen pertama (HomeTabs) adalah Tab Navigator lo.
        Screen berikutnya adalah semua screen detail.
      */}
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          // Sembunyikan header untuk screen yg nampilin Tab
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          // Ambil judul dari params
          options={({ route }) => ({ title: route.params?.title || 'Movie Detail' })}
        />
        <Stack.Screen
          name="SongDetail"
          component={SongDetailScreen}
          // Ambil judul lagu dari params
          options={({ route }) => ({ title: route.params.song.name || 'Song Detail' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}