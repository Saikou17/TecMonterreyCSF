import {fetchUtils} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL
);

// const fetchJsonUtil = (url, options={})=>{
//   if(!options.headers){
//       options.headers=new Headers({Accept: "application/json"})
//   }
//   options.headers.set("Authentication", localStorage.getItem("auth"));
//   return fetchUtils.fetchJson(url, options);
// };

// export const dataProvider = jsonServerProvider("http://127.0.0.1:1337",fetchJsonUtil);
