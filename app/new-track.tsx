import { Link, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, ActivityIndicator, } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTracksApi } from "@/lib/api/tracks";

const user = {
  id: "u1",
  username: "newtracker65",
  name: "New Tracker",
  image:
    "https://img.freepik.com/premium-vector/music-cassette-retro-vector-design-yellow-background_175103-1167.jpg",
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
        backgroundColor:'#f3b240',
        padding: 10,
        paddingHorizontal:20,
        borderRadius:25
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      padding: 5,
    }
});

export default function NewTrack() {

    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // State for the image URL
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
        console.warn('Tracking the tape: ', text, 'Image URL: ', imageUrl);

        try{
          await mutateAsync({ content: text, image: imageUrl });

          setText("");
          setImageUrl(""); // Clear the image URL field
          router.back();
        } catch(e){
          {/* @ts-ignore */}
          console.log('error', e.message)
        }
    }

  return (
    <SafeAreaView style={{flex:1}}>
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
     <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Enter image URL"
        style={styles.input}
      />
     {/* @ts-ignore */}
     {isError && <Text>Error: {error.message}</Text>}
    </View>
    </SafeAreaView>
  );
}
