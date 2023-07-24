import axios from "axios";

export const headers = (config) => {
  return {
    "X-Authorization": "sk_test_533177223946e38b96739d5f093791f330f4fbb99d8ac",
    Accept: "application/json",
    "Content-Type": "application/json",
    ...config,
  };
};

export const ApiService = {
  fetch(url, config = {}) {
    return axios({
      method: "get",
      url: `${url}`,
      headers: headers(config),
    })
      .then((response) => response.data);
  },
};
