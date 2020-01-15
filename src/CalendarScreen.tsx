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

import { getCalendar } from "./api";

interface Event {
  text: string;
  startTime: string,
  endTime: string,
}

type Events = {[key: string]: Event[]};

interface Props {}

interface State {
  items: Events;
}

export default class CalendarScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    console.log(process.env.SERVER_URL);
    // return fetch('https://msu-app-staging.herokuapp.com/api/calendar')
    // return fetch(`${process.env.SERVER_URL}/api/calendar`)
      // .then(response => response.json())
     return getCalendar()
      .then(responseJson => {
        this.setState(() => {

          let returnEvents: Events = {};
          console.log("responseJson")
          console.log(responseJson)

          for (const event of responseJson) {
            let strDate = event["start"]["dateTime"].split("T")[0];
            let strTimeStart = this.removeSeconds(event["start"]["dateTime"].split("T")[1].split('-')[0]);
            let strTimeEnd = this.removeSeconds(event["end"]["dateTime"].split("T")[1].split('-')[0]);
            let name = event["summary"];

            if (!returnEvents[strDate]) {
              returnEvents[strDate] = [];
            }

            returnEvents[strDate].push({text: name, startTime: strTimeStart, endTime: strTimeEnd});
          }
          return {items: returnEvents};
        })
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
        selected={"2020-01-14"}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={(a: any, b: any) => a !== b}
        onDayPress={this.onDayPress}
      />
    );
  }

  renderItem(item: Event) {
    return (
      <View style={[styles.item]}>
        <Text style={{fontWeight: 'bold'}}>{item.startTime} to {item.endTime}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>No events scheduled</Text>
      </View>
    );
  }

  removeSeconds(timeString: string): string {
    let listOfTimeString = timeString.split(':');
    let returnTimeString = listOfTimeString[0]+':'+listOfTimeString[1];
    return returnTimeString
  }

  onDayPress = ({dateString}: any) => {
    this.setState(state => ({
      items: {[dateString]: [], ...state.items},
    }));
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