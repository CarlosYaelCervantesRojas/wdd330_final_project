export const endpoints = {
    token: "https://accounts.spotify.com/api/token",
    search: "/search?"
};

export async function createToken() {
    const res = await fetch(endpoints.token, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_SECRET_CLIENT}`
    });
    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
}

export async function fetchURL(url, signal) {
    try {
        const res = await fetch(url, {
            signal: signal,
            headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}
        });
    
        if (res.status === 401) {
            localStorage.removeItem("access_token");
            await createToken();
        }
        const data = await res.json();
        
        return data;
    } catch (error) {
        console.log(error)
    }
}