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
import FileViewer from 'react-native-file-viewer';

import { getFiles, downloadFile } from "./api";

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

function download(url, key, version) {
  downloadFile(url, key, version)
    .then(path => {
      console.log(`ASS: ${path}`);
      FileViewer.open(path);
    });
}

const File = ({ desc, filename, version, time, url }) => (
  <TouchableOpacity onPress={() => { download(url, filename, version); }}>
    <Card containerStyle={styles.card}>
      <Text style={styles.fileTitle}>{desc}</Text>

      <Text style={styles.fileSubtitle}>
        {filename} • {time}
      </Text>
    </Card>
  </TouchableOpacity>
);

class FilesScreen extends Component {
  state = {
    files: null,
    refreshing: false,
  };

  constructor(props) {
    super(props);
    this.getFiles();
  }

  refresh = () => {
    this.setState({ refreshing: true });
    this.getFiles();
  }

  getFiles = () => {
    getFiles()
      .then(files => this.setState({ files, refreshing: false }))
      .catch(err => {
        console.error(err);
        this.setState({ refreshing: false });
      });
  }

  render = () => (
    <View style={styles.container}>
      {this.state.files ? (
        <FlatList
          data={this.state.files}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
          renderItem={({ item }) => (
            <File
              desc={item.desc}
              filename={item.key}
              time={item.inserted_at}
              url={item.url}
              version={item.version}
            />
          )}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

export default FilesScreen;
