import {html} from '../lib.js';
import { search } from '../api/data.js';


const searchTemplate = (onSubmit, movies) => html `
<section id="searchPage">
    <form @submit=${onSubmit} id="search">
        <div class="search">
            <label for="genre">Search by::</label>
            <select name="genre" id="genre">
                <option name="name" value="name">Movie name</option>
                <option name="genre__name" value="genre__name">Genre name</option>
                <option name="actors__first_name" value="actors__first_name">Actor first name</option>
                <option name="actors__last_name" value="actors__last_name">Actor last name</option>
            </select>
            <label for="value">Enter key word:</label>
            <input type="text" id="value" name="value">

            <input class="btn submit" type="submit" value="Search">
        </div>

    </form>

    <h2>Results:</h2>
    ${movies == undefined ? null : searchAfterClick(movies)}

</section>
`

const searchAfterClick = (movies) => html`

<div class="search-result">
${movies.length == 0 ? html `<p class="no-result">No result.</p>` : movies.map(m => movieCard(m))}      
</div>
`

const movieCard = (movie) => html `
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
</div>` 

const actorCard = (actor) => html `
<p>${actor.full_name}</p>
`


export async function searchPage(ctx){
    let movies = undefined
    ctx.render(searchTemplate(onSubmit, movies))

    async function onSubmit(ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target);
        const field = formData.get('genre').trim();
        const value = formData.get('value').trim();
        if (value == '') {
            return alert('Please fill the search area')
        }
        
        movies = await search(field, value)
        ev.target.reset();  
        ctx.render(searchTemplate(onSubmit, movies))
        
    }
}
