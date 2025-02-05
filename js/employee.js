import { employee, addNewEmployee } from "../data/employee-data.js";

var loginInfo = JSON.parse(localStorage.getItem('login'));

if(!loginInfo){
    isLoggedIn = false;
}else{
    var isLoggedIn = loginInfo.isLoggedIn;
}

if (isLoggedIn){
    const loggedInEmployee = loginInfo.employeeInfo;
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

    document.querySelector('.js-login').addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(login(email, password)){
            console.log('You have logged in');
        }else{
            console.log("Email or password didn't match");
        }
    });
}

function login(email, password){
    const employeeInfo = employee.find(employee => employee.email === email);
    if (employeeInfo && employeeInfo.password === password) {
        isLoggedIn = true;
        renderLoggedIn(employeeInfo);
        localStorage.setItem('login', JSON.stringify({employeeInfo, isLoggedIn}));
        return true;
    }
    return false;
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
        
        if(register(name, email, password, password2)){
            document.querySelector('.history').innerText = "Registration successful!";
            addNewEmployee({name, email, password});
        }
    });
}

function register(name, email, password, password2){
    if(!name || !email || !password || !password2){
        document.querySelector('.history').innerText = "All the fields must be filled";
        return false;
    }
    if(password !== password2){
        document.querySelector('.history').innerText = "Password didn't match";
        return false;
    }
    if(employee.find(employee => employee.email === email)){
        document.querySelector('.history').innerText = "Email already registered";
        return false;
    }
    return true;
}

function renderLoggedIn(employee){
    const loggedInHTML = `
        <h2>You have logged in as ${employee.name}</h2>
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
        isLoggedIn = false;
        localStorage.setItem('login', JSON.stringify({isLoggedIn}));
        renderLogin();
    });
}