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
