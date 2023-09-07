// import axios from "axios";
// import { message } from "antd";
//
// export const config = {
//     base_server : "http://localhost:8081/api/",
//     image_path:"",
//     version:1
// }
// export const request = (url,method,param,new_token=null) => {
//     var  access_token = getAccessToken();
//     if(new_token != null){
//         access_token = new_token
//     }
//     return axios({
//         url:config.base_server + url,
//         method:method,
//         data:param,
//     }).then(res=>{
//         return res.data;
//     }).catch(err=>{
//         var status = err.response?.status
//         if(status == 404){
//             message.error("Route Not Found!")
//         }
//         return false
//     }).finally(final=>{
//         console.log("final",final)
//     })
// }
