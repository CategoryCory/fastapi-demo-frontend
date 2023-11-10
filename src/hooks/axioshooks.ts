import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL: string = "http://localhost:5169/api";

const axiosConfig: AxiosRequestConfig = {
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
};

export default function useAxios() {
    const client: AxiosInstance = axios.create(axiosConfig);

    return client;
}
