import DataList from "./DataList.mjs";
import { createToken, endpoints, fetchURL, qs, renderHeaderFooter } from "./utils.mjs";

renderHeaderFooter(qs("header"), qs("footer"));

const accesToken = localStorage.getItem("access_token");

if (!accesToken) {
    (async () => {
        await createToken();
    })();
}

const search = document.getElementById("search");

const dataListing = new DataList();
let abortController;
search.addEventListener("input", async (e) => {
    const userInput = encodeURIComponent(e.target.value).trim();

    if (userInput) {

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();
        const signal = abortController.signal;
    
        const data = await fetchURL(`${endpoints.baseUrl}${endpoints.search}q=${userInput}&type=album,artist,track&limit=5`, signal); 
        
        if (data) {
            dataListing.setNewData(data);
        }
    }
});