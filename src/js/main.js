import DataList from "./DataList.mjs";
import { createToken, endpoints, fetchURL } from "./utils.mjs";
const baseUrl = import.meta.env.VITE_BASE_URL;

const accesToken = localStorage.getItem("access_token");

if (!accesToken) {
    await createToken();
}

const search = document.getElementById("search");
const content = document.getElementById("content");

const dataListing = new DataList(content);
let abortController;
search.addEventListener("input", async (e) => {

    if (e.target.value !== "") {

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();
        const signal = abortController.signal;
    
        const data = await fetchURL(`${baseUrl}${endpoints.search}q=${e.target.value}&type=album,artist,track&limit=5`, signal); 
        if (data) {
            dataListing.setNewData(data);
        }
    }
});