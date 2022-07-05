import {login} from '../api/data.js';
import {html} from '../lib.js';

const loginTemplate = (onSubmit) => html `
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="username">Username:</label>
            <input type="username" id="username" name="username" placeholder="Username">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>
`

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)
        const username = formData.get('username').trim()
        const password = formData.get('password').trim()

        if (username === '' || password === '') {
            return alert('All fields are required')
        } else {
            await login(username, password)
            ctx.updateUserNav()
            ev.target.reset()
            ctx.page.redirect('/')
        }

    }
}