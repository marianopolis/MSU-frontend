import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListItem } from "react-native-elements";

import PostsScreen from "./src/PostsScreen";
import FilesScreen from "./src/FilesScreen";
/* import FormsScreen from "./src/FormsScreen"; */
import EventsScreen from "./src/EventsScreen";

const MemberCard = ({
  imageuri,
  title,
  text,
}: {
  imageuri: string;
  title: string;
  text: string;
}) => (
  <ListItem
    leftAvatar={{ rounded: true, source: { uri: imageuri } }}
    title={title}
    titleStyle={{ color: "black", fontWeight: "bold" }}
    subtitleStyle={{ color: "black" }}
    subtitle={text}
  />
);

const CongressPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <ScrollView>
      <MemberCard
        title="Aria Khiabani"
        imageuri="./static/photos/Aria.jpg"
        text="President"
      />
      <MemberCard
        title="Ying Ge"
        imageuri="./static/photos/YingG.jpg"
        text="Vice President"
      />
      <MemberCard
        title="Amanda Morrone"
        imageuri="./static/photos/Amanda.jpg"
        text="Vice President of Finance"
      />
      <MemberCard
        title="Ying Chen"
        imageuri="./static/photos/YingC.jpg"
        text="Coordinator of Communications"
      />
      <MemberCard
        title="Michael Chalkhoun"
        imageuri="./static/photos/Michael.jpg"
        text="Coordinator of Student Advocacy"
      />
      <MemberCard
        title="Darya Jabbari"
        imageuri="./static/photos/Darya.jpg"
        text="Coordinator of Social Justice"
      />
      <MemberCard
        title="Andrew Petrecca-Berthelet"
        imageuri="./static/photos/Andrew.jpg"
        text="Coordinator of Social Activities"
      />
      <MemberCard
        title="Cherry Ying"
        imageuri="./static/photos/Cherry.jpg"
        text="Coordinator Volunteering & Activities"
      />
      <MemberCard
        title="Misha Fotovati"
        imageuri="./static/photos/Misha.jpg"
        text="Coordinator of Internal Affairs"
      />
      <MemberCard
        title="Zhaoran Wu"
        imageuri="./static/photos/Zhaoran.jpg"
        text="Coordinator of Cultural Affairs"
      />
      <MemberCard
        title="Steven Gong"
        imageuri="./static/photos/Steven.jpg"
        text="Financial Assistant"
      />
      <MemberCard
        title="Stephanie Wang"
        imageuri="./static/photos/Stephanie.jpg"
        text="Administrative Assistant"
      />
      <MemberCard
        title="Laurence Liang"
        imageuri="./static/photos/Laurence.jpg"
        text="Coordinator of External Affairs"
      />
    </ScrollView>
  </View>
);

const MSU_LOGO = require("./assets/logo-white.png");

const icons: { [key: string]: any } = {
  Posts: "chat",
  Files: "info",
  /* Form: "note", */
  Events: "event",
  Congress: "people",
};

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
  },
  headerImage: {
    height: 38,
    resizeMode: "contain",
  },
});

const TabNav = createBottomTabNavigator();
const TabNavScreen = () => (
  <TabNav.Navigator
    initialRouteName="Posts"
    tabBarOptions={{
      labelStyle: styles.label,
    }}
    screenOptions={({ route }: any) => ({
      tabBarIcon: ({ color, size }: any) => (
        <MaterialIcon name={icons[route.name]} color={color} size={size} />
      ),
    })}
  >
    <TabNav.Screen name="Posts" component={PostsScreen} />
    <TabNav.Screen name="Files" component={FilesScreen} />
    <TabNav.Screen name="Events" component={EventsScreen} />
    <TabNav.Screen name="Congress" component={CongressPlaceholder} />
  </TabNav.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <RootStack.Screen
      name="Home"
      component={TabNavScreen}
      options={{
        headerTitle: () => (
          <Image source={MSU_LOGO} style={styles.headerImage} />
        ),
      }}
    />
  </RootStack.Navigator>
);

const App = () => (
  <NavigationNativeContainer>
    <RootStackScreen />
  </NavigationNativeContainer>
);
export default App;
