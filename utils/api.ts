import axios from "~/node_modules/axios";
import * as Types from "~/types/api";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000/api";
  // baseURL = "http://192.168.0.242:44011/api";
} else {
  // baseURL = "http://healthylink.co.kr:44010/api";
  baseURL = "https://localhost:5001/api";
}

const instance = axios.create({
  baseURL,
  headers: {
    Pragma: "no-cache",
  },
  withCredentials: true,
  timeout: 10000,
});

class Api {
  static getBaseUrl() {
    return baseURL;
  }

  private static ResponsePayload(res: any): Types.Response {
    if (res.data && res.data.status) {
      return res.data;
    } else {
      return {
        status: res.status,
        code: 200,
        data: res.data.data,
      };
    }
  }
  private static ErrorPayload(err: any): Types.Response {
    if (err.response && err.response.status != 200) {
      return {
        status: false,
        code: err.response.status,
        //[${err.response.statusText}] ${err.message}
        data: `${err.response.data.data}`,
      };
    } else {
      return err.response.data;
    }
  }
  public static async get(uri: string, params?: any, headers?: any) {
    try {
      const res = await instance.get(`${uri}`, { params, headers });
      return Api.ResponsePayload(res);
    } catch (err) {
      return Api.ErrorPayload(err);
    }
  }

  public static async post(uri: string, data?: any, headers?: any) {
    try {
      const res = await instance.post(`${uri}`, data, { headers });
      return Api.ResponsePayload(res);
    } catch (err) {
      return Api.ErrorPayload(err);
    }
  }

  public static async put(uri: string, data?: any, headers?: any) {
    try {
      const res = await instance.put(`${uri}`, data, { headers });
      return Api.ResponsePayload(res);
    } catch (err) {
      return err;
    }
  }

  public static async del(uri: string, params?: any, headers?: any) {
    try {
      const res = await instance.delete(`${uri}`, { params, headers });
      return Api.ResponsePayload(res);
    } catch (err) {
      return err;
    }
  }

  public static async formPost(uri: string, data: any, auto: boolean = true) {
    try {
      let formData = new FormData();
      if (auto) {
        for (var key in data) {
          if (Array.isArray(key)) {
            formData.append(`${key}[]`, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      } else {
        formData = data;
      }
      return Api.post(uri, formData, { "Content-Type": "multipart/form-data" });
    } catch (err) {
      return err;
    }
  }
  public static async formPut(uri: string, data: any, auto: boolean = true) {
    try {
      let formData = new FormData();
      if (auto) {
        for (var key in data) {
          if (Array.isArray(key)) {
            formData.append(`${key}[]`, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      } else {
        formData = data;
      }
      return Api.put(uri, formData, { "Content-Type": "multipart/form-data" });
    } catch (err) {
      return err;
    }
  }
}

export default Api;
