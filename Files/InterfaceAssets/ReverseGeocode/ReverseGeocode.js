/**
 * Created by Vincent Forner on 04/08/2014.
 * Reverse Geocode Interface Asset thanks to Google API
 */

ReverseGeocode.prototype = new Abstract_InterfaceAsset();

/**
 * @constructor
 */
function ReverseGeocode() {

    // IA properties
    this.additionalInformation = new AdditionalInformation();
    this.language = "Default";
    this.latitude = 51.50418;
    this.longitude = -0.0763221;
    this.formattedAddress = "";

    // Http requests management
    this.apiKey = "AIzaSyAhl4aG_A0MFuhS2W0v1Ia0C5w_A9mYaOg";
    this.httpService = intuiface.get("httpService");
    this.httpRequest = "https://maps.googleapis.com/maps/api/geocode/json?apiKey=" + this.apiKey;

    // Update result and additional information fields according to default latitude and longitude
    this._getResultAndAdditionalInformation(this.latitude, this.longitude);

    // Required for Player HTML 5
    this.defineEvents(['additionalInformationChanged', 'formattedAddressChanged', 'languageChanged', 'latitudeChanged', 'longitudeChanged']);
}

/**
 * Set property language
 * @param {string} lang
 */
ReverseGeocode.prototype.setLanguage = function (lang) {
    this.set('language', lang);
    this._getResultAndAdditionalInformation(this.latitude, this.longitude);
};

/**
 * Set property latitude
 * @param {number} lat
 */
ReverseGeocode.prototype.setLatitude = function (lat) {
    this._getResultAndAdditionalInformation(lat, this.longitude);
};

/**
 * Set property longitude
 * @param {number} lng
 */
ReverseGeocode.prototype.setLongitude = function (lng) {
    this._getResultAndAdditionalInformation(this.latitude, lng);
};

/**
 * Send a request and get result and additional information
 * @param {number} lat
 * @param {number} lng
 */
ReverseGeocode.prototype._getResultAndAdditionalInformation = function (lat, lng) {
    this.set("latitude", lat);
    this.set("longitude", lng);
    var self = this;
    var addressRequest = self._buildRequest(lat, lng);
    self.httpService.get(addressRequest, null, {
        "success": function (result) {
            self._extractDataFromJsonResponse(result);
        },
        "error": function (errorMessage) {
            console.log(errorMessage);
        }});
};

/**
 * Build a full http request with a latitude, longitude and a language
 * @param {number} lat
 * @param {number} lng
 * @returns {string}
 * @private
 */
ReverseGeocode.prototype._buildRequest = function (lat, lng) {
    return this.httpRequest + "&latlng=" + this._convertsUserLatLngToAPIformat(lat, lng) + "&language=" + GeoLanguageHandler.changeTo(this.language);
};

/**
 * Converts a latitude and longitude from user format to API expected format
 * @param {number} lat
 * @param {number} lng
 * @returns {string}
 * @private
 */
ReverseGeocode.prototype._convertsUserLatLngToAPIformat = function (lat, lng) {
    return ("" + lat + "," + lng);
};

/**
 * Extract result and additional information from the http request result
 * @param {object|string} jsonResult
 */
ReverseGeocode.prototype._extractDataFromJsonResponse = function (jsonResult) {
    var parsedResult = jsonResult;
    if (typeof (jsonResult) == "string") {
        parsedResult = JSON.parse(jsonResult);
    }
    var resultStatus = parsedResult.status;
    if (resultStatus == "OK") {
        this._extractResult(parsedResult);
        this._extractAdditionalInformation(parsedResult);
    }
    else {
        this.emit('addressNotFound', [GeoErrorHandler.errorMessage(resultStatus), this.latitude, this.longitude]);
    }
};

/**
 * Extract additional information from parsed result
 * @param {object} parsedResult
 * @private
 */
ReverseGeocode.prototype._extractAdditionalInformation = function (parsedResult) {
    this.additionalInformation.clear();
    for (var i = 0; i < parsedResult.results[0].address_components.length; i++) {
        if (this.additionalInformation.hasOwnProperty(AdditionalInformation.changeToIaPropertyName([parsedResult.results[0].address_components[i].types[0]]))) {
            this.additionalInformation.set(AdditionalInformation.changeToIaPropertyName([parsedResult.results[0].address_components[i].types[0]]), parsedResult.results[0].address_components[i].long_name)
        }
    }
    this.emit('additionalInformationChanged', [this.additionalInformation]);
};

/**
 * Extract result from parsed result
 * @param {object} parsedResult
 * @private
 */
ReverseGeocode.prototype._extractResult = function (parsedResult) {
    var adr = parsedResult.results[0].formatted_address;
    this.set('formattedAddress', adr);
    this.emit('addressFound', [this.latitude, this.longitude, adr]);
};