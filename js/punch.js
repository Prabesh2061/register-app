import { employee } from "../data/employee-data.js";

function renderPunchHtml(){
    const html = `
        <div class="current">
            <h2>Punch</h2>
            <form>
                <div class="form-group">
                    <label for="user">User:</label>
                    <select name="user" id="user">
                        ${getUsers()}
                    </select>
                </div>
                <div class="form-group">
                    <label for="pin">Pin:</label>
                    <input type="number" name="pin" id="pin">
                </div>
                <button class="punchButton" type="submit">Punch</button>
                <button class="punchOut">Punch Out</button>
            </form>
            <div class="history">
                <p>Last Punch History in Here</p>
            </div>
        </div>
    `;
    document.querySelector('.container').innerHTML = html;

    document.querySelector('.punchButton').addEventListener('click', (e) => {
        e.preventDefault();
        let now = new Date();
        let currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        console.log(`Current Time: ${currentTime}`);

    });
}

function getUsers(){
    let userHtml = ``;
    employee.forEach(e => {
        userHtml += `<option value="${e.name}">${e.name}</option>`;
    });
    return userHtml;
}

renderPunchHtml();