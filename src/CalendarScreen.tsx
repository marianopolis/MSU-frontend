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

    this.state = {
      items: [
        { date: "2019-01-16", name: "event" },
        { date: "2019-01-19", name: "event" },
        { date: "2019-02-04", name: "event" },
      ],
    };
  }

  componentDidMount() {
    return fetch('TODO')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            items: responseJson.data,
          },
          function() {}
        );
        console.log("this.state.items")
        console.log(this.state.items);
      })
      .catch(error => {
        console.error(error);
      });
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
    for (var i = 0; i < events.length; i++) {
      let strTime = events[i]["start"]["dateTime"].split("T")[0];
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        this.state.items[strTime].push({
          name: `${strTime} ${events[i]["summary"]}`,
        });
      }
    }
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });
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
  }
});