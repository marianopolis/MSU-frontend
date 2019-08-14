import RNFetchBlob from "rn-fetch-blob";

const DIRS = RNFetchBlob.fs.dirs;
const SERVER_URL = process.env.SERVER_URL;

function route(endpoint) {
  return `${SERVER_URL}/api/${endpoint}`;
}

export function getPosts() {
  return fetch(route("posts"), {
    method: "GET",
  })
    .then(r => r.json())
    .then(r => r.data);
}

export function getFiles() {
  return fetch(route("files"), {
    method: "GET",
  })
    .then(r => r.json())
    .then(r => r.data);
}

/** data: {
 *    name?: string,
 *    private?: bool,
 *    subject: string,
 *    body: string,
 *  }
 */
export function putForm(data) {
  return fetch(route("forms"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function downloadFile(url, key) {
  return RNFetchBlob.config({
    fileCache: true,
    path: `${DIRS.DocumentDir}/${key}`,
  })
    .fetch("GET", url)
    .then(r => r.path());
}
