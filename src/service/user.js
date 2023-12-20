import axios from "axios";

export class User {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_API;
  constructor() { }

  async GetUser() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}admin/users`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };
  async GetReview() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}review/token`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };

  async DeleteReview(id) {
    let data;
    const config = {
      method: "delete",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}review/${id}`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };

 async GetBooking() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}booking/`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };


}
