const authMw = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    authToken === null && history.push('/login');
}

export default authMw;