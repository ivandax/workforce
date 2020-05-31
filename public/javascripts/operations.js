//works without authentication
get("getForm") && get("getForm").addEventListener("submit", async (event)=>{
    event.preventDefault();
    get('messageGet').innerHTML = "";
    get('results').innerHTML = '';
    try{
        const data = await axiosget(endpoints.profiles, {})
        if(data){
            get('results').appendChild(create("div","Results:"));
            data.forEach((result)=>{
                get('results').appendChild(create("p",`Name: ${result.name}, Occupation: ${result.occupation}`));
            })
        }
    } catch(e){
        get('messageGet').innerHTML = "Error"+e;
    }
})

get("postForm") && get("postForm").addEventListener("submit", async (event)=>{
    event.preventDefault();
    get('messagePost').innerHTML = "";
    const name = get('name').value;
    const occupation = get('occupation').value;
    if(name && occupation){
        console.log("Attempting to post profile");
        const token = localStorage.getItem("token");
        console.log("logging token",token, typeof(token))
        try{
            const result = await axiospostToken(endpoints.profiles, {
                name: name,
                occupation: occupation
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            get('messagePost').innerHTML = "Post successful";
        } catch(e){
            console.log(e);
            get('messagePost').innerHTML = "Error in Post. Log in.";
        }
    } else{
        get('messagePost').innerHTML = "Missing inputs.";
    }
})

// get('logoutForm') && get("logoutForm").addEventListener("submit", async (event)=>{
//     event.preventDefault();
//     const token = localStorage.getItem("token");
//     console.log("logging token",token, typeof(token))
//     const headers = {
//         Authorization: `Bearer ${token}`
//     };
//     try{
//         const result = await axiosget(endpoints.logout, {}, headers)
//         if(result){
//             console.log(result);
//         }   
//     }catch(e){
//         console.log(e);
//     }
// })