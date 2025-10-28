import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Path import (udah bener)
import FontAwesome from '@react-native-vector-icons/fontawesome';

// Import screen lo
import MovieListScreen from '../screens/MovieListScreen';
import SongListScreen from '../screens/SongListScreen';

// Tentukan tipe param untuk Tab
export type RootTabParamList = {
  Movies: undefined;
  Songs: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Movies') {
            iconName = 'film'; 
          } else if (route.name === 'Songs') {
            iconName = 'music'; 
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        
        // Warna Ikon (Sesuai contoh)
        tabBarActiveTintColor: '#111827', // Item (Aktif)
        tabBarInactiveTintColor: '#9CA3AF',   // Abu-abu (Mati)
        
        // Style Header (Biar Putih & Nyambung)
        headerStyle: {
          backgroundColor: '#FFFFFF', // Background header putih
        },
        headerShadowVisible: false, // Hapus bayangan/garis di bawah header
        
        // --- (PERUBAHAN DI SINI) ---
        headerTitleAlign: 'center', // <-- BIKIN JUDUL HEADER KE TENGAH
        // --- (AKHIR PERUBAHAN) ---
      })}>
      <Tab.Screen
        name="Movies"
        component={MovieListScreen}
        options={{
          title: 'Movies',
          headerShown: true, // Tampilkan header "Movies"
        }}
      />
      <Tab.Screen
        name="Songs"
        component={SongListScreen}
        options={{
          title: 'Songs',
          headerShown: true, // Tampilkan header "Songs"
        }}
      />
    </Tab.Navigator>
  );
}