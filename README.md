# IGME-330-Project2
Second and final project for IGME-330. Implements google maps API and yelp API to display restaurants in the local area with yelp reviews.

### To Do List:
- ~~radius size dropdown (Danny)~~
- ~~add price to infowindow~~
- ~~Display yelp starts for review in place of numbers (stretch goal)(Alex????)~~
- ~~save last search term in the browser local storage (firebase)~~
- ~~Add html tag that says "searching" between seaching overhead time (Danny)~~
- ~~option to disable circle (Danny)~~
- ~~add ES6 module and class somewhere.~~
- ~~add image (make sure it scales) (Alex)~~
- ~~display more info in infoWindow~~
- ~~Format InforWindow UI and other UI with CSS (Alex)~~

### Links
* https://developers.google.com/maps/documentation/javascript/examples/marker-remove
* https://developers.google.com/maps/documentation/javascript/geolocation
* https:www.jacklmoore.com/notes/rounding-in-javascript/
* https://stackoverflow.com/questions/20674439/how-to-convert-meters-to-miles
* https://stackoverflow.com/questions/14467673/enable-cors-in-htaccess
* https://www.yelp.com/developers/documentation/v3/get_started

### Grades
* Danny: **93**
* Alex: **92**

### Documentation
We first started with coming up with the idea for the project. The two of us were pretty sure we wanted to make something with Google maps, but found that using Yelp would be the best option, as the API was simple to use and easy to integrate. 

After thinking of the idea, we started the google maps integration and Vue working. We just wanted to make sure that we could get Google Maps to show up on the screen, and to get some Vue component to function properly. After we were sure that both were working, work was started on getting the Yelp Integration to work. Danny was key in getting this part of the program to work. He worked out how to get the PHP file to interact properly with the vue object, allowing the data to be nicely formatted into JSON, which was then stuck into a vue component for easy access. 

Alex helped a lot with getting the information from the JSON and structuring it withing the google maps objects. He organized how the data was set up in JS and used the InfoWindows inside of Google Maps to get the information from Yelp to show up. He also helped with the functionallity of the css formatting of them as well.


We ran into some troubles with regards to fetching the JSON from the server. This was fixed using the PHP file on MyCourses. With some additional code to that file, we were able to add additional parameters to the http call.

