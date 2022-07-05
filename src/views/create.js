import { createMovie, getAllGenres, getAllActors } from '../api/data.js';
import {html} from '../lib.js';

const createTemplate = (onSubmit, genres, actors) => html`
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Movie</h1>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter movie name...">

            <label for="Genre">Genre:</label>
            <select name="genre" id="genre">
                ${genres.map(genre => html `<option name="${genre.id}" value="${genre.id}">${genre.name}</option>`)}
            </select>

            <label>Actors:</label>
            <hr>
            ${actors.map(actor => html `
            <li>
                <div class="checkbox-inline">
                    <label>${actor.full_name}
                        <input type="checkbox" name="actors" value="${actor.id}">
                    </label>
                </div>
            </li>
            `)}

            <label for="poster">Poster:</label>
            <input type="text" id="poster" name="poster" placeholder="Link to the poster">

            <label for="trailer">Trailer:</label>
            <input type="text" id="trailer" name="trailer" placeholder="Link to the trailer">

            <label for="date">Date of release:</label>
            <input type="date" id="date", name="date">

            <input class="btn submit" type="submit" value="Create Movie">
        </div>
    </form>
</section>
`

export async function createPage(ctx) {
    const genres = await getAllGenres()
    const actors = await getAllActors()
    ctx.render(createTemplate(onSubmit, genres, actors));

    async function onSubmit(ev) {
        ev.preventDefault();

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

        await createMovie(
            obj
        )

        ev.target.reset();

        ctx.page.redirect('/');
    }
}