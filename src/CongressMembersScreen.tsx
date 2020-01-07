import React from "react";
import { CacheableImage } from "react-native-cacheable-image";
import { StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { getCongressMembers } from "./api";
import NetworkedList from "./NetworkedList";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    margin: 4,
    color: "black",
  },
  title: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
    margin: 4,
  },
  image: {
    height: 50,
  },
});

const CongressMember = ({
  imageuri,
  title,
  name,
}: {
  imageuri: string;
  title: string;
  name: string;
}) => (
  <ListItem
    leftAvatar={
      <CacheableImage
        source={{ uri: imageuri }}
        style={{ borderRadius: "10px" }}
      />
    }
    title={title}
    titleStyle={{ color: "black", fontWeight: "bold" }}
    subtitleStyle={{ color: "black" }}
    subtitle={name}
  />
);

const CongressMembersScreen = () => (
  <NetworkedList
    getData={() => getCongressMembers()}
    networkFailedMsg="Failed to retrieve congress members"
    listEmptyMsg="No congress members"
    renderItem={({ item }) => (
      <CongressMember name={item.name} title={item.title} imageuri={item.url} />
    )}
    keyExtractor={item => `${item.id}`}
  />
);

export default CongressMembersScreen;
