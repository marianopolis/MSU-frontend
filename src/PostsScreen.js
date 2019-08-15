import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-elements";

import { getPosts } from "./api";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  card: {
    flex: 1,
    margin: 2,
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
    <Card containerStyle={styles.card}>
      <Text style={styles.postTitle}>{subject}</Text>
      <Text style={styles.postTime}>{time}</Text>
      <Text style={styles.postBody}>{body}</Text>
    </Card>
  </TouchableOpacity>
);

class PostsScreen extends Component {
  state = {
    posts: null,
    refreshing: false,
  };

  constructor(props) {
    super(props);
    this.retrievePosts();
  }

  refresh = () => {
    this.setState({ refreshing: true });
    this.retrievePosts();
  }

  retrievePosts = () => {
    getPosts()
      .then(posts => this.setState({ posts, refreshing: false }))
      .catch(err => {
        console.error(err);
        this.setState({ refreshing: false });
      });
  }

  render = () => (
    <View style={styles.view}>
      {this.state.posts ? (
        <FlatList
          data={this.state.posts}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
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

export default PostsScreen;
