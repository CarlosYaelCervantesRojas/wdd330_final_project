import { endpoints, fetchURL, msToMinSec, qs, setTitle } from "./utils.mjs";

export default class AlbumDetails {
    constructor(albumId) {
        this.albumId = albumId;
    }

    async init() {
        const data = await fetchURL(endpoints.baseUrl + endpoints.album + this.albumId);
        console.log(data);

        setTitle(qs("title"), data.name)
        const albumInfoTem = infoTemplate(data);
        const body = qs("main")
        body.innerHTML = albumInfoTem;
    }
}

function infoTemplate(data) {
    const durationMs = data.tracks.items.reduce((total, track) => total + track.duration_ms, 0);
    const { min, sec } = msToMinSec(durationMs);
    const albumInfoTem = `
    <section>
        <picture>
            <img src="${data.images[0].url}" alt="${data.name}">
        </picture>
        <aside>
            <p>${data.album_type}</p>
            <h1>${data.name}</h1>
            ${
                data.artists.map(artist => {
                    return `<a href="/?artist=${artist.id}">${artist.name}</a>`
                }).join(", ")
            }
            &#x2022;
            <span>
                ${new Date(data.release_date).getFullYear()}
                &#x2022;
                ${data.total_tracks} tracks, ${min} min ${sec} s
            </span>
        </aside>
    </section>`;
    return albumInfoTem;
}