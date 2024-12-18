import { renderWithTemplate, endpoints, fetchURL, listArtists, msToMinSec, qs, setTitle } from "./utils.mjs";

export default class AlbumDetails {
    constructor(albumId) {
        this.albumId = albumId;
    }

    async init() {
        const data = await fetchURL(endpoints.baseUrl + endpoints.album + this.albumId);

        setTitle(qs("title"), `${data.album_type} | ${data.name}`)
        renderWithTemplate(infoTemplate(data), qs(".main__info"), "afterbegin");
        renderWithTemplate(tracksTemplate(data.tracks), qs(".tracks__table"), "afterbegin");
    }
}

function tracksTemplate(tracks) {
    const tracksListTemp = tracks.items.map(track => {
        const { min, sec } = msToMinSec(track.duration_ms);
        return `
            <tr>
                <td>
                    ${track.track_number}
                </td>
                <td>
                    <a class="main__name" href="/track/index.html?track=${track.id}">${track.name}</a>
                    <span> &#x2022; ${listArtists(track.artists)}
                    </span>
                </td>
                <td>
                    ${min}:${sec}
                </td>
            </tr>`
    }).join("");
    return tracksListTemp;
}

function infoTemplate(data) {
    const durationMs = data.tracks.items.reduce((total, track) => total + track.duration_ms, 0);
    const { min, sec } = msToMinSec(durationMs);
    const albumInfoTem = `
        <picture>
            <img src="${data.images[0].url}" alt="${data.name}">
        </picture>
        <aside>
            <p>${data.album_type}</p>
            <h1>${data.name}</h1>
            ${listArtists(data.artists)}
            &#x2022;
            <span>
                ${new Date(data.release_date).getFullYear()}
                &#x2022;
                ${data.total_tracks} ${data.total_tracks == 1 ? "track" : "tracks"}, ${min} min ${sec} s
            </span>
        </aside>`;
    return albumInfoTem;
}