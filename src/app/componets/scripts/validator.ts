import { getCookie } from 'cookies-next';
export default function Validator(user_type:string){
    let user_type_cookie = getCookie('user_type');
    if(user_type_cookie!=user_type){
        return false
    } else {
        return true
    }
}