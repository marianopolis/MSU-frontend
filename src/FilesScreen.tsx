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

import { getFiles, downloadFile } from "./api";
import NetworkedList from "./NetworkedList.js";

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

function download(url: string, key: string, version: string) {
  downloadFile(url, key, version).then(path => {
    FileViewer.open(`${path}`); // Hack for the error 'Argument of type 'String' is not assignable to parameter of type 'string'.'
  });
}

const File = ({
  desc,
  filename,
  version,
  time,
  url,
}: {
  desc: string;
  filename: string;
  version: string;
  time: string;
  url: string;
}) => (
  <TouchableOpacity
    onPress={() => {
      download(url, filename, version);
    }}
  >
    <Card containerStyle={styles.card}>
      <Text style={styles.fileTitle}>{desc}</Text>
      <Text style={styles.fileSubtitle}>
        {filename} • {time}
      </Text>
    </Card>
  </TouchableOpacity>
);

const FilesScreen = () => (
  <NetworkedList
    getData={() => getFiles()}
    networkFailedMsg="Failed to retrive files"
    listEmptyMsg="No files"
    renderItem={({ item }) => (
      <File
        desc={item.desc}
        filename={item.key}
        time={item.inserted_at}
        url={item.url}
        version={item.version}
      />
    )}
    keyExtractor={item => item.key}
  />
);

export default FilesScreen;
