import React, { Component } from "react";
import {
  Alert,
  Button,
  Platform,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    const serverAPI = "http://127.0.0.1:5000/api/calendar";

    this.state = {
      items: [
        { date: "2019-01-16", name: "event" },
        { date: "2019-01-19", name: "event" },
        { date: "2019-02-04", name: "event" },
      ],
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={"2019-01-16"}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  componentDidMount(): void {
    fetch(this.serverAPI)
      .then(res => res.json())
      .then(result => {
        console.log(result.data);
        this.setState({ items: result.data });
      });
  }

  loadItems(day) {
    const events = this.state.items;
    for (event of events) {
      console.log("NEW ELEMENT");
      let strTime = event["date"];
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        this.state.items[strTime].push({
          name: `${event["name"]} ${strTime}`,
        });
      }
    }
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });
    console.log(this.state);
    this.setState({
      items: newItems,
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>"Be water, my friend."</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  knobContainer: {
    backgroundColor: "blue",
  },
});
