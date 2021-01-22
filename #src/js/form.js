window.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.querySelector('.comment_form')

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
    });
});