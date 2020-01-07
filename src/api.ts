import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";
import Config from "react-native-config";

const DIRS = RNFetchBlob.fs.dirs;
const SERVER_URL = Config.SERVER_URL;

function route(endpoint: string) {
  return `${SERVER_URL}/api/${endpoint}`;
}

function getData(item: string): Promise<string> {
  return fetch(route(item), {
    method: "GET",
  })
    .then(r => r.json())
    .then(r => r.data);
}

export function getCongressMembers(): Promise<string> {
  return getData("congressmembers").then(r =>
    r.map(x => ({
      ...x,
    })),
  );
}

export function getPosts(): Promise<string> {
  return getData("posts").then(r =>
    r.map(x => ({
      ...x,
      inserted_at: new Date(x.inserted_at),
      updated_at: new Date(x.updated_at),
    })),
  );
}

export function getFiles(): Promise<string> {
  return getData("files").then(r =>
    r.map(x => ({
      ...x,
      inserted_at: new Date(x.inserted_at),
      updated_at: new Date(x.updated_at),
    })),
  );
}

export function getEvents(): Promise<string> {
  return getData("events").then(r =>
    r.map(x => ({
      ...x,
      start_time: new Date(x.start_time),
      end_time: new Date(x.end_time),
    })),
  );
}

export function putForm(data: {
  name: string;
  private?: boolean;
  subject: string;
  body: string;
}) {
  return fetch(route("forms"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function downloadFile(
  url: string,
  key: string,
  server_update_time: Date,
): Promise<string | undefined> {
  const path = `${DIRS.DocumentDir}/${key}`;

  return AsyncStorage.getItem(key).then((cache_update_time: string | null) => {
    //Transform string taken from storage to date object so it can be compared
    if (cache_update_time !== null) {
      const cache_date_object = new Date(cache_update_time);

      if (cache_date_object.getTime() == server_update_time.getTime()) {
        return path;
      }
    }
    RNFetchBlob.config({
      fileCache: true,
      path: path,
    })
      .fetch("GET", url)
      .then((r: any) => {
        AsyncStorage.setItem(key, server_update_time.toString());
        return path;
      });
  });
}
