import ArtistDetails from "./ArtistDetails.mjs";
import { getParam, renderHeaderFooter, qs } from "./utils.mjs";

renderHeaderFooter(qs("header"), qs("footer"));

const artistId = getParam("id");
const artistDetails = new ArtistDetails(artistId);

artistDetails.init();