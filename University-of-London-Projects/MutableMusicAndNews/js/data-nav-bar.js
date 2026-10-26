//Code to toggle two states between the nav-menu
//Depending on the state, it will toggle between classes in order to animate and show/hide

const navToggle = () =>
{
    const mobileMenuIcon = document.getElementById("nav-drop-down-mobile-icon");
    const mobileMenu = document.getElementById("nav-list-mobile-container");

    //Sets up event listener for click
    mobileMenuIcon.addEventListener('click', function ()
    {
        if (mobileMenu.getAttribute("class") == "nav-list-mobile-container-inactive")
        {
            mobileMenu.setAttribute("class", "nav-list-mobile-container-active");
        }
        else
        {
            mobileMenu.setAttribute("class", "nav-list-mobile-container-inactive");
        }
    });
}

navToggle();