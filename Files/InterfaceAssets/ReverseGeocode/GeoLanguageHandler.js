/**
 * Created by Vincent Forner on 03/09/2014.
 */

var GeoLanguageHandler = function () {
};

GeoLanguageHandler.changeTo = function (newLanguage) {
    var languageArray = {};
    languageArray["Default"] = "";
    languageArray["English"] = "en";
    languageArray["French"] = "fr";
    languageArray["German"] = "de";
    languageArray["Italian"] = "it";
    languageArray["Spanish"] = "es";
    languageArray["Dutch"] = "nl";

    return languageArray[newLanguage];
};