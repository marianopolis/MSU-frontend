import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";

const DIRS = RNFetchBlob.fs.dirs;

function route(endpoint: string): string {
  return `${process.env.SERVER_URL}/api/${endpoint}`;
}

function getData(item: string): Promise<string> {
  return fetch(route(item), {
    method: "GET",
  })
    .then(r => r.json())
    .then(r => r.data);
}

export type NotifAction = null | "POST_ADDED";
export interface NotifData {
  action: NotifAction;
  postID?: string;
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
  version: string,
): Promise<String> {
  const path = `${DIRS.DocumentDir}/${key}`;

  return AsyncStorage.getItem(key).then((val: any) =>
    val === version
      ? path
      : RNFetchBlob.config({
          fileCache: true,
          path: path,
        })
          .fetch("GET", url)
          .then(_ => {
            AsyncStorage.setItem(key, version);
            return path;
          }),
  );
}

export function registerPushToken(token: string, os: string): Promise<boolean> {
  return fetch(route("push"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, os }),
  }).then(r => r.ok);
}
