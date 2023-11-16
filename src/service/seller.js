import axios from "axios";

export class Seller {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_LOTTO;
  constructor() {}

  async GetMember() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/admin/sellers`,
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

  async ConfirmSeller(_id) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/admin/sellers/edit/${_id}`,
      data: {
        status: "อนุมัติ",
      },
    };
  
    try {
      const result = await axios(config);
      if (result && result.data) {
        data = result.data;
      }
    } catch (error) {
      data = error;
    }
  
    return data;
  }
  
  async CancelSeller(_id) {
    let data;
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}/admin/sellers/edit/${_id}`,
      data: {
        status: "ยกเลิก",
      },
    };
  
    try {
      const result = await axios(config);
      if (result && result.data) {
        data = result.data;
      }
    } catch (error) {
      data = error;
    }
  
    return data;
  }

}
