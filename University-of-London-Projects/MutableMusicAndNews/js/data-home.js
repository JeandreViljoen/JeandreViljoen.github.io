import { Article } from "./article.js";

//array used to store Article class objects
let article = [];

//temporary storage for the JSON file contents before it gets converted in to the class array
let articleDatabaseObject;

//Import JSON
await fetch("./js/articleDatabase.json")
    .then(response =>
    {
        return response.json();
    })
    .then(data =>
    {
        articleDatabaseObject = data;
    });

//Create instances of Article class
for (const temp of articleDatabaseObject.articles)
{
    //populate article array with Article class instances
    article.push(new Article(temp.date, temp.articleType, temp.title, temp.subTitle, temp.artist, temp.author, temp.featureIMG, temp.featureIMGalt, temp.featureVideoURL, temp.description, temp.smLinkFacebook, temp.smLinkInstagram, temp.smLinkYoutube, temp.genre));
}


import { Event } from "./event.js";

//array used to store Event class objects
let event = [];

//temporary storage for the JSON file contents before it gets converted in to the class array
let eventDatabaseObject;

//Import JSON
await fetch("./js/events-database.json")
    .then(response =>
    {
        return response.json();
    })
    .then(data =>
    {
        eventDatabaseObject = data;
    });

for (const temp of eventDatabaseObject.events)
{
    //populate events array with Article class instances
    event.push(new Event(temp.title, temp.description, temp.date, temp.time, temp.venue, temp.address, temp.posterURL, temp.posterAlt, temp.ticketPrice, temp.disclaimer));
}

//-----------IMPORT DATA END------------------


//Initialise article index to latest article (to show on the page)
sessionStorage.setItem('articleIndex', article.length - 1);

//Set carousel image sources from the last 3 articles
document.getElementById("carousel-01-img").src = article[article.length - 3].featureIMG;
document.getElementById("carousel-02-img").src = article[article.length - 6].featureIMG;
document.getElementById("carousel-03-img").src = article[article.length - 7].featureIMG;

//Set carousel image alt attributes from the last 3 articles
document.getElementById("carousel-01-img").setAttribute('alt', article[article.length - 3].featureIMGalt);
document.getElementById("carousel-02-img").setAttribute('alt', article[article.length - 6].featureIMGalt);
document.getElementById("carousel-03-img").setAttribute('alt', article[article.length - 7].featureIMGalt);

//Set titles and link the carousel images for the last 3 articles
document.getElementById("carousel-01-a").setAttribute('href', article[article.length - 3].featureIMG);
document.getElementById("carousel-01-a").setAttribute('title', article[article.length - 3].title);
document.getElementById("carousel-02-a").setAttribute('href', article[article.length - 6].featureIMG);
document.getElementById("carousel-02-a").setAttribute('title', article[article.length - 6].title);
document.getElementById("carousel-03-a").setAttribute('href', article[article.length - 7].featureIMG);
document.getElementById("carousel-03-a").setAttribute('title', article[article.length - 7].title);

//Blueimp, 'Gallery 3.3.0', 2021
//https://github.com/blueimp/Gallery
//Borrowed code for the carousel
blueimp.Gallery(document.getElementById('links').getElementsByTagName('a'), {
    container: '#blueimp-gallery-carousel',
    carousel: true
})

document.getElementById('links').onclick = function (event)
{
    event = event || window.event
    var target = event.target || event.srcElement
    var link = target.src ? target.parentNode : target
    var options = { index: link, event: event }
    var links = this.getElementsByTagName('a')
    blueimp.Gallery(links, options)
}
//end of borrowed code

//let carouselContainer = document.getElementById("carousel-button");
//carouselContainer.addEventListener('click', () =>
//{
//   location.href = "./article-list.html"

//});

//Invisible button on top of the carousel to link the user to the article page if they click on the carousel
//let homepageArticleButton = document.getElementById("news-btn");
//homepageArticleButton.addEventListener('click', () => { location.href = "./article-list.html" });

//hot section Populate the featured card with the latest article and set up buttons to take the user to the full article
document.getElementById("homepage-hot-feature-img").src = article[article.length - 1].featureIMG;
document.getElementById("homepage-hot-feature-text-title").innerHTML = "' " + article[article.length - 1].subTitle + "'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - <i>" + article[article.length - 1].author + "</i>";

document.getElementById("homepage-hot-feature-text-artist").innerHTML = article[article.length - 1].artist + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + article[article.length - 1].articleType
document.getElementById("homepage-hot-feature-text-genre").innerHTML = article[article.length - 1].genre;

//Events section - populates the 3 event posters with the latest 3 events and sets the alt attributes of the images
document.getElementById("event-showcase-01").src = event[event.length - 1].posterURL;
document.getElementById("event-showcase-01").setAttribute('alt', event[event.length - 1].posterAlt);
document.getElementById("event-showcase-02").src = event[event.length - 2].posterURL;
document.getElementById("event-showcase-02").setAttribute('alt', event[event.length - 2].posterAlt);
document.getElementById("event-showcase-03").src = event[event.length - 3].posterURL;
document.getElementById("event-showcase-03").setAttribute('alt', event[event.length - 3].posterAlt);


//Get the 3 posters to set event listeners
let showcase01container = document.getElementById("event-showcase-01-container");
let showcase02container = document.getElementById("event-showcase-02-container");
let showcase03container = document.getElementById("event-showcase-03-container");

//Event listeners for each poster

// //mouse over to change CSS class and open up the full image
// //and click to take the user to the events page
// showcase01container.addEventListener('mouseover', () => { showcase01container.setAttribute('class', "event-showcase-container-active") });
// showcase01container.addEventListener('mouseleave', () => { showcase01container.setAttribute('class', "event-showcase-container-inactive") });
// showcase01container.addEventListener('click', () => { location.href = "./events.html" });

// //mouse over to change CSS class and open up the full image
// //and click to take the user to the events page
// showcase02container.addEventListener('mouseover', () => { showcase02container.setAttribute('class', "event-showcase-container-active") });
// showcase02container.addEventListener('mouseleave', () => { showcase02container.setAttribute('class', "event-showcase-container-inactive") });
// showcase02container.addEventListener('click', () => { location.href = "./events.html" });

// //mouse over to change CSS class and open up the full image
// //and click to take the user to the events page
// showcase03container.addEventListener('mouseover', () => { showcase03container.setAttribute('class', "event-showcase-container-active") });
// showcase03container.addEventListener('mouseleave', () => { showcase03container.setAttribute('class', "event-showcase-container-inactive") });
// showcase03container.addEventListener('click', () => { location.href = "./events.html" });

