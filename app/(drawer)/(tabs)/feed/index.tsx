import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Alert,
  Text,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import Track from '../../../../components/Track';
// import Tracks from '../../../../assets/data/Tracks';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTracksApi } from '@/lib/api/tracks';
import { useQuery } from '@tanstack/react-query';

export default function FeedScreen() {
  const { listTracks } = useTracksApi();
  const colorScheme = useColorScheme(); // Detect light or dark theme

  const { data, isLoading, error } = useQuery({
    queryKey: ['tracks'],
    queryFn: listTracks,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View
      style={[
        styles.page,
        { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' },
      ]}
    >
      <FlatList data={data} renderItem={({ item }) => <Track track={item} />} />

      <Link href="/new-track" asChild>
        <MaterialCommunityIcons
          name="music-note-plus"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
          style={styles.floatingButton}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  floatingButton: {
    backgroundColor: '#f3b240',

    borderRadius: 25,
    padding: 15,

    position: 'absolute',
    right: 15,
    bottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    overflow: 'hidden',
  },
});
