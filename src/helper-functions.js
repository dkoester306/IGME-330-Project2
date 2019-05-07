
//https:www.jacklmoore.com/notes/rounding-in-javascript/

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

// https://stackoverflow.com/questions/20674439/how-to-convert-meters-to-miles
function getMiles(i) {
    return i*0.000621371192;
}
// https://stackoverflow.com/questions/20674439/how-to-convert-meters-to-miles
function getMeters(i) {
    return i*1609.344;
}