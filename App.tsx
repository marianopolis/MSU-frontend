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
    // style={{ margin: 5 }} doesn't exist
    leftAvatar={{ rounded: true, source: { uri: imageuri } }}
    title={title}
    titleStyle={{ color: "black", fontWeight: "bold" }}
    subtitleStyle={{ color: "black" }}
    subtitle={text}
    // chevronColor="black" doesn't exist
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

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
  },
});

const icons: { [key: string]: any } = {
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
        const { name, mod: Icon }: { name: string; mod: any } = icons[
          navigation.state.routeName
        ];
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
