import AlbumDetails from "./AlbumDetails.mjs";
import { getParam } from "./utils.mjs";

const albumId = getParam("id");
const albumDetails = new AlbumDetails(albumId);

albumDetails.init();