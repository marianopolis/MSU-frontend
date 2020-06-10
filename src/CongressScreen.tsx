import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import { getCongress } from "./api";
import NetworkedList from "./NetworkedList";

const styles = StyleSheet.create({
  itemTitle: {
    color: "black",
    fontWeight: "bold",
  },
  itemSubtitle: {
    color: "black",
  },
});

const MemberCard = ({
  name,
  title,
  url,
}: {
  name: string;
  title: string;
  url: string;
}) => (
  <ListItem
    leftAvatar={{ source: { uri: url, cache: "force-cache" } }}
    title={name}
    subtitle={title}
    titleStyle={styles.itemTitle}
    subtitleStyle={styles.itemSubtitle}
  />
);

const CongressScreen = () => {
  return (
    <NetworkedList
      getData={getCongress}
      networkFailedMsg="Failed to retrieve congress member list"
      renderItem={({ item }) => (
        <MemberCard name={item.name} title={item.title} url={item.url} />
      )}
      keyExtractor={item => item.url}
    />
  );
};

export default CongressScreen;
