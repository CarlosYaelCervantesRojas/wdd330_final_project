import TrackDetails from "./TrackDetails.mjs";
import { getParam, renderHeaderFooter, qs } from "./utils.mjs";

renderHeaderFooter(qs("header"), qs("footer"));

const trackId = getParam("id");
const trackDetails = new TrackDetails(trackId);

trackDetails.init();