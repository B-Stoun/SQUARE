const wrap = document.querySelectorAll(".portfolio_item_wrapper_column");
const popup = document.querySelector(".portfolio_popup_sliders");
const closePopup = document.querySelector('.btn_close_popup');
const blur = document.querySelectorAll('.bg_blur_active');
const bodyContainer = document.querySelector('.auto');

if (wrap, closePopup) {
    wrap.forEach((function (elem) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            elem.addEventListener('click', function () {
                if (!elem.classList.contains('bg_blur_active')) {
                    elem.classList.add('bg_blur_active');
                } else {
                    addActive(elem, popup, bodyContainer, elem);
                }
            });
        } else {
            elem.addEventListener('mouseover', function () {
                if (!elem.classList.contains('bg_blur_active')) {
                    elem.classList.add('bg_blur_active');
                }
            });
            elem.addEventListener('mouseout', function () {
                elem.classList.remove('bg_blur_active')
            });
            elem.addEventListener('click', function () {
                if (elem.classList.contains('bg_blur_active')) {
                    addActive(elem, popup, bodyContainer, elem);
                }
            });
        }
    }));

    function addActive(elem, popup, body, item) {
        elem.classList.add('open_popup');
        popup.classList.add('portfolio_popup_sliders_open');
        body.classList.add('full_size');
        item.classList.remove('bg_blur_active');
    }

    closePopup.addEventListener('click', function () {
        wrap.forEach((function (elem) {
            elem.classList.remove('bg_blur_active');
            elem.classList.remove('open_popup');
        }));
        popup.classList.remove('portfolio_popup_sliders_open');
        bodyContainer.classList.remove('full_size');
    })
}