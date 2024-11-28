import { StyleSheet, Image, View } from 'react-native';
import {FlatList} from 'react-native'
import tracks from '@/assets/data/tracks';


import Track from '@/components/Track';
export default function TabOneScreen() {
  return (
    <View style={styles.page}>

    <FlatList data={tracks} renderItem={({item})=> <Track track={item}/>}/>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  }
});


