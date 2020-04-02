import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";
import Config from "react-native-config";

const DIRS = RNFetchBlob.fs.dirs;
const SERVER_URL = Config.SERVER_URL;

function route(endpoint: string) {
  return `${SERVER_URL}/api/${endpoint}`;
}

function getData(item: string): Promise<any[]> {
  return fetch(route(item), {
    method: "GET",
  })
    .then(r => r.json())
    .then(r => r.data);
}

export function getPosts(): Promise<any[]> {
  return getData("posts").then(r =>
    r.map(x => ({
      ...x,
      inserted_at: new Date(x.inserted_at),
      updated_at: new Date(x.updated_at),
    })),
  );
}

export function getFiles(): Promise<any[]> {
  return getData("files").then(r =>
    r.map(x => ({
      ...x,
      inserted_at: new Date(x.inserted_at),
      updated_at: new Date(x.updated_at),
    })),
  );
}

export function getResources(): Promise<any[]> {
  return getData("resources").then(r =>
    r.map(x => ({
      ...x,
      inserted_at: new Date(x.inserted_at),
      updated_at: new Date(x.updated_at),
    })),
  );
}

/** Events in Google Calendar format.
 */
export function getCalendar(): Promise<any> {
  return getData("calendar").then(data =>
    data.map(event => ({
      ...event,
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
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

function apiDownload(
  url: string,
  key: string,
  version: string,
  namespace: "image" | "file",
): Promise<string> {
  const path = `${DIRS.DocumentDir}/${namespace}_${key}`;

  return AsyncStorage.getItem(key).then((val: any) =>
    val === version
      ? path
      : RNFetchBlob.config({
          fileCache: true,
          path: path,
        })
          .fetch("GET", url)
          .then((_r: any) => {
            AsyncStorage.setItem(key, version);
            return path;
          }),
  );
}

export function downloadFile(
  url: string,
  key: string,
  version: string,
): Promise<string> {
  return apiDownload(url, key, version, "file");
}

export function downloadImage(
  url: string,
  key: string,
  version: string,
): Promise<string> {
  return apiDownload(url, key, version, "image");
}
