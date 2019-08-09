import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { View, Text, StyleSheet, Image, ScrollView, FlatList} from "react-native";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { Header, Card, ListItem, Button, Icon, Input, Avatar } from 'react-native-elements'

const PostsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <Header
      centerComponent={{ text: 'Posts', style: { color: '#fff', fontSize: 20 }}}
      />
    <ScrollView>
      <NewsCard title="MariMeet is Here" 
      imageuri="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Coll%C3%A8ge_Marianopolis.JPG/1920px-Coll%C3%A8ge_Marianopolis.JPG"
      text="MariMeet is a friendly afternoon to meet new students!" />
      <NewsCard title="Used Books Sale" 
      imageuri="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Coll%C3%A8ge_Marianopolis.JPG/1920px-Coll%C3%A8ge_Marianopolis.JPG"
      text="Get second hand textbooks at a convenient price." />
    </ScrollView>
  </View>
);

const FormPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <Header
      centerComponent={{ text: 'Form', style: { color: '#fff', fontSize: 20 }}}
      />
    <ScrollView>
      <FormCard />
    </ScrollView>
  </View>
);

const CongressPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <Header
      centerComponent={{ text: 'Congress', style: { color: '#fff', fontSize: 20 }}}
      />
    <ScrollView>
      <MemberCard title="Aria Khiabani" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/Aria-800x1068.jpg"
      text="President" />
      <MemberCard title="Ying Ge" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/YG-800x1068.jpg"
      text="Vice President" />
      <MemberCard title="Amanda Morrone" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/Amanda-800x1068.jpg"
      text="Vice President of Finance" />
      <MemberCard title="Ying Chen" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/YC-800x1068.jpg"
      text="Coordinator of Communications" />
      <MemberCard title="Michael Chalkhoun" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/Michael-800x1068.jpg"
      text="Coordinator of Student Advocacy" /> 
      <MemberCard title="Darya Jabbari" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/Darya-800x1068.jpg"
      text="Coordinator of Social Justice" />
      <MemberCard title="Andrew Petrecca-Berthelet" 
      imageuri="http://msucongress.com/wp-content/uploads/2019/07/Andrew-800x1068.jpg"
      text="Coordinator of Social Activities" />
    </ScrollView>
  </View>
);

const SettingsPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
    <Header
      centerComponent={{ text: 'Settings', style: { color: '#fff', fontSize: 20 }}}
      />
    <ScrollView style={{padding: 20}}>
    <Text>About this app</Text>
    <Text>Created in August 2019 by the MSU Tech Committee</Text>
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
        icon={<Icon name='fingerprint' color='#ffffff' />}
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='View now' />
    </Card>
    )
  }
}

class FormCard extends React.Component {
  render() {

    return(
    <Card>
      <Text> Have your say! </Text>
      <Input multiline={true} placeholder="Your message" />
      <Button
        icon={<Icon name='send' color='#ffffff' />}
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Send' />
    </Card>
    )
  }
}

class MemberCard extends React.Component {
  render() {
    return (
    <Card
      title={this.props.title}
      >
      <Image
          style={{width: 50, height: 50}}
          source={{uri: this.props.imageuri}}
        />
      <Text style={{marginBottom: 10}}>
        {this.props.text}
      </Text>
      <Button
        icon={<Icon name='chat' color='#ffffff' />}
        backgroundColor='#03A9F4'
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='Contact' />
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
    Form: FormPlaceholder,
    Congress: CongressPlaceholder,
    Settings: SettingsPlaceholder,
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
