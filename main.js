document.addEventListener('DOMContentLoaded', (event) => {
    const movies = document.querySelectorAll('.movie');
    let selectedSeats = [];

    movies.forEach(movie => {
        const movieClickHandler = (event) => {
            // Stop other listeners of the same event from being called
            event.stopImmediatePropagation();

            // Get the movie title from the data attribute
            const movieTitle = movie.querySelector('h3').textContent;
            console.log(`Movie clicked: ${movieTitle}`);
            selectedSeats = [];
            // Reset all other movies to their original state
            movies.forEach(m => {
                if (m !== movie) {
                    const movieId = m.getAttribute('data-movie');
                    let originalContent;

                    switch (movieId) {
                        case 'fellowship':
                            originalContent = `
                                <img src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28828_p_v8_ao.jpg" alt="The Fellowship of the Ring">
                                <h3>The Fellowship of the Ring <span class="info-icon">(i)</span></h3>
                            `;
                            break;
                        case 'towers':
                            originalContent = `
                                <img src="https://resizing.flixster.com/msqvXCa81MSPEJ1gLPIgrm4vd8Q=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p30793_p_v8_am.jpg" alt="The Two Towers">
                                <h3>The Two Towers <span class="info-icon">(i)</span></h3>
                            `;
                            break;
                        case 'king':
                            originalContent = `
                                <img src="https://image.tmdb.org/t/p/original/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg" alt="The Return of the King">
                                <h3>The Return of the King <span class="info-icon">(i)</span></h3>
                            `;
                            break;
                    }

                    m.innerHTML = originalContent;

                    // Reattach the movie click event listener
                    m.removeEventListener('click', movieClickHandler);
                    m.addEventListener('click', movieClickHandler);

                    // Reattach the info icon click event listener
                    const infoIcon = m.querySelector('.info-icon');
                    infoIcon.addEventListener('click', (event) => {
                        event.stopPropagation();
                        showMovieInfo(movieId);
                    });
                }
            });

            // Display the schedule for the clicked movie
            const movieId = movie.getAttribute('data-movie');
            let schedule;
            let movieImg;

            switch (movieId) {
                case 'fellowship':
                    movieImg = `<img src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28828_p_v8_ao.jpg" alt="The Fellowship of the Ring">`;
                    schedule = `
                        ${movieImg}
                        <p>Available Dates:</p>
                        <div class="date" data-date="oct17">October 17, 2024</div>
                        <div class="date" data-date="oct18">October 18, 2024</div>
                        <div class="date" data-date="oct19">October 19, 2024</div>
                    `;
                    break;
                case 'towers':
                    movieImg = `<img src="https://resizing.flixster.com/msqvXCa81MSPEJ1gLPIgrm4vd8Q=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p30793_p_v8_am.jpg" alt="The Two Towers">`;
                    schedule = `
                        ${movieImg}
                        <p>Available Dates:</p>
                        <div class="date" data-date="oct20">October 20, 2024</div>
                        <div class="date" data-date="oct21">October 21, 2024</div>
                        <div class="date" data-date="oct22">October 22, 2024</div>
                    `;
                    break;
                case 'king':
                    movieImg = `<img src="https://image.tmdb.org/t/p/original/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg" alt="The Return of the King">`;
                    schedule = `
                        ${movieImg}
                        <p>Available Dates:</p>
                        <div class="date" data-date="oct23">October 23, 2024</div>
                        <div class="date" data-date="oct24">October 24, 2024</div>
                        <div class="date" data-date="oct25">October 25, 2024</div>
                    `;
                    break;
                default:
                    schedule = '<p>No schedule available.</p>';
            }

            movie.innerHTML = schedule;

            // Attach event listeners to the new date elements
            attachDateEventListeners(movie, schedule, movieClickHandler, movieImg);
        };

        // Attach the movie click event listener only once
        movie.addEventListener('click', movieClickHandler);

        // Attach the info icon click event listener
        const infoIcon = movie.querySelector('.info-icon');
        infoIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            const movieId = movie.getAttribute('data-movie');
            showMovieInfo(movieId);
        });
    });

    function attachDateEventListeners(movie, schedule, movieClickHandler, movieImg) {
        const dates = movie.querySelectorAll('.date');
        dates.forEach(date => {
            date.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the movie click event from firing
                const dateId = date.getAttribute('data-date');
                let hours;
                let dateTitle = date.textContent;

                switch (dateId) {
                    case 'oct17':
                    case 'oct18':
                    case 'oct19':
                    case 'oct20':
                    case 'oct21':
                    case 'oct22':
                    case 'oct23':
                    case 'oct24':
                    case 'oct25':
                        hours = `
                            ${movieImg}
                            <h4>${dateTitle}</h4>
                            <table>
                                <tr><td class="hour" data-hour="21:00">21:00</td></tr>
                            </table>
                            <button class="back-button">Back to Dates</button>
                        `;
                        break;
                    default:
                        hours = '<p>No hours available.</p>';
                }

                // Replace the movie content with the hours and back button
                movie.innerHTML = hours;

                // Remove the movie click event listener
              //  movie.removeEventListener('click', movieClickHandler);

                // Attach event listener to the back button
                const backButton = movie.querySelector('.back-button');
                backButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent the movie click event from firing
                    movie.innerHTML = schedule;
                    attachDateEventListeners(movie, schedule, movieClickHandler, movieImg); // Reattach event listeners
                    movie.addEventListener('click', movieClickHandler); // Reattach movie click event
                });

                // Attach event listener to the hour
                const hour = movie.querySelector('.hour');
                hour.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent the movie click event from firing
                    showSeatMap(movie, dateTitle, hour.textContent, schedule, movieClickHandler, movieImg);
                });
            });
        });
    }

    function showSeatMap(movie, dateTitle, hour, schedule, movieClickHandler, movieImg) {
        const seatMap = `
            ${movieImg}
            <h4>${dateTitle} - ${hour}</h4>
            <div class="screen">Screen</div>
            <div class="seats">
                <div class="seat rotate-right" style="position: absolute; top: 29px; left: -8px;" data-seat="1">1</div>
                <div class="seat rotate-right" style="position: absolute; top: 54px; left: 5px;" data-seat="2">2</div>
                <div class="sofa-border" style="position: absolute; top: 81px; left: 28px; width: 115px; height: 21px; border: 1px solid #000;">
                    <div class="seat" style="position: absolute; top: 0; left: 0;" data-seat="3">3</div>
                    <div class="seat" style="position: absolute; top: 0; left: 26px;" data-seat="4">4</div>
                    <div class="seat" style="position: absolute; top: 0; left: 52px;" data-seat="5">5</div>
                    <div class="seat" style="position: absolute; top: 0; left: 78px;" data-seat="6">6</div>
                    <div class="seat" style="position: absolute; top: 0; left: 104px;" data-seat="7">7</div>
                </div>
                <div class="seat rotate-left" style="position: absolute; top: 53px; left: 161px;" data-seat="8">8</div>
                <div class="seat rotate-left" style="position: absolute; top: 28px; left: 172px;" data-seat="9">9</div>
            </div>
            <button class="back-button">Back to Hours</button>
            <button class="pay-button">Pay</button>
        `;

        // Replace the movie content with the seat map and back button
        movie.innerHTML = seatMap;

        // Attach event listener to the back button
        const backButton = movie.querySelector('.back-button');
        backButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the movie click event from firing
            movie.innerHTML = `
                ${movieImg}
                <h4>${dateTitle}</h4>
                <table>
                    <tr><td class="hour" data-hour="21:00">21:00</td></tr>
                </table>
                <button class="back-button">Back to Dates</button>
            `;
            attachDateEventListeners(movie, schedule, movieClickHandler, movieImg); // Reattach event listeners
            movie.addEventListener('click', movieClickHandler); // Reattach movie click event
        });

        // Attach event listener to the seats
        const seats = movie.querySelectorAll('.seat');
        seats.forEach(seat => {
            seat.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the movie click event from firing
                const seatNumber = seat.getAttribute('data-seat');
                if (selectedSeats.includes(seatNumber)) {
                    selectedSeats = selectedSeats.filter(s => s !== seatNumber);
                    seat.style.backgroundColor = '#ddd'; // Deselect seat
                } else {
                    selectedSeats.push(seatNumber);
                    seat.style.backgroundColor = '#bbb'; // Select seat
                }
                updatePayButtonState();
            });
        });

       // Attach event listener to the pay button
       const payButton = movie.querySelector('.pay-button');
       payButton.addEventListener('click', (event) => {
           event.stopPropagation(); // Prevent the movie click event from firing
           if (selectedSeats.length > 0) {
               showPaymentPopup(selectedSeats);
           }
       });

       function updatePayButtonState() {
           if (selectedSeats.length > 0) {
               payButton.disabled = false;
           } else {
               payButton.disabled = true;
           }
       }
   }

    function showPaymentPopup(selectedSeats) {
        const totalAmount = selectedSeats.length * 45;
        const seatsList = selectedSeats.join(', ');

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-button">&times;</span>
                <h2>Payment for Seats: ${seatsList}</h2>
                <p>Total: ${totalAmount} shekels</p>
                <div id="timer">05:00</div>
                <form>
                    <label for="card-number">Card Number:</label>
                    <input type="text" id="card-number" name="card-number" required>
                    <label for="expiry-date">Expiry Date:</label>
                    <input type="text" id="expiry-date" name="expiry-date" required>
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" required>
                    <button type="submit">Pay</button>
                </form>
            </div>
        `;
        document.body.appendChild(popup);

        // Close button event listener
        const closeButton = popup.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
        });

        // Timer
        let timeLeft = 300;
        const timerElement = document.getElementById('timer');
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.body.removeChild(popup);
                alert('Time is up! Please try again.');
            } else {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                timeLeft--;
            }
        }, 1000);

        // Handle form submission
        const form = popup.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Kfir stole all your money');
            location.reload(); // Refresh the screen
        });
    }

    function showMovieInfo(movieId) {
        let movieInfo;

        switch (movieId) {
            case 'fellowship':
                movieInfo = {
                    title: 'The Fellowship of the Ring',
                    description: 'A young hobbit, Frodo, is tasked with destroying a powerful ring.',
                    time: '228 minutes (Extended Version)',
                    rating: '8.8/10'
                };
                break;
            case 'towers':
                movieInfo = {
                    title: 'The Two Towers',
                    description: 'Frodo and Sam continue their journey to Mordor, while their friends face Saruman\'s forces.',
                    time: '235 minutes (Extended Version)',
                    rating: '8.7/10'
                };
                break;
            case 'king':
                movieInfo = {
                    title: 'The Return of the King',
                    description: 'The final confrontation between the forces of good and evil fighting for control of Middle-earth.',
                    time: '263 minutes (Extended Version)',
                    rating: '8.9/10'
                };
                break;
            default:
                movieInfo = {
                    title: 'Unknown',
                    description: 'No description available.',
                    time: 'N/A',
                    rating: 'N/A'
                };
        }

        const popup = document.createElement('div');
        popup.classList.add('info-popup');
        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-button">&times;</span>
                <h4>${movieInfo.title}</h4>
                <p><strong>Description:</strong> ${movieInfo.description}</p>
                <p><strong>Time:</strong> ${movieInfo.time}</p>
                <p><strong>Rating:</strong> ${movieInfo.rating}</p>
            </div>
        `;
        document.body.appendChild(popup);

        // Close button event listener
        const closeButton = popup.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    }
});