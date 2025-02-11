import {getSelectedUser, getUsers} from './punch.js';
import { employee, saveToStorage } from '../data/employee-data.js';

function renderChangePin(){
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
                    <label for="pin">Old Pin:</label>
                    <input type="number" name="pin" id="pin">
                </div>
                <div class="form-group">
                    <label for="pin1">New Pin:</label>
                    <input type="number" name="pin1" id="pin1">
                </div>
                <div class="form-group">
                    <label for="pin2">Confirm New Pin:</label>
                    <input type="number" name="pin2" id="pin2">
                </div>
                <button class="js-change-pin">Change Pin</button>
            </form>
            <div class="history js-pin-info">Enter a new pin to continue</div>
        </div>
    `;
    document.querySelector('.container').innerHTML = html;

    document.querySelector('.js-change-pin').addEventListener('click', (e) => {
        e.preventDefault();
        const currentPin = document.getElementById('pin').value;
        const newPin = document.getElementById('pin1').value;
        const confirmPin = document.getElementById('pin2').value;

        // confirming if the fields are filled
        if (!currentPin || !newPin || !confirmPin){
            console.log('field empty');
            document.querySelector('.js-pin-info').innerHTML = 'Please fill out every field to continue';
            return
        }
        if (currentPin != getSelectedUser().pin){
            document.querySelector('.js-pin-info').innerHTML = "The current pin is incorrect";
            return
        } else if(newPin !== confirmPin){
            document.querySelector('.js-pin-info').innerHTML = 'Please confirm that you typed new pin correctly';
            return
        }
        getSelectedUser().pin = newPin;
        saveToStorage();
        document.querySelector('.js-pin-info').innerHTML = 'The pin was changed';
    });
}
renderChangePin();