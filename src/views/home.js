import { getAllMovies } from '../api/data.js';
import {html} from '../lib.js';


const homeTemplate = (movies) => html`
<section id="welcome-world">

<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
    <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
        class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
    <h1 class="display-4">Movies</h1>
    <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>


<div id="home-page">
    ${movies.length == 0 ? html `<p class="no-articles">No movies added yet</p>` : movies.map(movieCard)}
</div>
</section>
`

const movieCard = (movie) => html`
<div class="game">
    <div class="image-wrap">
        <img src=${movie.poster}>
    </div>
    <h3>${movie.name}</h2>
    <h2>${movie.genre.name}</h3>
    ${movie.actors.map(actorCard)}
    <div class="data-buttons">
        <a href="/details/${movie.id}" class="btn details-btn">Details</a>
    </div>
</div>
`

const actorCard = (actor) => html `
<p>${actor.full_name}</p>
`

export async function homePage(ctx) {
    const movies = await getAllMovies()
    ctx.render(homeTemplate(movies))
}