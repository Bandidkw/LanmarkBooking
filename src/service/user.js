import axios from "axios";

export class User {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_LOTTO;
  constructor() {}

  async GetUser() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/admin/users`,
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
  }




}
