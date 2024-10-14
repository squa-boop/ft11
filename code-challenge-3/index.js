// src/index.js

document.addEventListener("DOMContentLoaded", () => {
    fetchMovieDetails(1); 
    fetchAllMovies();     // Fetch all movies to populate the sidebar
  });
  
  function fetchMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
      .then((response) => response.json())
      .then((movie) => displayMovieDetails(movie));
  }
  
  function displayMovieDetails(movie) {
    const poster = document.querySelector("#poster");
    const title = document.querySelector("#title");
    const runtime = document.querySelector("#runtime");
    const showtime = document.querySelector("#showtime");
    const availableTickets = document.querySelector("#available-tickets");
  
    poster.src = movie.poster;
    title.textContent = movie.title;
    runtime.textContent = `${movie.runtime} minutes`;
    showtime.textContent = movie.showtime;
  
    // Calculate available tickets
    const available = movie.capacity - movie.tickets_sold;
    availableTickets.textContent = available > 0 ? available : "Sold Out";
  
    // Set the "Buy Ticket" button state
    const buyButton = document.querySelector("#buy-ticket");
    if (available > 0) {
      buyButton.disabled = false;
      buyButton.textContent = "Buy Ticket";
      buyButton.addEventListener("click", () => buyTicket(movie));
    } else {
      buyButton.disabled = true;
      buyButton.textContent = "Sold Out";
    }
  }
  


