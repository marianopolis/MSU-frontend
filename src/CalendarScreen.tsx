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

import { Agenda, DateObject } from "react-native-calendars";
import moment, { Moment } from "moment";

import { getCalendar } from "./api";

interface Event {
  id: string;
  summary: string;
  start: Date;
  end: Date;
}

type Events = { [key: string]: Event[] };

interface Props {}

interface State {
  items: Events;
  minDate: string | undefined;
  maxDate: string | undefined;
}

const getDate = (d: Date | Moment) => moment(d).format("YYYY-MM-DD");
const getTime = (d: Date | Moment) => moment(d).format("LT");

const emptyEvents = (
  from: Date | Moment,
  to: Date | Moment,
): { [k: string]: [] } => {
  const r: { [k: string]: [] } = {};

  const start = moment(from).startOf("day");
  const len = moment(to).diff(start, "days");

  for (let i = 0; i < len; ++i) {
    r[start.format("YYYY-MM-DD")] = [];
    start.add(1, "d"); // mutates in place
  }
  return r;
};

export default class CalendarScreen extends Component<Props, State> {
  state: State = {
    minDate: undefined,
    maxDate: undefined,
    items: {},
  };

  componentDidMount() {
    return getCalendar().then(data => {
      const minDate = moment();
      const maxDate = moment(minDate).add(3, "months");
      const items: Events = emptyEvents(minDate, maxDate);

      for (const event of data) {
        const key = getDate(event.start);
        if (key in items) items[key].push(event);
      }

      this.setState({
        minDate: getDate(minDate),
        maxDate: getDate(maxDate),
        items,
      });
    });
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
        pastScrollRange={1}
        futureScrollRange={2}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={(a: Event, b: Event) => a.id !== b.id}
      />
    );
  }

  renderItem = ({ id, start, end, summary }: Event) => (
    <View id={id} style={styles.item}>
      <Text style={styles.dateTitle}>
        {getTime(start)} to {getTime(end)}
      </Text>
      <Text>{summary}</Text>
    </View>
  );

  renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text>No events scheduled</Text>
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
    fontWeight: "bold",
  },
  knobContainer: {
    backgroundColor: "blue",
  },
});
