import { renderWithTemplate, endpoints, fetchURL, qs, setTitle, trackListingTemplate } from "./utils.mjs";

export default class ArtistDetails {
    constructor(artistId) {
        this.artistId = artistId;
    }

    async init() {
        const baseData = await fetchURL(endpoints.baseUrl + endpoints.artist + this.artistId);
        const topTracks = await fetchURL(endpoints.baseUrl + endpoints.artist + this.artistId + endpoints.artistTopTracks);

        setTitle(qs("title"), `${baseData.name} | ${baseData.type}`);
        renderWithTemplate(infoTemplate(baseData), qs(".main__info"), "afterbegin");

        renderWithTemplate(trackListingTemplate(topTracks.tracks, "Top Tracks"), qs(".tracks"), "afterbegin");
    }
}

function infoTemplate(data) {
    const artistInfo = `
    <section>
        <picture>
            <img src="${data.images[0].url}" alt="${data.name}">
        </picture>
        <aside>
            <h1>${data.name}</h1>
            <p>${data.followers.total} followers</p>
            <span>
                Genres: 
                <ul>
                ${data.genres.map(genr => `<p>${genr}</p>`).join("")}
                </ul>
            </span>
        </aside>
    </section>`;
    return artistInfo;
}