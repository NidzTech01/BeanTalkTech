function validateForm(event) {
    const form = event.target;
    let isValid = true;

    form.querySelectorAll('input[required], select[required]').forEach(input => {
        if (!input.value) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!isValid) {
        event.preventDefault();
        alert('Please fill out all required fields.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');
    const patientRecordForm = document.getElementById('patient-record');

    if (signupForm) signupForm.addEventListener('submit', validateForm);
    if (loginForm) loginForm.addEventListener('submit', validateForm);
    if (patientRecordForm) patientRecordForm.addEventListener('submit', validateForm);

    fetch('fetch_records.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#records-table tbody');
            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.id}</td>
                    <td>${record.name}</td>
                    <td>${record.age}</td>
                    <td>${record.gender}</td>
                    <td>${record.medical_history}</td>
                    <td>${record.created_at}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching records:', error));
});
