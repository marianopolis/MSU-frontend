import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import { ListItem } from "react-native-elements";

import PostsScreen from "./src/PostsScreen";
import FilesScreen from "./src/FilesScreen";
import FormsScreen from "./src/FormsScreen";
import EventsScreen from "./src/EventsScreen";

const MemberCard = ({ imageuri, title, text }) => (
  <ListItem
    style={{ margin: 5 }}
    leftAvatar={{ rounded: true, source: { uri: imageuri } }}
    title={title}
    titleStyle={{ color: "black", fontWeight: "bold" }}
    subtitleStyle={{ color: "black" }}
    subtitle={text}
    chevronColor="black"
  />
);

const CongressPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <ScrollView>
      <MemberCard
        title="Aria Khiabani"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/Aria-800x1068.jpg"
        text="President"
      />
      <MemberCard
        title="Ying Ge"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/YG-800x1068.jpg"
        text="Vice President"
      />
      <MemberCard
        title="Amanda Morrone"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/Amanda-800x1068.jpg"
        text="Vice President of Finance"
      />
      <MemberCard
        title="Ying Chen"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/YC-800x1068.jpg"
        text="Coordinator of Communications"
      />
      <MemberCard
        title="Michael Chalkhoun"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/Michael-800x1068.jpg"
        text="Coordinator of Student Advocacy"
      />
      <MemberCard
        title="Darya Jabbari"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/Darya-800x1068.jpg"
        text="Coordinator of Social Justice"
      />
      <MemberCard
        title="Andrew Petrecca-Berthelet"
        imageuri="https://msucongress.com/wp-content/uploads/2019/07/Andrew-800x1068.jpg"
        text="Coordinator of Social Activities"
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
  },
});

const icons = {
  Posts: {
    mod: MaterialIcon,
    name: "chat",
  },
  Files: {
    mod: MaterialIcon,
    name: "info",
  },
  Form: {
    mod: SimpleLineIcon,
    name: "note",
  },
  Events: {
    mod: MaterialIcon,
    name: "event",
  },
  Congress: {
    mod: MaterialIcon,
    name: "people",
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    Posts: PostsScreen,
    Files: FilesScreen,
    // NOTE: Temporarily disabled
    // Form: FormsScreen,
    Events: EventsScreen,
    Congress: CongressPlaceholder,
  },
  {
    initialRouteName: "Posts",
    swipeEnabled: true,
    tabBarOptions: {
      showIcon: true,
      labelStyle: styles.label,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { name, mod: Icon } = icons[navigation.state.routeName];
        return <Icon name={name} color={tintColor} size={26} />;
      },
    }),
  },
);

const RootNavigator = createStackNavigator(
  {
    tabNav: TabNavigator,
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTitle: "MSU",
    },
  },
);

export default createAppContainer(RootNavigator);
