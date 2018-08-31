/**
 * Created by Vincent Forner on 04/09/2014.
 */

function AdditionalInformation() {
    this.country = "";
    this.locality = "";
    this.sublocality = "";
    this.administrativeAreaLvl1 = "";
    this.administrativeAreaLvl2 = "";
    this.postalCode = "";
    this.streetNumber = "";
    this.route = "";

}

AdditionalInformation.prototype.set = function (propertyName, newPropertyValue) {
    this[propertyName] = newPropertyValue;
};

AdditionalInformation.prototype.clear = function () {
    this.country = "";
    this.locality = "";
    this.sublocality = "";
    this.administrativeAreaLvl1 = "";
    this.administrativeAreaLvl2 = "";
    this.postalCode = "";
    this.streetNumber = "";
    this.route = "";
};

AdditionalInformation.changeToIaPropertyName = function (apiName) {
    var APItoIApropertyName = {};
    APItoIApropertyName["country"] = "country";
    APItoIApropertyName["locality"] = "locality";
    APItoIApropertyName["sublocality_level_1"] = "sublocality";
    APItoIApropertyName["administrative_area_level_1"] = "administrativeAreaLvl1";
    APItoIApropertyName["administrative_area_level_2"] = "administrativeAreaLvl2";
    APItoIApropertyName["postal_code"] = "postalCode";
    APItoIApropertyName["street_number"] = "streetNumber";
    APItoIApropertyName["route"] = "route";

    return APItoIApropertyName[apiName];
};