import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";

import { getEvents } from "./api";
import NetworkedList from "./NetworkedList";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    margin: 4,
    color: "black",
  },
  body: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
    margin: 4,
  },
  time: {
    fontSize: 14,
    fontWeight: "200",
    textAlign: "left",
    margin: 4,
    color: "grey",
  },
});

const Event = ({
  name,
  desc,
  time,
}: {
  name: string;
  desc: string;
  time: string;
}) => (
  <Card containerStyle={styles.card}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.time}>{time}</Text>
    <Text style={styles.body}>{desc}</Text>
  </Card>
);

const EventsScreen = () => (
  <NetworkedList
    getData={() => getEvents()}
    networkFailedMsg="Failed to retrieve events"
    listEmptyMsg="No events"
    renderItem={({ item }) => (
      <Event name={item.name} desc={item.description} time={item.start_time} />
    )}
    keyExtractor={item => item.id} // id is a string
  />
);

export default EventsScreen;
