/*
 * @Author:
 * @Date: 2022-11-10 15:20:20
 * @LastEditTime: 2022-11-10 15:25:45
 * @Description:
 */
import axios from "axios";

export function getSmartCityInfo() {
  return axios.get(
    "http://127.0.0.1:4523/m1/1903604-0-default/api/smartcity/info"
  );
}

export function getSmartCityList() {
  return axios.get(
    "http://127.0.0.1:4523/m1/1903604-0-default/api/smartcity/list"
  );
}
