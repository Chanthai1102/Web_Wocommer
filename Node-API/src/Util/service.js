exports.TOKEN_KEY = "LKJIJOPIEWRJ@#IU)(@U#)*@)#*$)LKJDSFSL:KJ12309802934910"
exports.isEmptyOrNull = (value) => {
    if(value == "" || value == null || value == undefined ){
        return true
    }
    return false
}

// https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
exports.invoiceNumber = (number) => {
    var str = "" + (number+1);
    var pad = "0000"
    var invoice = pad.substring(0, pad.length - str.length) + str;
    return "INV"+invoice; // INV0001, INV0002, INV19999
}