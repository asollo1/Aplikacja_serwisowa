import {deleteCookie} from 'cookies-next'

export default function Logoff(){
    deleteCookie("username"); 
    deleteCookie("password"); 
    deleteCookie("user_type"); 
    deleteCookie("id");
    window.location.href = "/";
}