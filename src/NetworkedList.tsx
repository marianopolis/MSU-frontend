import React, { useState, useEffect } from "react";
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

const NetworkedList = ({
  getData,
  networkFailedMsg,
  listEmptyMsg,
  renderItem,
  keyExtractor,
}: {
  getData: () => Promise<any[]>;
  networkFailedMsg: string;
  listEmptyMsg: string;
  renderItem: (item: any) => any;
  keyExtractor: (item: any) => string;
}) => {
  let [data, setData] = useState<any[]>([]);
  let [failed, setFailed] = useState(false);

  // At construction, no data are loaded.
  // Thus, we're already refreshing.
  let [refreshing, setRefreshing] = useState(true);

  function refresh() {
    setRefreshing(true);

    getData()
      .then(d => {
        setData(d);
        setFailed(false);
      })
      .catch(e => {
        console.error(e);
        setFailed(true);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }

  useEffect(refresh, []);

  return (
    <View style={styles.view}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        // Make ListEmptyComponent take up entire screen.
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.viewCenter}>
            {failed ? (
              <>
                <MaterialIcon name="cloud-off" size={40} />
                <Text>{networkFailedMsg}</Text>
              </>
            ) : (
              <Text>{listEmptyMsg}</Text>
            )}
          </View>
        }
      />
    </View>
  );
};

export default NetworkedList;
