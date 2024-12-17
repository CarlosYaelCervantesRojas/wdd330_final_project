export const endpoints = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    token: "https://accounts.spotify.com/api/token",
    search: "/search?",
    album: "/albums/"
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

        if (res.ok) {
            const data = await res.json();
        
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const paramId = urlParam.get(param);
    return paramId;
}

export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function setTitle(parentElement, title) {
    parentElement.innerHTML += title;
}

export function msToMinSec(milisec) {
    const min = Math.floor(milisec/60000);
    const s = Math.floor((milisec % 60000)/1000);
    const sec = s < 10 ? `0${s}` : s;

    return {min, sec}
}

export function listArtists(list) {
    const artistsListTemplate = list.map(artist => {
        return `<a href="/?artist=${artist.id}">${artist.name}</a>`
    }).join(", ");

    return artistsListTemplate;
}