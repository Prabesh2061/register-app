export const employee = JSON.parse(localStorage.getItem('employee')) || [
    {
        name: 'Prabesh Aryal',
        email: 'aryalpravesh111@gmail.com',
        password: 'prabesh123',
        pin: '0000',
        punchStatus: {
            isPunchedIn: false,
            lastPunch: ''
        }
    },
    {
        name: 'Uttam Sunar',
        email: 'uttamsunar69@gmail.com',
        password: 'uttamsunar',
        pin: '0000',
        punchStatus: {
            isPunchedIn: false,
            lastPunch: ''
        }
    }
]

export function addNewEmployee(employeeDetails) {
    employee.push(employeeDetails);
    saveToStorage();
}

export function saveToStorage(){
    localStorage.setItem('employee', JSON.stringify(employee));
}

export function getSelectedUser(username){
    return employee.find(e => e.name === username);
}