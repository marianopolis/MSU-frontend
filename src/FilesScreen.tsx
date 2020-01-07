import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Card } from "react-native-elements";
import FileViewer from "react-native-file-viewer";
import moment from "moment";

import { getFiles, downloadFile } from "./api";
import NetworkedList from "./NetworkedList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  fileTitle: {
    margin: 4,
    textAlign: "left",
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  fileSubtitle: {
    margin: 4,
    textAlign: "left",
    fontSize: 14,
    color: "grey",
    fontWeight: "100",
  },
});

function download(url: string, key: string, server_update_time: Date) {
  downloadFile(url, key, server_update_time).then(
    (path: string | String | undefined) => {
      FileViewer.open(`${path}`); // Hack for the error 'Argument of type 'String' is not assignable to parameter of type 'string'.'
    },
  );
}

const File = ({
  desc,
  filename,
  server_update_time,
  url,
}: {
  desc: string;
  filename: string;
  server_update_time: Date;
  url: string;
}) => (
  <TouchableOpacity
    onPress={() => {
      download(url, filename, server_update_time);
    }}
  >
    <Card containerStyle={styles.card}>
      <Text style={styles.fileTitle}>{desc}</Text>
      <Text style={styles.fileSubtitle}>
        {filename} • {moment(server_update_time).format("DD/MM/YY [at] LT")}
      </Text>
    </Card>
  </TouchableOpacity>
);

const FilesScreen = () => (
  <NetworkedList
    getData={() => getFiles()}
    networkFailedMsg="Failed to retrieve files"
    listEmptyMsg="No files"
    renderItem={({ item }) => (
      <File
        desc={item.desc}
        filename={item.key}
        server_update_time={item.updated_at}
        url={item.url}
      />
    )}
    keyExtractor={item => item.key}
  />
);

export default FilesScreen;
