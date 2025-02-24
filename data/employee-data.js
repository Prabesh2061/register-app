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
    }
]

export function addNewEmployee(employeeDetails) {
    employee.push(employeeDetails);
    saveToStorage();
    console.log('new employee registered');
}

export function saveToStorage(){
    localStorage.setItem('employee', JSON.stringify(employee));
}