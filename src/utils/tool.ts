//@ts-nocheck
import {message} from "antd";

export function setTitle(name: string) {
    document.title = name;
}

let messageApi = message;

export function setMessageApi(api) {
    messageApi = api;
}

export function getApi() {
    return messageApi;
}