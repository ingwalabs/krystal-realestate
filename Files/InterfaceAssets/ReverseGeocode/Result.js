/**
 * Created by Vincent Forner on 04/09/2014.
 */

function Result() {
    this.latitude = 37.42291810;
    this.longitude = -122.08542120;
    this.formattedAddress = "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA";
}

Result.prototype.set = function (lat, lng, adr) {
    this.latitude = lat;
    this.longitude = lng;
    this.formattedAddress = adr;
};