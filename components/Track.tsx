import { View, Text } from "./Themed"
import { StyleSheet, Image, Pressable } from "react-native";
import { TrackType } from "@/types";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import IconButton from "./IconButton";
import { Link } from "expo-router";

type TrackProps = {
    track: TrackType;
}

const Track = ({track}: TrackProps) => {

    return(
      <Link href={`./feed/track/${track.id}`} asChild>
    <Pressable style={styles.container}>
    <Image src={track.user.image} style={styles.userImage}/>
      
      <View style={styles.mainContainer}>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.name}>{track.user.name}</Text>
            <Text style={styles.username}>@{track.user.username} · 2h</Text>
            <FontAwesome6 name="ellipsis" size={20} color="dimgray" style={{marginLeft:'auto',fontWeight: 'bold'}} />
        </View>
        <Text style={styles.content}>{track.content}</Text>
      
      {track.image &&  <Image src={track.image} style={styles.image} />}
      <View style={styles.footer}>
        <IconButton icon="comment" text={track.numberOfComments?.toString()} />
        <IconButton icon="retweet" text={track.numberOfReplays}/>
        <IconButton icon="heart" text={track.numberOfLikes}/>
        <IconButton icon="chart" text={track.impressions || 0}/>
        <Entypo name="share" size={20} color="dimgray " />
      </View>
      </View>
    </Pressable>
    </Link>
    )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10, 
      borderBottomWidth:StyleSheet.hairlineWidth,
      borderColor: 'lightgray',
      backgroundColor:'white'
    },
    userImage:{
      width: 50,
      height: 50,
      borderRadius: 50
    },
    mainContainer:{
      marginLeft: 10,
      flex: 1,
    },
    name:{
      fontWeight: 'bold'
    },
    username:{
        color: 'gray',
        marginLeft: 5
    },
    content:{
      lineHeight: 20,
      marginTop: 5,
    },
    image: {
        width: '100%',
        aspectRatio:16/9,
        marginTop: 10,
        borderRadius:15,
    },

    // footer
    footer: {
        flexDirection:'row',
        marginTop:6,
        justifyContent: 'space-between'
    }
  });
  export default Track