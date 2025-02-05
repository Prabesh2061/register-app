import { employee } from "../data/employee-data.js";

renderLogin();

function renderLogin(){
    const loginHTML = `
        <h2>Login</h2>
        <form>
            <div class="form-group">
                <label for="user">Username:</label>
                <input type="text" name="user" id="user">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="passsword" id="password">
            </div>
            <button class="js-login">Login</button>
        </form>
        <div class="history">
            If you don't have an account click the register button
        </div>
        <button class="js-register">Register</button>
    `;
    document.querySelector('.js-current').innerHTML = loginHTML;

    document.querySelector('.js-register').addEventListener('click', () => {
        renderRegister();
    });

    document.querySelector('.js-login').addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        employee.forEach((e) => {
            if (username === e.username && password === e.password) {
                console.log("You have logged in");
            }else{
                console.log("Username or password didn't match");
            }
        });
    });
}

function renderRegister(){
    const registerHTML = `
        <h2>Register</h2>
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" id="name">
            </div>
            <div class="form-group">
                <label for="user">Email:</label>
                <input type="email" name="user" id="user">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="passsword" id="password">
            </div>
            <div class="form-group">
                <label for="password2">Confirm Password:</label>
                <input type="password" name="passsword2" id="password2">
            </div>
            <button class="js-register">Register</button>
        </form>
        <div class="history">
            If you already have an account click the login button
        </div>
        <button class="js-login">Login</button>
    `;
    document.querySelector('.js-current').innerHTML = registerHTML;
    
    document.querySelector('.js-login').addEventListener('click', () => {
        renderLogin();
    });

    document.querySelector('.js-register').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('New Employee Registered');
    });
}