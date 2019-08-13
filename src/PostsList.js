import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card, Header } from "react-native-elements";

import { getPosts } from "./api";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  postContainer: {
    flex: 1,
    margin: 4,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    margin: 4,
    color: "black",
  },
  postBody: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
    margin: 4,
  },
  postTime: {
    fontSize: 14,
    fontWeight: "200",
    textAlign: "left",
    margin: 4,
    color: "grey",
  },
});

const Post = ({ subject, body, time, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card containerStyle={styles.postContainer}>
      <Text style={styles.postTitle}>{subject}</Text>
      <Text style={styles.postTime}>{time}</Text>
      <Text style={styles.postBody}>{body}</Text>
    </Card>
  </TouchableOpacity>
);

class PostsList extends Component {
  state = {
    posts: null,
  };

  constructor(props) {
    super(props);

    getPosts()
      .then(posts => this.setState({ posts }))
      .catch(err => console.error(err));
  }

  render = () => (
    <View style={styles.view}>
    <Header
      containerStyle={{ backgroundColor: "#02379E" }}
      centerComponent={{
        text: "Posts",
        style: { color: "#fff", fontSize: 20 }
      }}
    />
      {this.state.posts ? (
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <Post
              subject={item.subject}
              body={item.body}
              time={item.inserted_at}
            />
          )}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

export default PostsList;
