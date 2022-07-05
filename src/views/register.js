import { register } from '../api/data.js';
import {html} from '../lib.js';


const registerTemplate =(onSubmit) => html `
<section id="register-page" class="content auth">
    <form @submit=${onSubmit} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="username">Username:</label>
            <input type="username" id="username" name="username" placeholder="Username">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>
`

export function registerPage(ctx) {
    
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('confirm-password').trim();

        if (username === '' || password === '') {
            return alert('All fields are required!')
        };

        if (password !== repeatPass) {
            return alert('Password must match!')
        };

        await register(username, password)
        ctx.updateUserNav();
        ev.target.reset();
        ctx.page.redirect('/login');
        
    }
}