import { listTemplate } from "./utils.mjs";

export default class DataList {
    constructor (parentElemet) {
        this.albums;
        this.artists;
        this.tracks;
        this.parentElemet = parentElemet;
    }
    setNewData(data) {
        console.log(data);
        this.albums = data.albums;
        this.artists = data.artists;
        this.tracks = data.tracks;
        this.init();
    }
    init() {
        const albums = listTemplate(this.albums.items);
        const artists = listTemplate(this.artists.items);
        // const tracks = listTemplate(this.tracks.items)

        this.parentElemet.innerHTML = albums + artists;
    }

}