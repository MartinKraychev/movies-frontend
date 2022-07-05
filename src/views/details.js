import {  deleteMovieById, getMovieById, sendRating } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';


const detailsTemplate = (movie, userId, actors, onDelete, onSubmit) => html`
<section id="game-details">
    <h1>Movie Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${movie.poster} />
            <h1>${movie.name}</h1>
            <p class="type">${movie.genre.name}</p>
            <a href=${movie.trailer}>Trailer</a>
            <p>Rating: ${movie.average_rating}</p>
            <p>Date of release: ${movie.date}</p>
            <p>Actors: ${actors.join(', ')}</p>
            ${userId ? ratingTemplate(onSubmit, movie): null}
        </div>
        
        <!-- Buttons depending on user is owner or not -->
        ${movie.user.id == userId ? html `<div class="buttons">
            <a href="/edit/${movie.id}" class="button">Edit</a>
            <a @click =${onDelete} href="javascript: void(0)" class="button">Delete</a>
        </div>` : null}

</section>    
`

const ratingTemplate = (onSubmit, movie) => html `
${movie.is_rated ? html`<p>You already rated this movie</p>`
: html `
<form @submit=${onSubmit} id="edit">
    <div class="container">
        <p>Rate movie:</p>
        <select name="rating" id="rating" selected="0">
            <option name="1" value="1">1</option>
            <option name="2" value="2">2</option>
            <option name="3" value="3">3</option>
            <option name="4" value="4">4</option>
            <option name="5" value="5">5</option>
        </select>
    </div>
    <input class="btn submit" type="submit" value="Send your rating">
</form>
`}
`


export async function detailsPage(ctx) {
    const userData = getUserData();
    const movie = await getMovieById(ctx.params.id);
    const actors = movie.actors.map(actor => actor.full_name);
    

    let userId = undefined
    if(userData) {
        userId = userData.id
    } ;


    ctx.render(detailsTemplate(movie, userId, actors, onDelete, onSubmit))


    async function onDelete() {
        await  deleteMovieById(ctx.params.id)
        ctx.page.redirect('/')
    }

    async function onSubmit(ev) {

        ev.preventDefault()

        const formData = new FormData(ev.target);
        const vote = formData.get('rating').trim();

        await sendRating({
            movie:movie.id,
            vote
        })

        ev.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }

}