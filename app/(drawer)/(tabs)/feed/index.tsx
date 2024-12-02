import { StyleSheet, Image, View, Pressable, ActivityIndicator } from 'react-native';
import {FlatList} from 'react-native'
import tracks from '@/assets/data/tracks';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { listTracks } from '@/lib/api/tracks';
import Track from '@/components/Track';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/Themed';

export default function FeedScreen() {
   const {data, isLoading, error} = useQuery({
    queryKey: ['tracks'],
    queryFn: listTracks,
   });

   
  if (isLoading){
    return <ActivityIndicator/>;
  }
  if (error){
    return <Text>{error.message}</Text>
  }
 
  return (
    <View style={styles.page}>

    <FlatList data={data} renderItem={({item})=> <Track track={item}/>}/>
    
    <Pressable>
      <Link href="/new-track" asChild >
      <MaterialCommunityIcons name="music-note-plus" size={24} color="black" style={styles.floatingButton}/>
      </Link>
    </Pressable>
    
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  floatingButton:{
      backgroundColor: '#1C9BF0',
      borderRadius: 50,
      textAlign: 'center',
      padding: 17,
      position: 'absolute',
      right: 15,
      bottom: 15,

      shadowColor: '#000',
      shadowOffset:{
        width:0,
        height:2,
      },
      shadowOpacity:0.3,
      shadowRadius:3.9,
      elevation:5,
      overflow: 'hidden'
  }
});


