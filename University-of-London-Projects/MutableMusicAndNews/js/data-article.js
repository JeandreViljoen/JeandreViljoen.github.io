//-----------IMPORT DATA START------------------

import { Article } from "./article.js";

//array used to store Article class objects
let article = [];
let index = sessionStorage.getItem('articleIndex');

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

//-----------IMPORT DATA END------------------

//Updates page title to show artist name
document.title = "Article | " + article[index].artist + " | Mutable: Music & News";

//Fills in the template with appropriate data
document.getElementById("title").innerHTML = article[index].title;
document.getElementById("sub-title").innerHTML = article[index].subTitle;
document.getElementById("author-date").innerHTML = article[index].author + " - " + article[index].date;
document.getElementById("type").innerHTML = article[index].articleType + " - " + article[index].artist;
document.getElementById("description").innerHTML = article[index].description;
document.getElementById("article-feature-image").src = article[index].featureIMG;
document.getElementById("article-feature-image").setAttribute('alt', article[index].featureIMGalt);
document.getElementById("article-feature-video").src = article[index].featureVideoURL;
document.getElementById("facebook-link").setAttribute('href', article[index].smLinkFacebook);
document.getElementById("instagram-link").setAttribute('href', article[index].smLinkInstagram);
document.getElementById("youtube-link").setAttribute('href', article[index].smLinkYoutube);

