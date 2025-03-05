import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';

const appSettings = {
  databaseURL: "https://dropshipping-a4035-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const employeesInDB = ref(database, "employee")

export function addEmployeesToDatabase(employeeDetails){
    push(employeesInDB, employeeDetails);
}

export function getEmployeesFromDatabase(){
    onValue(employeesInDB, function(snapshot){
        if (snapshot.exists()){
            return Object.values(snapshot.val());
        }
    });
}