import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";

const Placeholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>UNIMPLEMENTED</Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
  },
});

const icons = {
  "Posts": {
    mod: MaterialIcon,
    name: "chat",
  },
  "Form": {
    mod: SimpleLineIcon,
    name: "note",
  },
  "Congress": {
    mod: MaterialIcon,
    name: "people",
  },
  "Settings": {
    mod: MaterialIcon,
    name: "settings",
  },
};

const TabNavigator = createMaterialTopTabNavigator(
  {
    Posts: Placeholder,
    Form: Placeholder,
    Congress: Placeholder,
    Settings: Placeholder,
  },
  {
    initialRouteName: "Posts",
    swipeEnabled: true,
    tabBarPosition: "bottom",
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
  }
);

export default createAppContainer(TabNavigator);
