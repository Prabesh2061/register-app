import { employee, saveToStorage } from "../data/employee-data.js";
import 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js';

function renderPunchHtml(){
    const html = `
        <div class="current">
            <h2>Punch</h2>
            <form>
                <div class="form-group">
                    <label for="user">User:</label>
                    <select name="user" id="user" class="js-user-option">
                        ${getUsers()}
                    </select>
                </div>
                <div class="form-group">
                    <label for="pin">Pin:</label>
                    <input type="number" name="pin" id="pin">
                </div>
                <button class="punchIn">Punch In</button>
                <button class="punchOut">Punch Out</button>
            </form>
            <div class="history">
                Your last punch status will display here
            </div>
        </div>
    `;
    document.querySelector('.container').innerHTML = html;

    // displaying the last punch message of the selected user when website renders
    renderPunchMessage();

    // event listener for the punch in button
    document.querySelector('.punchIn').addEventListener('click', (e) => {
        e.preventDefault();
        if(getSelectedUser().punchStatus.isPunchedIn === true){
            console.log('already punched in');
            return
        };
        // takes the punched in time then saves it and displays the msg
        var now = dayjs().format('HH:mm:ss');
        const punchMsg = `You punched in at ${now}`;
        getSelectedUser().punchStatus.isPunchedIn = true;
        getSelectedUser().punchStatus.lastPunch = punchMsg;
        saveToStorage();
        document.querySelector('.history').innerHTML = punchMsg;
    });

    // event listener for punch out button
    document.querySelector('.punchOut').addEventListener('click', (e) => {
        e.preventDefault();
        if(getSelectedUser().punchStatus.isPunchedIn === false){
            console.log("You haven't punched in yet");
            return
        };

        var now = dayjs().format('HH:mm:ss');
        const punchMsg = `You punched out at ${now}`;
        getSelectedUser().punchStatus.isPunchedIn = false;
        getSelectedUser().punchStatus.lastPunch = punchMsg;
        saveToStorage();
        document.querySelector('.history').innerHTML = punchMsg;
    });

    document.querySelector('.js-user-option').addEventListener('change', () => {
        renderPunchMessage();
    });
}
// function to get the employee info that is selected in the dropdown menu
function getSelectedUser(){
    const username = document.getElementById('user').value;
    const selectedEmployee = employee.find(e => e.name === username);
    return selectedEmployee;
}

function renderPunchMessage(){
    document.querySelector('.history').innerHTML =
    getSelectedUser().punchStatus.lastPunch === ''
        ? 'Your last punch status will display here'
        : getSelectedUser().punchStatus.lastPunch;
}

function getUsers(){
    let userHtml = ``;
    employee.forEach(e => {
        userHtml += `<option value="${e.name}">${e.name}</option>`;
    });
    return userHtml;
}

renderPunchHtml();