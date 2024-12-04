import { withLayoutContext } from "expo-router";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { useAuth } from "@/context/AuthContext";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
  initialRouteName: "(tabs)", // Ensure that reloading keeps a back button.
};

function CustomDrawerContent(props) {
  const { removeAuthToken } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.headerText}>What's The Tape</Text>
      <DrawerItemList {...props} />
      {/* Add the Sign Out button */}
      <DrawerItem
        label="Sign Out"
        labelStyle={styles.signOutLabel}
        onPress={() => {
          removeAuthToken();
        }}
        style={styles.signOutButton}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { authToken } = useAuth();

  if (!authToken) {
    return <ActivityIndicator />;
  }

  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="(tabs)" options={{ headerShown: false, title: "Tape Deck" }} />
      <Drawer.Screen name="bookmarks" options={{ headerShown: false, title: "TrackMarks" }} />
      <Drawer.Screen name="label-contract" options={{ headerShown: false, title: "Tape Master" }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    fontSize: 25,
    marginVertical: 20,
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 20,
    marginHorizontal: 10, // Padding around the button for better spacing
  },
  signOutLabel: {
    color: 'white',
    textAlign: 'center',
    marginEnd:-18,
    
    fontWeight: 'bold',
    fontSize: 23,
  },
});
