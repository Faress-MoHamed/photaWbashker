import axios from "axios";

export const AXIOSHANDLER = axios.create({
	baseURL: "http://localhost:8080/api",
	headers: { "X-Custom-Header": "foobar" },
});
