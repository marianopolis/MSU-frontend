import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";
import Config from "react-native-config";

const DIRS = RNFetchBlob.fs.dirs;
const SERVER_URL = Config.SERVER_URL;

function route(endpoint: string) {
  return `${SERVER_URL}/api/${endpoint}`;
}

function getData(item: string): Promise<any[]> {
  return fetch(route(item), { method: "GET" })
    .then(r => r.json())
    .then(r => {
      // Cache the data.
      AsyncStorage.setItem(item, JSON.stringify(r.data));
      return r.data;
    })
    .catch(e => {
      // Looks like the request failed.
      // Look at the cache, and if it's empty then just
      // return the error. Otherwise, return data from cache
      return AsyncStorage.getItem(item).then(v => {
        if (v !== null) {
          return JSON.parse(v);
        } else {
          throw e;
        }
      });
    });
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

export function getCongress() {
  return getData("congress");
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

export async function download(url: string, key: string): Promise<string> {
  const path = `${DIRS.DocumentDir}/${key}`;
  const exists = await RNFetchBlob.fs.exists(path);

  if (!exists) {
    await RNFetchBlob.config({ fileCache: true, path: path }).fetch("GET", url);
  }

  return path;
}
