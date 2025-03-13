import { getEmployeeData, usersData, getUserByEmail, getUserId, updatePunchStatus } from '../data/database.js';
import 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js';

const employee = await usersData();

async function renderPunchHtml(){
    const html = `
        <div class="current">
            <h2>Punch</h2>
            <form>
                <div class="form-group">
                    <label for="user">User:</label>
                    <select name="user" id="user" class="js-user-option">
                        ${employee.map(e => `<option value="${e.email}">${e.name}</option>`)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="pin">Pin:</label>
                    <input type="number" name="pin" id="pin">
                </div>
                <button class="punchIn">Punch In</button>
                <button class="punchOut">Punch Out</button>
            </form>
            <div class="history js-pin-info">Please enter your pin</div>
            <div class="history js-punch-info">
                Your last punch status will display here
            </div>
        </div>
    `;
    document.querySelector('.container').innerHTML = html;

    // displaying the last punch message of the selected user when website renders
    let selectedUser = await getUserByEmail(document.getElementById('user').value);
    let uid = await getUserId(document.getElementById('user').value);
    renderPunchMessage(selectedUser);

    // event listener for the punch in button
    document.querySelector('.punchIn').addEventListener('click', (e) => {
        e.preventDefault();
        if(!verifyPin()){
            return;
        };
        if(selectedUser.punchStatus.isPunchedIn === true){
            document.querySelector('.js-pin-info').innerHTML = "Already punched in";
            console.log('already punched in');
            return
        };
        // takes the punched in time then saves it and displays the msg
        var now = dayjs().format('HH:mm:ss');
        const punchMsg = `You punched in at ${now}`;
        updatePunchStatus({isPunchedIn: true, lastPunch: punchMsg}, uid);
        document.querySelector('.js-punch-info').innerHTML = punchMsg;
        renderPinMessage();
    });
    // event listener for punch out button
    document.querySelector('.punchOut').addEventListener('click', (e) => {
        e.preventDefault();
        if(selectedUser.punchStatus.isPunchedIn === false){
            console.log("You haven't punched in yet");
            document.querySelector('.js-pin-info').innerHTML = "You haven't punched in yet";
            return
        };
        var now = dayjs().format('HH:mm:ss');
        const punchMsg = `You punched out at ${now}`;
        updatePunchStatus({isPunchedIn: false, lastPunch: punchMsg}, uid);
        document.querySelector('.js-punch-info').innerHTML = punchMsg;
        renderPinMessage();
    });

    document.querySelector('.js-user-option').addEventListener('change', async () => {
        selectedUser = await getUserByEmail(document.getElementById('user').value);
        uid = await getUserId(document.getElementById('user').value);
        renderPunchMessage(selectedUser);
        renderPinMessage();
    });
}

function renderPunchMessage(selectedUser){
    document.querySelector('.js-punch-info').innerHTML =
    selectedUser.punchStatus.lastPunch === ''
        ? 'Your last punch status will display here'
        : selectedUser.punchStatus.lastPunch;
}

function renderPinMessage(){
    document.querySelector('.js-pin-info').innerHTML = 'Please enter your pin';
}

function verifyPin(){
    const pin = document.getElementById('pin').value;
    let div = document.querySelector('.js-pin-info');
    /*if(pin === ''){
        div.innerHTML = 'The pin is empty';
        return false;
    }else if(selectedUser.pin !== ''){
        div.innerHTML = 'The pin is incorrect';
        return false;
    }*/
    return true;
}

renderPunchHtml();