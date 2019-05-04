// Initialize Firebase
class FireBaseLoader {
    constructor(term) {
        this.term = term;
        this.config = {
            apiKey: "AIzaSyDM88Wk-Yxyv4bQW6wrctsAJFitRzoC0i8",
            authDomain: "high-scores-a4672.firebaseapp.com",
            databaseURL: "https://high-scores-a4672.firebaseio.com",
            projectId: "high-scores-a4672",
            storageBucket: "high-scores-a4672.appspot.com",
            messagingSenderId: "758954708036"
        };
        firebase.initializeApp(this.config);
    }
    addTerm(term) {
        this.term = term;
        
        let database = firebase.database();

        let ref = database.ref("searchTerms");

        let data ={
            searchTerm: this.term
        }

        let termRef = ref.push(data);
    }
}

