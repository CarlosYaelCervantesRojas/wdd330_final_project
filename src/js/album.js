import AlbumDetails from "./AlbumDetails.mjs";
import { getParam, renderHeaderFooter, qs } from "./utils.mjs";

renderHeaderFooter(qs("header"), qs("footer"));

const albumId = getParam("id");
const albumDetails = new AlbumDetails(albumId);

albumDetails.init();