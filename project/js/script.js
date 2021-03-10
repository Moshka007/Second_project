/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

--------------------------------------------------------------------------------------------

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */



"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "А-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const reklamas = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        back = document.querySelector('.promo__bg'),
        watchedFilms = document.querySelector('.promo__interactive-list'),
        addFilmForm = document.querySelector('.add'),
        addFilmInput = addFilmForm.querySelector('.adding__input'),
        chkBx = addFilmForm.querySelector('[type="checkbox"]');

    const delRekl = (reklBlock) => {
        reklBlock.forEach(item => {
            item.remove();
        });
    };

    const makeChange = (genre, back) => {
        genre.textContent = "ДРАММА";
        back.style.backgroundImage = "url('img/bg.jpg')";
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const createMovieList = (arr, element) => {
        element.innerHTML = "";

        sortArr(arr);

        arr.forEach((item, i) => {
            element.insertAdjacentHTML("beforeend",
                `<li class = "promo__interactive-item">
        ${i + 1}. ${item} 
        <div class="delete"></div> 
        </li>`);
        });

        document.querySelectorAll('.delete').forEach((item, i) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                arr.splice(i, 1);

                createMovieList(arr,element);
            });
        });
    };

    delRekl(reklamas);
    makeChange(genre, back);
    createMovieList(movieDB.movies, watchedFilms);

    addFilmForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let inpVal = addFilmInput.value;

        if (inpVal) {

            const maxNumSimbols = 21;

            if (inpVal.length > maxNumSimbols) {
                inpVal = `${inpVal.substring(0, maxNumSimbols)}...`;
            }

            if (chkBx.checked) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(inpVal);

            createMovieList(movieDB.movies, watchedFilms);
        }

        event.target.reset();
    });
});