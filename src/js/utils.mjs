export const endpoints = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    token: "https://accounts.spotify.com/api/token",
    search: "/search?",
    album: "/albums/",
    artist: "/artists/",
    artistTopTracks: "/top-tracks",
    track: "/tracks/"
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
            return fetchURL(url);
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

    return { min, sec }
}

export function renderWithTemplate(templateFunc, parentElement, position, clear = false) {
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, templateFunc);
}

export function listArtists(list) {
    const artistsListTemplate = list.map(artist => {
        return `<a class="artist__name" href="/artist/index.html?id=${artist.id}">${artist.name}</a>`
    }).join(", ");

    return artistsListTemplate;
}

export function trackListingTemplate(list, heading) {
    let listTemplate = `
    <h2>${heading}</h2>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Title</th>
                <th><img src="/duration.svg" alt="duration"></th>
            </tr>
        </thead>
        <tbody>`;
    listTemplate += list.map(item => {
        const { min, sec } = msToMinSec(item.duration_ms);
        return `
        <tr class="track_container">
            <td>
                <a href="/track/index.html?id=${item.id}">
                    <picture>
                        <img src="${item.album.images[0].url}" load="lazy">
                    </picture>
                </a>
            </td>
            <td>
                <a class="main__name" href="/track/index.html?id=${item.id}">${item.name}</a>
                <br>
                ${listArtists(item.artists)}
            </td>
            <td>
                <p>${min}:${sec}</p>
            </td>
        </tr>`;
    }).join("");
    listTemplate += `</tbody></table>`
    return listTemplate;
}

function headerTemplate() {
    const template = `
    <nav>
        <a href="/">
          <img src="/home.svg" alt="home">
        </a>
    </nav>`;

    return template;
}
function footerTemplate() {
    const template = `
    <div>
        <span>Sources from: </span>
       <a href="https://developer.spotify.com/" target="_blank">Spotify Web API</a>
    </div>`;

    return template;
}

export function renderHeaderFooter(header, footer) {
    renderWithTemplate(headerTemplate(), header, "afterbegin");
    renderWithTemplate(footerTemplate(), footer, "afterbegin");
}