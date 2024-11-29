import Track from "../../components/Track"
import tracks from "../../assets/data/tracks"
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Text } from "react-native";
export default function TrackScreen(){
const { id } = useGlobalSearchParams();
console.warn(id);

const track = tracks.find(t => t.id === id)

    if(!track){
        return <Text>Track {id} not Found</Text>
    }

    return <Track track={track}/>; 
}