import {render, page} from './lib.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from "./views/home.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { profilePage } from './views/profile.js'
import { searchPage } from './views/search.js';


const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logingOut);


page(decorateContext);
page('/', homePage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/profile', profilePage);
page('/search', searchPage);

updateUserNav();
page.start();



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav
    next()
}


function updateUserNav() {
    const userData = getUserData()
    if (userData !== null) {
        document.getElementById('user').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
        document.getElementById('message').innerHTML = `Hello ${userData.username}`
    } else {
        document.getElementById('user').style.display =  'none'
        document.getElementById('guest').style.display = 'block'
    }
}


async function logingOut() {
    await logout()
    updateUserNav()
    page.redirect('/')
}

