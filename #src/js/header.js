//====vars====//
const burgerWrapper = document.querySelector('.burger_wrapper');
const navigation = document.querySelector('.nav_wrapper');
const menuContainer = document.querySelector('.header_menu_wrapper');
const logoContainer = document.querySelector('.logo_container');
const headerContainer = document.querySelector('.header_container');
//====header====//
function activeBurger() {
    burgerWrapper.classList.toggle('btn_close');
    navigation.classList.toggle('menu_open');
    menuContainer.classList.toggle('open');
    if (menuContainer.classList.contains('open')) {
        logoContainer.classList.add('hide');
    } else {
        logoContainer.classList.remove('hide');
    };
    if (menuContainer.classList.contains('open')) {
        headerContainer.classList.add('full_screan');
    } else {
        headerContainer.classList.remove('full_screan');
    };
};
burgerWrapper.addEventListener('click', activeBurger);