export const loginAuth = (user) => {
    localStorage.setItem("USER", user);
};
  
export const logout = () => {
    localStorage.removeItem("USER");
};
  
export const isLogin = () => {
    if (localStorage.getItem("USER")) {
        return true;
    }
    return false;
};