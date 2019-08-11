import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation";
import {
  Header,
  Card,
  Button,
  Icon,
  Input,
} from "react-native-elements";

import PostsList from "./src/PostsList";

const FormPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <Header
      centerComponent={{ text: "Form", style: { color: "#fff", fontSize: 20 } }}
    />
    <ScrollView>
      <FormCard />
    </ScrollView>
  </View>
);

const CongressPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <Header
      centerComponent={{
        text: "Congress",
        style: { color: "#fff", fontSize: 20 },
      }}
    />
    <ScrollView>
      <MemberCard
        title="Aria Khiabani"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/Aria-800x1068.jpg"
        text="President"
      />
      <MemberCard
        title="Ying Ge"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/YG-800x1068.jpg"
        text="Vice President"
      />
      <MemberCard
        title="Amanda Morrone"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/Amanda-800x1068.jpg"
        text="Vice President of Finance"
      />
      <MemberCard
        title="Ying Chen"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/YC-800x1068.jpg"
        text="Coordinator of Communications"
      />
      <MemberCard
        title="Michael Chalkhoun"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/Michael-800x1068.jpg"
        text="Coordinator of Student Advocacy"
      />
      <MemberCard
        title="Darya Jabbari"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/Darya-800x1068.jpg"
        text="Coordinator of Social Justice"
      />
      <MemberCard
        title="Andrew Petrecca-Berthelet"
        imageuri="http://msucongress.com/wp-content/uploads/2019/07/Andrew-800x1068.jpg"
        text="Coordinator of Social Activities"
      />
    </ScrollView>
  </View>
);

class FormCard extends React.Component {
  render() {
    return (
      <Card>
        <Text> Have your say! </Text>
        <Input multiline={true} placeholder="Your message" />
        <Button
          icon={<Icon name="send" color="#ffffff" />}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Send"
        />
      </Card>
    );
  }
}

class MemberCard extends React.Component {
  render() {
    return (
      <Card title={this.props.title}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: this.props.imageuri }}
        />
        <Text style={{ marginBottom: 10 }}>{this.props.text}</Text>
        <Button
          icon={<Icon name="chat" color="#ffffff" />}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Contact"
        />
      </Card>
    );
  }
}

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
  Form: {
    mod: SimpleLineIcon,
    name: "note",
  },
  Congress: {
    mod: MaterialIcon,
    name: "people",
  },
};

const TabNavigator = createMaterialTopTabNavigator(
  {
    Posts: PostsList,
    Form: FormPlaceholder,
    Congress: CongressPlaceholder,
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
  },
);

export default createAppContainer(TabNavigator);
