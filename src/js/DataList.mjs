import { listArtists, msToMinSec } from "./utils.mjs";

export default class DataList {
    constructor (parentElemet) {
        this.albums;
        this.artists;
        this.tracks;
        this.parentElemet = parentElemet;
    }
    setNewData(data) {
        this.albums = data.albums;
        this.artists = data.artists;
        this.tracks = data.tracks;
        this.init();
    }
    init() {
        const albums = albumListingTemplate(this.albums.items);
        const artists = artistListingTemplate(this.artists.items);
        const tracks = trackListingTemplate(this.tracks.items)

        this.parentElemet.innerHTML =  albums + artists + tracks;
    }

}

function trackListingTemplate(list) {
    let listTemplate = `
    <h2>Songs</h2>
    <table>`;
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
                <a href="/track/index.html?id=${item.id}">${item.name}</a>
                <br>
                ${listArtists(item.artists)}
            </td>
            <td>
                <p>${min}:${sec}</p>
            </td>
        </tr>`;
    }).join("");
    listTemplate += "</table>"
    return listTemplate;
}

function artistListingTemplate(list) {
    let listTemplate = `
    <h2>Artists</h2>
    <ul id="artist_list">`;
    listTemplate += list.map(item => {
        return `
        <li class="artist_container">
            <a href="/artist/index.html?id=${item.id}">
                <picture>
                    <img src="${item.images[0].url}" load="lazy">
                </picture>
                <div>
                    <p>${item.name}</p>
                </div>
            </a>
        </li>`;
    }).join("");
    listTemplate += "</ul>"
    return listTemplate;
}

function albumListingTemplate(list) {
    let listTemplate = `
    <h2>Albums</h2>
    <ul id="albums_list">`;
    listTemplate += list.map(item => {
        return `
        <li class="album_container">
            <a href="/album/index.html?id=${item.id}">
                <picture>
                    <img src="${item.images[0].url}" load="lazy">
                </picture>
                <div>
                    <a href="/?album=${item.id}">${item.name}</a>
                    <p>${new Date(item.release_date).getFullYear()}</p>
                    &#x2022;
                    ${listArtists(item.artists)}
                </div>
            </a>
        </li>`;
    }).join("");
    listTemplate += "</ul>"
    return listTemplate;
}