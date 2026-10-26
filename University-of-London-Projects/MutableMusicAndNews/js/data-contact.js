
//get Form and form buttons to be used to switch classes to disable and enable different forms

let enquireFormHeader = document.getElementById("enquire-form-title-container");
let enquireFormElements = document.getElementById("enquire-form-element-container");

let newsFormHeader = document.getElementById("news-form-title-container");
let newsFormElements = document.getElementById("news-form-element-container");

let eventsFormHeader = document.getElementById("events-form-title-container");
let eventsFormElements = document.getElementById("events-form-element-container");


//First form: Enquire: Sets click event listener
enquireFormHeader.addEventListener("click", function ()
{
    //If already open - onclick: just close it again (done by switching CSS classes)
    if (enquireFormHeader.getAttribute("class") == "form-title-container-active")
    {
        enquireFormHeader.setAttribute('class', 'form-title-container-inactive');
        enquireFormElements.setAttribute('class', "form-element-container-inactive");
    }
    //If NOT open, then open it and close all the other forms (done by switching CSS classes)
    else
    {
        enquireFormHeader.setAttribute('class', 'form-title-container-active');
        enquireFormElements.setAttribute('class', "form-element-container-active");

        newsFormHeader.setAttribute('class', 'form-title-container-inactive');
        newsFormElements.setAttribute('class', "form-element-container-inactive");

        eventsFormHeader.setAttribute('class', 'form-title-container-inactive');
        eventsFormElements.setAttribute('class', "form-element-container-inactive");

    }

});

//Second form: Submit music and news: Sets click event listener
newsFormHeader.addEventListener("click", function ()
{
    //If already open - onclick: just close it again (done by switching CSS classes)
    if (newsFormHeader.getAttribute("class") == "form-title-container-active")
    {
        newsFormHeader.setAttribute('class', 'form-title-container-inactive');
        newsFormElements.setAttribute('class', "form-element-container-inactive");
    }
    //If NOT open, then open it and close all the other forms (done by switching CSS classes)
    else
    {
        enquireFormHeader.setAttribute('class', 'form-title-container-inactive');
        enquireFormElements.setAttribute('class', "form-element-container-inactive");

        newsFormHeader.setAttribute('class', 'form-title-container-active');
        newsFormElements.setAttribute('class', "form-element-container-active");

        eventsFormHeader.setAttribute('class', 'form-title-container-inactive');
        eventsFormElements.setAttribute('class', "form-element-container-inactive");

    }

});

//Third form: Submit Events: Sets click event listener
eventsFormHeader.addEventListener("click", function ()
{
    //If already open - onclick: just close it again (done by switching CSS classes)
    if (eventsFormHeader.getAttribute("class") == "form-title-container-active")
    {
        eventsFormHeader.setAttribute('class', 'form-title-container-inactive');
        eventsFormElements.setAttribute('class', "form-element-container-inactive");
    }
    //If NOT open, then open it and close all the other forms (done by switching CSS classes)
    else
    {
        enquireFormHeader.setAttribute('class', 'form-title-container-inactive');
        enquireFormElements.setAttribute('class', "form-element-container-inactive");

        newsFormHeader.setAttribute('class', 'form-title-container-inactive');
        newsFormElements.setAttribute('class', "form-element-container-inactive");

        eventsFormHeader.setAttribute('class', 'form-title-container-active');
        eventsFormElements.setAttribute('class', "form-element-container-active");

    }

});
