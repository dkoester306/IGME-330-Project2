import {FireBaseLoader} from './load-firebase.js';
// base url for accessing YELP API. File must be run through Banjo. Append endpoints to the this.
const BASE_URL = "https://people.rit.edu/dsk6539/330/yelp/yelp-proxy.php?";
let fBase = new FireBaseLoader("");
let app = new Vue({
    el: "#root",
    data: {
        term: "",
        result: {}
    },
    methods: {
        getSearchData() {
            console.log("In Search Term");

            // get the term from the Vue Object --
            // get the initial lat and lng from Google Maps
            let termString = "term=" + this.term;
            let locString = "latitude=" + map.getCenter().lat() + "&" + "longitude=" + map.getCenter().lng();

            let qString = termString + "&" + locString;
            //console.log(BASE_URL + qString);

            if (this.term.length < 1) {
                return;
            }

            let xhr = new XMLHttpRequest();

            // 6 - set the onload handler
            xhr.onload = this.dataLoaded;

            // 7 - set the onerror handler
            xhr.onerror = this.dataError;

            // 8 - open connection and send the request
            xhr.open("GET", BASE_URL + qString);
            xhr.send();
            // structure for code from VUE HOMEWORK PART 2
            // THIS DOES NOT WORK... "CORB blocked cross-origin response ... with MIME type application/type"
            // fetch(BASE_URL + qString,{mode:"no-cors"})
            //     .then(response=>{
            //         if(!response.ok){
            //             throw Error(`Error: ${response.statusText}`);
            //         }
            //         return response;
            //     })
            //     .then(json=>{
            //         console.log(json);
            //         this.result = json;
            //     })
        },
        dataLoaded(e) {
            // 1 - e.target is the xhr object
            let xhr = e.target;

            // 2 - xhr.responseText is the JSON file we just downloaded
            console.log(xhr.responseText);

            // 3 - turn the text into a parsable JavaScript object
            let obj = JSON.parse(xhr.responseText);

            this.result = obj;

            // delete markers after new search (NOT SURE IF I SHOULD STORE PAST MARKERS, IN CASE SOMEONE WANTS TO SEE THEIR PAST SEARCHES)
            deleteMarkers();
            // created markers for all of the places found from the search
            for(let i = 0;i<this.result.businesses.length;i++){

                addMarker(this.result.businesses[i]);
            }

            // add term to firebase
            
            fBase.addTerm(this.term);
        },
        dataError(e) {
            console.log("An error occurred");
        },
    }
})