import axios from "axios";

export const headers = () => {
  return {
    "X-Authorization": "sk_test_533177223946e38b96739d5f093791f330f4fbb99d8ac",
    Accept: "application/json",
    "Content-Type": "application/json"
  };
};

export const ApiService = {
  fetch(url) {
    return axios({
      method: "GET",
      url: `${url}`,
      headers: headers(),
    }).then((response) => response.data);
  },

  post(url, data = {}) {
    const body = JSON.stringify(data);
    return axios({
      method: "POST",
      url: `${url}`,
      headers: headers(),
      data: body,
    }).then((response) => response.data);
  },
};
