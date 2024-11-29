import { Link, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, } from "react-native";

const user = {
  id: "u1",
  username: "VadimNotJustDev",
  name: "Vadim",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
};

const styles = StyleSheet.create({
  container:{
    padding: 10,
    flex:1,
  },
  inputContainer:{
    flexDirection: 'row',
  },
  buttonContainer:{
    flexDirection:'row',
    marginVertical:10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
    image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight:10,
  },
    backButton:{
        fontSize:18,
    },
    trackButton:{
        backgroundColor:'#1C9BF0',
        padding: 10,
        paddingHorizontal:20,
        borderRadius:25
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default function NewTrack() {

    const [text, setText] = useState("");
    const router = useRouter();

    const onTrackPress = () => {
        console.warn('Tracking the tape:', text, )

        setText("");
        router.back();
    }
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
         <Link href = "../" style={styles.backButton} >
          Scratch
         </Link>
         <Pressable onPress={onTrackPress} style={styles.trackButton} >
          <Text style={styles.buttonText}>Track</Text>
         </Pressable>
        </View>
     <View style={styles.inputContainer}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <TextInput
      value={text} 
      onChangeText={setText}
      placeholder="What's the tape?" 
      multiline 
      numberOfLines={5}
      style= {{flex:1}} />
     </View>
    </View>
    </SafeAreaView>
  );
}
