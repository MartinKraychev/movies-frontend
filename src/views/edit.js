import { editMovieById, getAllGenres, getMovieById, getAllActors } from '../api/data.js';
import {html} from '../lib.js';

const editTemplate = (movie, onSubmit, genres, actors, movie_actors) => html `
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Edit your Movie</h1>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter movie name..." value="${movie.name}">

            <label for="Genre">Genre:</label>
            <select name="genre" id="genre" selected="${movie.genre.name}">
                ${genres.map(genre => optionTemplate(genre, movie.genre.name))}
            </select>

            <label>Actors:</label>
            <hr>
            ${actors.map(actor => html `
            <li>
                <div class="checkbox-inline">
                    <label>${actor.full_name}
                        ${movie_actors.includes(actor.full_name) ? html `<input type="checkbox" name="actors" value="${actor.id}" checked="checked">`:
                         html `<input type="checkbox" name="actors" value="${actor.id}">`}
                    </label>
                </div>
            </li>
            `)}

            <label for="poster">Poster:</label>
            <input type="text" id="poster" name="poster" placeholder="Link to the poster" value="${movie.poster}">

            <label for="trailer">Trailer:</label>
            <input type="text" id="trailer" name="trailer" placeholder="Link to the trailer" value="${movie.trailer}">

            <label for="date">Date of release:</label>
            <input type="date" id="date", name="date" value="${movie.date}">

            <input class="btn submit" type="submit" value="Edit Movie">

        </div>
    </form>
</section>
`

const optionTemplate = (genre, selected) => html `
${selected == genre.name ? html`<option name="${genre.id}" value="${genre.id}" selected="selected">${genre.name}</option>`: html `<option name="${genre.id}" value="${genre.id}">${genre.name}</option>`}

`

export async function editPage(ctx) {
    const movie = await getMovieById(ctx.params.id);
    const genres = await getAllGenres()
    const all_actors = await getAllActors()
    const movie_actors = movie.actors.map(actor => actor.full_name);
    ctx.render(editTemplate(movie, onSubmit, genres, all_actors, movie_actors))


    async function onSubmit(ev) {

        ev.preventDefault()

        const formData = new FormData(ev.target);
        const name = formData.get('name').trim();
        const genre = formData.get('genre').trim();
        const poster = formData.get('poster').trim();
        const trailer = formData.get('trailer').trim();
        const date = formData.get('date').trim();
        const actors = formData.getAll('actors')


        if (name === '' || poster === '' || trailer === '' || date === '' || actors === '') {
            return alert('All fields are required')
        };

        const obj = {
            name,
            genre,
            poster,
            trailer,
            date,
            actors
        }

        await editMovieById(ctx.params.id, 
            obj
        )

        ev.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}