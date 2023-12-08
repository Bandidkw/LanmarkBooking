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

  async GetTimeLineAdmin() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}log/admin`,
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

  async GetTimeLinePartner() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}log/partner`,
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

  async GetTimeLineMember() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}log/member`,
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
