export const loginAuth = (token) => {
    console.log(token);
    localStorage.setItem("Token", token);
};
  
export const logout = () => {
    localStorage.removeItem("Token");
};
  
export const isLogin = () => {
    if (localStorage.getItem("Token")) {
        return true;
    }
    return false;
};

export const getToken = () => {
    if(isLogin){
        return localStorage.getItem("Token");
    }
    else{
        return "undefined";
    }
}