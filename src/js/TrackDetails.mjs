import { renderWithTemplate, endpoints, fetchURL, qs, setTitle, msToMinSec, listArtists } from "./utils.mjs";

export default class TrackDetails {
    constructor(trackId) {
        this.trackId = trackId;
    }

    async init() {
        const data = await fetchURL(endpoints.baseUrl + endpoints.track + this.trackId);

        setTitle(qs("title"), `${data.name} | ${data.type}`);
        renderWithTemplate(infoTemplate(data), qs(".main__info"), "afterbegin");

    }
}

function infoTemplate(data) {
    const { min, sec } = msToMinSec(data.duration_ms);
    const trackInfo = `
    <section>
        <picture>
            <img src="${data.album.images[0].url}" alt="${data.name}">
        </picture>
        <aside>
            <p>${data.type} followers</p>
            <h1>${data.name}</h1>
            <span>
                ${listArtists(data.artists)}
                &#x2022;
                <p>${new Date(data.album.release_date).getFullYear()}</p>
                &#x2022;
                <p>${min}:${sec}</p>
            </span>
        </aside>
    </section>`;
    return trackInfo;
}