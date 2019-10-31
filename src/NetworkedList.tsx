import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, RefreshControl } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  viewCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

type NetworkedListProps = {
  getData: () => Promise<string>;
  networkFailedMsg: string;
  listEmptyMsg: string;
  renderItem: (item: any) => any;
  keyExtractor: (item: any) => string;
};

type NetworkedListStates = {
  data: any;
  failed: boolean;
  refreshing: boolean;
};

class NetworkedList extends Component<NetworkedListProps, NetworkedListStates> {
  constructor(props: NetworkedListProps) {
    super(props);
    this.state = {
      data: null,
      failed: false,
      // At construction, no data are loaded.
      // Thus, we're already refreshing.
      refreshing: true,
    };
  }

  componentDidMount = () => {
    this.refreshData();
  };

  refreshData = () => {
    this.setState({ refreshing: true });

    this.props
      .getData()
      .then(data => this.setState({ data, refreshing: false, failed: false }))
      .catch((err: any) => {
        this.setState({ refreshing: false, failed: true });
        console.error(err);
      });
  };

  render = () => (
    <View style={styles.view}>
      <FlatList
        data={this.state.data}
        renderItem={this.props.renderItem}
        keyExtractor={this.props.keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshData}
          />
        }
        // Make ListEmptyComponent take up entire screen.
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.viewCenter}>
            {this.state.failed ? (
              <>
                <MaterialIcon name="cloud-off" size={40} />
                <Text>{this.props.networkFailedMsg}</Text>
              </>
            ) : (
              <Text>{this.props.listEmptyMsg}</Text>
            )}
          </View>
        }
      />
    </View>
  );
}

export default NetworkedList;
