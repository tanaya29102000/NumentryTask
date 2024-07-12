
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const address = document.getElementById('address').value;
    const dob = document.getElementById('dob').value;

    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
        alert(nameValidation.message);
        return;
    }

    if (name && email && mobileNo && address && dob) {
        const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const mobileNoCell = newRow.insertCell(2);
        const addressCell = newRow.insertCell(3);
        const dobCell = newRow.insertCell(4);
        const actionCell = newRow.insertCell(5);

        nameCell.textContent = name;
        emailCell.textContent = email;
        mobileNoCell.textContent = mobileNo;
        addressCell.textContent = address;
        dobCell.textContent = dob;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = function () {
            editRow(newRow);
        };
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = function () {
            table.deleteRow(newRow.rowIndex - 1);
        };
        actionCell.appendChild(deleteButton);

        document.getElementById('registrationForm').reset();
    }
});

function editRow(row) {
    const cells = row.getElementsByTagName('td');
    const name = cells[0].textContent;
    const email = cells[1].textContent;
    const mobileNo = cells[2].textContent;
    const address = cells[3].textContent;
    const dob = cells[4].textContent;

    // Populate form fields with the current row data
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('mobileNo').value = mobileNo;
    document.getElementById('address').value = address;
    document.getElementById('dob').value = dob;

    // Update form submission behavior to save changes to the existing row
    document.getElementById('registrationForm').onsubmit = function (e) {
        e.preventDefault();

        const updatedName = document.getElementById('name').value;
        const updatedEmail = document.getElementById('email').value;
        const updatedMobileNo = document.getElementById('mobileNo').value;
        const updatedAddress = document.getElementById('address').value;
        const updatedDob = document.getElementById('dob').value;

        // Validate the updated name
        const nameValidation = validateName(updatedName);
        if (!nameValidation.isValid) {
            alert(nameValidation.message);
            return;
        }

        // Update the table row with the new values
        cells[0].textContent = updatedName;
        cells[1].textContent = updatedEmail;
        cells[2].textContent = updatedMobileNo;
        cells[3].textContent = updatedAddress;
        cells[4].textContent = updatedDob;

        // Reset the form and its submission behavior
        document.getElementById('registrationForm').reset();
        document.getElementById('registrationForm').onsubmit = originalSubmitHandler;
    };
}

const originalSubmitHandler = document.getElementById('registrationForm').onsubmit;

function validateName(name) {
    if (!name) {
        return { isValid: false, message: "Name cannot be empty" };
    }

    const regex = /^[A-Za-z\s'-]+$/;
    if (!regex.test(name)) {
        return { isValid: false, message: "Name can only contain alphabetic characters, spaces, hyphens, and apostrophes" };
    }

    if (name.length < 2 || name.length > 50) {
        return { isValid: false, message: "Name must be between 2 and 50 characters long" };
    }

    return { isValid: true, message: "Name is valid" };
}