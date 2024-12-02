import Track from "@/components/Track"
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { ActivityIndicator, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getTrack } from "@/lib/api/tracks";

export default function TrackScreen(){
const { id } = useGlobalSearchParams();

console.warn(id); //remover isso antes do deploy

const {data, isLoading, error} = useQuery({
    queryKey:['track', id],
    queryFn: () => getTrack(id as string)
})

    if(isLoading){
        return <ActivityIndicator/>;
    }

    if(error){
        return <Text>Track {id} not Found</Text>
    }

    return <Track track={data}/>; 
}