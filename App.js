import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { View, Text, StyleSheet, Image, ScrollView} from "react-native";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { Card, ListItem, Button, Icon } from 'react-native-elements'



const PostsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ScrollView>
      <Text style={{justifyContent: "center", alignItems: "center", fontSize: 50, margin: 20}}>Posts</Text>
      <NewsCard title="MariMeet is Here" 
      imageuri="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Coll%C3%A8ge_Marianopolis.JPG/1920px-Coll%C3%A8ge_Marianopolis.JPG"
      text="MariMeet is a friendly afternoon to meet new students!" />
      <NewsCard title="Used Books Sale" 
      imageuri="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Coll%C3%A8ge_Marianopolis.JPG/1920px-Coll%C3%A8ge_Marianopolis.JPG"
      text="Get second hand textbooks at a convenient price." />
    </ScrollView>
  </View>
);

class NewsCard extends React.Component {
  render() {
    return (

    <Card
      title={this.props.title}
      image={{uri: this.props.imageuri}}>
      <Text style={{marginBottom: 10}}>
        {this.props.text}
      </Text>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='VIEW NOW' />
    </Card>

    )
  }
}

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
    Posts: PostsPlaceholder,
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
