document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = 'http://localhost:3000/films';
    const posterImg = document.getElementById('poster');
    const titleEl = document.getElementById('title');
    const runtimeEl = document.getElementById('runtime');
    const showtimeEl = document.getElementById('showtime');
    const descriptionEl = document.getElementById('film-info');
    const availableTicketsEl = document.getElementById('ticket-num');
    const buyTicketBtn = document.getElementById('buy-ticket');
    const filmsMenu = document.getElementById('films');
    let availableTickets = 0;
    let currentFilmId = 1; 

    function loadMovieDetails(filmId) {
        fetch(`${baseUrl}/${filmId}`)
            .then(response => response.json())
            .then(film => {
                currentFilmId = film.id;
                posterImg.src = film.poster;
                titleEl.textContent = film.title;
                runtimeEl.textContent = `${film.runtime} minutes`;
                showtimeEl.textContent = film.showtime;
                descriptionEl.textContent = film.description;

                availableTickets = film.capacity - film.tickets_sold;
                availableTicketsEl.textContent = `${availableTickets} remaining tickets`;

                if (availableTickets === 0) {
                    buyTicketBtn.disabled = true;
                    buyTicketBtn.textContent = "Sold Out";
                } else {
                    buyTicketBtn.disabled = false;
                    buyTicketBtn.textContent = "Buy Ticket";
                }
            })
            .catch(error => console.error('Error:', error));
    }

    loadMovieDetails(1);

    fetch(baseUrl)
        .then(response => response.json())
        .then(films => {
            filmsMenu.innerHTML = '';

            films.forEach(film => {
                const li = document.createElement('li');
                li.textContent = film.title;
                li.classList.add('film', 'item');
                li.setAttribute('data-id', film.id);

                li.addEventListener('click', () => {
                    loadMovieDetails(film.id);
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add('ui', 'red', 'button', 'mini');
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    fetch(`${baseUrl}/${film.id}`, {
                        method: 'DELETE',
                    })
                    .then(() => {
                        li.remove();
                    })
                    .catch(error => console.error('Error:', error));
                    
                });

                li.appendChild(deleteBtn);
                filmsMenu.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));

    buyTicketBtn.addEventListener('click', () => {
        if (availableTickets > 0) {
            availableTickets--;
            availableTicketsEl.textContent = `${availableTickets} remaining tickets`;

            fetch(`${baseUrl}/${currentFilmId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tickets_sold: film.capacity - availableTickets,
                }),
            })
            .then(() => {
                if (availableTickets === 0) {
                    buyTicketBtn.disabled = true;
                    buyTicketBtn.textContent = "Sold Out";

                    const movieInMenu = document.querySelector(`#films li[data-id="${currentFilmId}"]`);
                    movieInMenu.classList.add('sold-out');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
