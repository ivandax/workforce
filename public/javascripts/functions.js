console.log("functions");

const endpoints = {
    signup: "http://localhost:3000/users/signup",
    login: "http://localhost:3000/users/login",
    // logout: "http://localhost:3000/users/logout",
    profiles: "http://localhost:3000/profiles"
}

const get = (id) => {
    return document.getElementById(id);
}

const create = (tag, text) => {
    var node = document.createElement(tag);                       // Create a <p> node
    var t = document.createTextNode(text);      // Create a text node
    node.appendChild(t);
    return node;
}

const axiosget = async (url, params) => {
    const result = await axios.get(url, {params : params});
    if(result.status === 200){
        return result.data;
    }
}

const axiospost = async (url, params) => {
    const result = await axios.post(url, {...params});
    if(result.status === 200){
        return result.data;
    }
}

const axiospostToken = async (url, params, config) => {
    const result = await axios.post(url, {...params}, config);
    if(result.status === 200){
        return result.data;
    }
}

// const axiosauth = async (url, auth) => {
//     const result = await axios.post(url, {headers:{
//         ...auth
//     }})
//     return result.data;
// }

get("loginForm") && get("loginForm").addEventListener("submit", async (event)=>{
    event.preventDefault();
    get('message').innerHTML = "";
    const username = get('username').value;
    const password = get('password').value;
    if(username && password){
        console.log("Attempting to login");
        try{
            const data = await axiospost(endpoints.login, {
                username: username,
                password: password
            })
            localStorage.setItem("token", data.token);
            get('message').innerHTML = data.status;
            //console.log(data)
            window.location.href = "http://localhost:3000/operations.html"
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
            const data = await axiospost(endpoints.signup, {
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