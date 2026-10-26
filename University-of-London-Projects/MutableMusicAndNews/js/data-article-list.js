//-----------IMPORT DATA START------------------

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

//-----------IMPORT DATA END------------------


//Populate cards
for (let i = 0; i < article.length; i++)
{
    //Data structure as defined by 'handlebars' template
    var data = {
        title: article[i].title + " | " + article[i].artist,
        author: article[i].author,
        description: article[i].subTitle,
        date: article[i].date,
        thumbnail: article[i].featureIMG,
        thumbnailAlt: article[i].featureIMGalt,
        type: article[i].articleType,
        genre: article[i].genre
    }

    //Create new blank card, set relevant attributes and prepend, so that latest entry shows at the top of the screen.
    let newCard = document.createElement("div");
    newCard.setAttribute("id", "release-card-" + i);
    document.getElementById("scroll-b").prepend(newCard);

    //Now change the contents of the newly added card with the data in the template data structure
    let src = document.getElementById("handlebars-template").innerHTML;
    let template = Handlebars.compile(src);
    let render = template(data);

    //And render it out
    newCard.innerHTML = render;

    //Reset subTitle section via innerHTML to parse html tag data properly
    document.getElementById("description").innerHTML = article[i].subTitle;

    //click event listener to go to article page.
    newCard.addEventListener("click", function ()
    {
        let indextemp = i;
        //sets article ID in session storage so that the article page will know wich article to load.
        sessionStorage.setItem('articleIndex', indextemp);
    });
}