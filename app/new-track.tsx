import { Link, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, ActivityIndicator, } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTracksApi } from "@/lib/api/tracks";

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
    const {postTrack} = useTracksApi()


    const queryClient = useQueryClient();

   
    const { mutateAsync, isLoading, isError, error } = useMutation({
      mutationFn: postTrack,
      onSuccess: (data) => {
        // Update cache directly
        queryClient.setQueryData(['tracks'], (existingTracks) => {
          return [data, ...(existingTracks || [])]; // Prepend new track
        });
      },
    });
    

    const onTrackPress = async () => {
        console.warn('Tracking the tape: ', text, )

        try{
        await mutateAsync({content: text});

         setText("");
        router.back();
      } catch(e){
             {/* @ts-ignore */}
        console.log('error', e.message)
      }
    }
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
         <Link href = "../" style={styles.backButton} >
          Scratch
         </Link>
         {isLoading && <ActivityIndicator/>}
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
     {/* @ts-ignore */}
     {isError && <Text>Error: {error.message}</Text>}
    </View>
    </SafeAreaView>
  );
}
