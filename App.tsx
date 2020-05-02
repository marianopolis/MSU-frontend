import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListItem } from "react-native-elements";
import Config from "react-native-config";

import PostsScreen from "./src/PostsScreen";
import FilesScreen from "./src/FilesScreen";
// import FormsScreen from "./src/FormsScreen";
import CalendarScreen from "./src/CalendarScreen";

const MemberCard = ({
  source,
  title,
  text,
}: {
  source: string;
  title: string;
  text: string;
}) => (
  <ListItem
    leftAvatar={{ rounded: true, source: source }}
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
        source={require("./assets/photos/Aria.jpg")}
        text="President"
      />
      <MemberCard
        title="Ying Ge"
        source={require("./assets/photos/YingG.jpg")}
        text="Vice President"
      />
      <MemberCard
        title="Amanda Morrone"
        source={require("./assets/photos/Amanda.jpg")}
        text="Vice President of Finance"
      />
      <MemberCard
        title="Ying Chen"
        source={require("./assets/photos/YingC.jpg")}
        text="Coordinator of Communications"
      />
      <MemberCard
        title="Michael Chalkhoun"
        source={require("./assets/photos/Michael.jpg")}
        text="Coordinator of Student Advocacy"
      />
      <MemberCard
        title="Darya Jabbari"
        source={require("./assets/photos/Darya.jpg")}
        text="Coordinator of Social Justice"
      />
      <MemberCard
        title="Andrew Petrecca-Berthelet"
        source={require("./assets/photos/Andrew.jpg")}
        text="Coordinator of Social Activities"
      />
      <MemberCard
        title="Cherry Sun"
        source={require("./assets/photos/Cherry.jpg")}
        text="Coordinator of Volunteering & Charities"
      />
      <MemberCard
        title="Misha Fotovati"
        source={require("./assets/photos/Misha.jpg")}
        text="Coordinator of Internal Affairs"
      />
      <MemberCard
        title="Zhaoran Wu"
        source={require("./assets/photos/Zhaoran.jpg")}
        text="Coordinator of Cultural Affairs"
      />
      <MemberCard
        title="Steven Gong"
        source={require("./assets/photos/Steven.jpg")}
        text="Financial Assistant"
      />
      <MemberCard
        title="Stephanie Wang"
        source={require("./assets/photos/Stephanie.jpg")}
        text="Administrative Assistant"
      />
      <MemberCard
        title="Laurence Liang"
        source={require("./assets/photos/Laurence.jpg")}
        text="Coordinator of External Affairs"
      />
    </ScrollView>
  </View>
);

const MSU_LOGO = require("./assets/logo-white.png");

const icons: { [key: string]: any } = {
  Posts: "chat",
  Resources: "info",
  Forms: "note",
  Calendar: "event",
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
  errorRoot: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  errorTitle: {
    textAlign: "center",
    fontWeight: "bold",
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
    <TabNav.Screen name="Resources" component={FilesScreen} />
    {/* <TabNav.Screen name="Forms" component={FormsScreen} /> */}
    <TabNav.Screen name="Calendar" component={CalendarScreen} />
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

// List of environment variables that must be set in .env.
// If they are not set, the App prints and displays an error.
const CONFIG_VARS = ["SERVER_URL"];

const App = () => {
  // Ensure all env variables are set. If any is not, print missing variables.
  if (!CONFIG_VARS.every(x => x in Config)) {
    const missing = CONFIG_VARS.filter(x => !(x in Config));
    console.error("Environment variables missing from .env:");
    console.error(`${missing}`);
    return (
      <View style={styles.errorRoot}>
        <Text style={styles.errorTitle}>
          Environment variables are missing from .env:
        </Text>
        {missing.map(x => (
          <Text>{x}</Text>
        ))}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
export default App;
