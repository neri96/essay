const setUserData = (userData: any) => {
    console.log(JSON.stringify(userData));
    
    localStorage.setItem('userData', JSON.stringify(userData));
}

const getUserData = () => {
    const userData = localStorage.getItem('userData');
    
    return userData ? JSON.parse(userData) : null;
}

const removeUserData = () => {
    localStorage.removeItem('userData');
}

export { setUserData, getUserData, removeUserData }