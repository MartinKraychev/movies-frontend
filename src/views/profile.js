import { getUserData } from '../util.js';
import {html} from '../lib.js';
import { search } from '../api/data.js';


const profileTemplate = (movies) => html`
<section id="welcome-world">

    <h1 class="display-4">My Movies</h1>


<div id="home-page">
    ${movies.length == 0 ? html `<p>No movies added yet</p>` : movies.map(movieCard)}
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

export async function profilePage(ctx) {
    const userData = getUserData()
    let username = undefined
    if(userData) {
        username = userData.username
    } ;
    const my_movies = await search('user__username', username)
    ctx.render(profileTemplate(my_movies))
}