/**
 * Created by Vincent Forner on 05/08/2014.
 */

function Abstract_InterfaceAsset() {
}

Abstract_InterfaceAsset.prototype = new EventEmitter();

Abstract_InterfaceAsset.prototype.set = function (propertyName, newPropertyValue) {
    if (this[propertyName] != newPropertyValue) {
        this[propertyName] = newPropertyValue;
        var eventPropertyChanged = propertyName + 'Changed';
        this.emit(eventPropertyChanged, [newPropertyValue]);
    }
};
