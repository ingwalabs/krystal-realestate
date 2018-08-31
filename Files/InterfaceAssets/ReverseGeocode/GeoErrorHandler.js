/**
 * Created by Vincent Forner on 06/08/2014.
 */

var GeoErrorHandler = function () {
};

GeoErrorHandler.errorMessage = function (requestStatus) {
    switch (requestStatus) {
        case "ZERO_RESULTS":
            return "Geocode was successful but returned no results.\nThis may occur if the geocoder was passed a non-existent address.";
        case "OVER_QUERY_LIMIT":
            return "Over query limit";
        case "REQUEST_DENIED":
            return "Request denied";
        case "INVALID_REQUEST":
            return "Invalid request.\nQuery (address, components or latitude/longitude) is missing";
        default:
            return "Unknown Error";
    }
};