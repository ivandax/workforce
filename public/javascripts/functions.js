console.log("functions");

const endpoints = {
    signup: "http://localhost:3000/users/signup",
    login: "http://localhost:3000/users/login",
    logout: "http://localhost:3000/users/logout",
}

const get = (id) => {
    return document.getElementById(id);
}

const axiosget = async (url, params) => {
    const result = await axios.get(url, {params : params});
    if(result.status === 200){
        return result.data;
    }
}

const post = async (url, params) => {
    const result = await axios.post(url, {...params});
    if(result.status === 200){
        return result.data;
    }
}

const auth = async (url, auth) => {
    const result = await axios.post(url, {headers:{
        ...auth
    }})
    return result.data;
}

get("loginForm") && get("loginForm").addEventListener("submit", async (event)=>{
    event.preventDefault();
    get('message').innerHTML = "";
    const username = get('username').value;
    const password = get('password').value;
    if(username && password){
        console.log("Attempting...");
        try{
            const data = await auth(endpoints.login, {
                username: username,
                password: password
            })
            get('message').innerHTML = data;
            console.log(data)
        } catch(e){
            get('message').innerHTML = "Error in log in. Try Create Account";
        }
    } else{
        get('message').innerHTML = "No username/password";
    }
})

get("signUpForm") && get("signUpForm").addEventListener("submit", async (event)=>{
    event.preventDefault();
    get('message').innerHTML = "";
    const username = get('username').value;
    const password = get('password').value;
    console.log(username);
    if(username && password){
        console.log("Attempting...");
        try{
            const data = await post(endpoints.signup, {
                username: username,
                password: password
            })
            console.log(data);
            get('message').innerHTML = data.status;
        } catch(e){
            get('message').innerHTML = "Error in sign up.";
        }
    } else{
        get('message').innerHTML = "No username/password";
    }
})