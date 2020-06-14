import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";

import { Agenda, DateObject } from "react-native-calendars";
import moment, { Moment } from "moment";

import { getCalendar } from "./api";

const getDate = d => moment(d).format("YYYY-MM-DD");
const getTime = d => moment(d).format("LT");

const emptyEvents = (from, to) => {
  const r = {};

  const start = moment(from).startOf("day");
  const len = moment(to).diff(start, "days");

  for (let i = 0; i < len; ++i) {
    r[getDate(start)] = [];
    start.add(1, "d"); // mutates in place
  }
  return r;
};

const EmptyDate = () => (
  <View style={styles.emptyDate}>
    <Text style={styles.emptyDateText}>No events scheduled</Text>
  </View>
);

const Item = ({ id, start, end, summary, location }) => (
  <View id={id} style={styles.item}>
    <Text style={styles.eventName}>{summary}</Text>
    <Text style={styles.dateTitle}>
      {getTime(start)} to {getTime(end)}
    </Text>
    {location && <Text style={styles.locationText}>{location}</Text>}
  </View>
);

const CalendarScreen = () => {
  let [minDate, setMinDate] = useState();
  let [maxDate, setMaxDate] = useState();
  let [items, setItems] = useState({});

  useEffect(() => {
    getCalendar().then(data => {
      const today = moment();
      const end = moment(today).add(3, "months");
      const events = emptyEvents(today, end);

      for (const event of data) {
        const key = getDate(event.start);
        if (key in items) items[key].push(event);
      }

      setMinDate(getDate(today));
      setMaxDate(getDate(end));
      setItems(events);
    });
  }, []);

  return (
    <Agenda
      items={items}
      minDate={minDate}
      maxDate={maxDate}
      pastScrollRange={1}
      futureScrollRange={2}
      renderItem={Item}
      renderEmptyDate={EmptyDate}
      rowHasChanged={(a, b) => a.id !== b.id}
    />
  );
};

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
    fontWeight: "normal",
  },
  eventName: {
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 20,
    lineHeight: 20,
  },
  locationText: {
    color: "gray",
  },
  emptyDateText: {
    color: "rgb(171, 171, 171)",
  },
  knobContainer: {
    backgroundColor: "blue",
  },
});

export default CalendarScreen;
