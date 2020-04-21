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
  id: string;
  summary: string;
  location: string;
  start: Date;
  end: Date;
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

  renderItem = ({ id, start, end, summary, location }: Event) => (
    <View id={id} style={styles.item}>
      <Text style={styles.eventName}>{summary}</Text>
      <Text style={styles.dateTitle}>
        {getTime(start)} to {getTime(end)}
      </Text>
      { location &&      
        <Text style={styles.locationText}>{location}</Text>
      }
    </View>
  );

  renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text style={styles.emptyDateText}>
        No events scheduled
      </Text>
    </View>
  );
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
  dateTitle: {
    fontWeight: 'normal',
  },
  eventName:{
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 20,
    lineHeight: 20,
  },
  locationText: {
    color: 'gray',
  },
  emptyDateText:{
      color: 'rgb(171, 171, 171)',
  },
  knobContainer: {
    backgroundColor: "blue",
  },
});