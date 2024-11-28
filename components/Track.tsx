import { View, Text } from "./Themed"
import { StyleSheet, Image } from "react-native";

const Track = ({track}) => {

    return(
        <View style={styles.container}>
      <Image src={track.user.image} style={styles.userImage}/>
      <View style={styles.mainContainer}>
      <Text style={styles.name}>{track.user.name}</Text>
      <Text style={styles.content}>{track.content}</Text>
      </View>
      
    </View>
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
    content:{
      lineHeight: 20,
      marginTop: 5,
    }
  });
  export default Track