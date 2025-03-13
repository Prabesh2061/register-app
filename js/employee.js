import { createAccount, loginWIthEmailAndPassword, getEmployeeData } from '../data/database.js';

var loginInfo = JSON.parse(localStorage.getItem('login'));
let isLoggedIn = loginInfo ? loginInfo.isLoggedIn : false;

if (isLoggedIn){
    const loggedInEmployee = loginInfo.employeeData;
    renderLoggedIn(loggedInEmployee);
}else{
    renderLogin();
}

function renderLogin(){
    const loginHTML = `
        <h2>Login</h2>
        <form>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email">
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

    document.querySelector('.js-login').addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const employeeId = await loginWIthEmailAndPassword(email, password);
        if(employeeId){
            const employeeData = await getEmployeeData(employeeId);
            localStorage.setItem('login', JSON.stringify({isLoggedIn: true, employeeData}));
            renderLoggedIn(employeeData);
        }
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
                <label for="email">Email:</label>
                <input type="email" name="email" id="email">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password">
            </div>
            <div class="form-group">
                <label for="password2">Confirm Password:</label>
                <input type="password" name="password2" id="password2">
            </div>
            <button type="submit" class="js-register">Register</button>
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
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        
        if(validateFields(name, email, password, password2)){
            document.querySelector('.history').innerText = "Registration successful!";
            const pin = '0000';
            const punchStatus = {
                isPunchedIn: false,
                lastPunch: ''
            }
            createAccount(name, email, password, pin, punchStatus);
            renderLogin();
        }
    });
}

function validateFields(name, email, password, password2){
    if(!name || !email || !password || !password2){
        document.querySelector('.history').innerText = "All the fields must be filled";
        return false;
    }
    if(password !== password2){
        document.querySelector('.history').innerText = "Password didn't match";
        return false;
    }
    return true;
}

async function renderLoggedIn(employee){
    let employeeData = await employee;
    const loggedInHTML = `
        <h2>You have logged in as ${employeeData.name}</h2>
        <form>
            <div class="form-group">
                Turn on the cash
            </div>
            <div class="form-group">Start your shift and punch in <a href="punch.html">Punch In</a></div>
            <div class="form-group">Change your pin <a href="#">Change Pin</a></div>
        </form>
        <button class="js-logout">Logout</button>
    `;

    document.querySelector('.js-current').innerHTML = loggedInHTML;

    document.querySelector('.js-logout').addEventListener('click', () => {
        localStorage.setItem('login', JSON.stringify({isLoggedIn: false}));
        renderLogin();
    });
}