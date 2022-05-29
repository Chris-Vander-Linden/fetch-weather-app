export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint = "") {
    return this._fetchHelper(endpoint);
  }
  post(endpoint = "", body) {
    return this._fetchHelper(endpoint, "POST", body);
  }
  put(endpoint = "", body) {
    return this._fetchHelper(endpoint, "PUT", body);
  }
  delete(endpoint = "", body) {
    return this._fetchHelper(endpoint, "DELETE", body);
  }

  _fetchHelper(endpoint, method = "GET", body) {
    let payload;

    method !== "GET" ? payload = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body)
    } : payload = "";

    return fetch(this.baseURL + endpoint, {
      method,
      payload
    }).then(response => {
      if (!response.ok) {
        throw new Error("There was a problem with the server.");
      }
      return response.json();
    });
  }
}