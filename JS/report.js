document.getElementById('bugReportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const username = document.getElementById('username').value.trim();
    if (username === '') {
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }

    const email = document.getElementById('email').value.trim();
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    const server = document.getElementById('server').value;
    if (server === '') {
        document.getElementById('serverError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('serverError').style.display = 'none';
    }

    const description = document.getElementById('description').value.trim();
    if (description.length < 20) {
        document.getElementById('descriptionError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('descriptionError').style.display = 'none';
    }

    const emailPermission = document.getElementById('emailPermission').checked;
    if (!emailPermission) {
        document.getElementById('checkboxError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('checkboxError').style.display = 'none';
    }

    if (isValid) {
        alert('Report submitted successfully!');
        this.reset();
    }
});