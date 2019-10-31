import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";

const DIRS = RNFetchBlob.fs.dirs;
const SERVER_URL = process.env.SERVER_URL;

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

export function getPosts(): Promise<string> {
  return getData("posts");
}

export function getFiles(): Promise<string> {
  return getData("files");
}

export function getEvents(): Promise<string> {
  return getData("events");
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
          .then((r: any) => {
            AsyncStorage.setItem(key, version);
            return path;
          }),
  );
}
