import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import Markdown from "react-native-markdown-renderer";
import moment from "moment";

import { getPosts } from "./api";
import NetworkedList from "./NetworkedList";

const styles = StyleSheet.create({
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

const Post = ({
  subject,
  body,
  time,
}: {
  subject: string;
  body: string;
  time: string;
}) => (
  <Card containerStyle={styles.card}>
    <Markdown>{subject}</Markdown>
    <Text style={styles.postTime}>
      {moment(time).format("ddd, MMM DD [at] LT ")}
    </Text>
    <Markdown>{body}</Markdown>
  </Card>
);

const PostsScreen = () => (
  <NetworkedList
    getData={() => getPosts()}
    networkFailedMsg="Failed to retrieve posts"
    listEmptyMsg="No posts"
    renderItem={({ item }) => (
      <Post subject={item.subject} body={item.body} time={item.inserted_at} />
    )}
    keyExtractor={item => `${item.id}`}
  />
);

export default PostsScreen;
