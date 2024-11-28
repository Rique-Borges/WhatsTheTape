import { View, Text } from "./Themed"
import { StyleSheet, Image } from "react-native";
import { TrackType } from "@/types";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';

type IconButtonProps = {
    icon: React.ComponentProps<typeof EvilIcons>['name'];
    text?: string | number;
}

const IconButton = ({icon, text}: IconButtonProps) =>{
    return(
     <View style={{flexDirection:'row', alignItems:"center"}}>
      {/* Icon */}
      <EvilIcons name={icon} size={22} color="gray" />
      {/* Number */}
      <Text style={{fontSize: 14, color: 'gray'}}>{text}</Text>
    </View>)
}
export default IconButton