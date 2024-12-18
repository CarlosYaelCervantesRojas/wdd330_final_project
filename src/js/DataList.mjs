import { listArtists, renderWithTemplate, trackListingTemplate, qs } from "./utils.mjs";

export default class DataList {
    constructor () {
        this.albums;
        this.artists;
        this.tracks;
    }
    setNewData(data) {
        this.albums = data.albums;
        this.artists = data.artists;
        this.tracks = data.tracks;
        this.init();
    }
    init() {
        renderWithTemplate(albumListingTemplate(this.albums.items), qs(".albums"), "afterbegin", true);
        renderWithTemplate(artistListingTemplate(this.artists.items), qs(".artists"), "afterbegin", true);
        renderWithTemplate(trackListingTemplate(this.tracks.items, "Tracks"), qs(".tracks"), "afterbegin", true);
    }

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
                    <p class="main__name">${item.name}</p>
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
                <div class="album__artist">
                    <a class="main__name" href="/album/index.html?id=${item.id}">${item.name}</a>
                    <p>${new Date(item.release_date).getFullYear()} &#x2022; ${listArtists(item.artists)}</p>
                </div>
            </a>
        </li>`;
    }).join("");
    listTemplate += "</ul>"
    return listTemplate;
}