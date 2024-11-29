import { withLayoutContext } from "expo-router";
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Text } from "react-native";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

function CustomDrawerContent(props){
    return(
        <DrawerContentScrollView{...props}>
        <Text style={{alignSelf: 'center', fontSize: 20}}>Vo goza</Text>
        <DrawerItemList{...props}/>
        </DrawerContentScrollView>
    )
}

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="(tabs)" options={{ headerShown: false, title: "Tape Deck" }} />
      <Drawer.Screen name="bookmarks" options={{ headerShown: false, title: "TrackMarks" }} />
      <Drawer.Screen name="label-contract" options={{ headerShown: false, title: "Tape Master" }} />
    </Drawer>
  );
}
