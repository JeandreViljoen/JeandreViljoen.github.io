//-----------IMPORT DATA START------------------

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

//populate containers
for (let i = 0; i < event.length; i++)
{
    //Data structure as defined by 'handlebars' template
    var data = {
        poster: event[i].posterURL,
        posterAlt: event[i].posterAlt,
        venue: event[i].venue,
        address: event[i].address,
        date: event[i].date,
        time: event[i].time,
        price: event[i].ticketPrice,
        title: event[i].title,
        description: event[i].description,
        disclaimer: event[i].disclaimer
    };

    //Create new blank card, set relevant attributes and prepend, so that latest entry shows at the top of the screen.
    let newEventCard = document.createElement("div");
    newEventCard.setAttribute("id", "event-card-" + i);
    newEventCard.setAttribute("class", "event-card");
    document.getElementById("scroll-b").prepend(newEventCard);

    //Now change the contents of the newly added card with the data in the template data structure
    let src = document.getElementById("handlebars-template").innerHTML;
    let template = Handlebars.compile(src);
    let render = template(data);

    //And render it out
    newEventCard.innerHTML = render;

    //Reset subTitle section via innerHTML to parse html tag data properly
    document.getElementById("description").innerHTML = event[i].description;

}
