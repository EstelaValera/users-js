function getUser() { 
    return fetch('https://jsonplaceholder.typicode.com/users' ) 
    .then(response => {
        if (!response.ok) {
            throw new Error ('Error en la solicitud') 
    }
    return response.json();
    });
}

function addRandomAge (users) {
    return users.map(user => ({
        ...user, 
        age: Math.floor(Math.random() * 43) + 18
    }));
}

function displayUsers(users) {
    const userList = document.getElementById('listaUsuarios');
    userList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('li');

        userItem.innerHTML = `
            <img src="assets/img/${user.id}.jpeg" alt="User Image" width="100" height="100" />
            <div>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
            </div>
        `;

        userList.appendChild(userItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getUser()
    .then(users => {
        return addRandomAge(users);
    })
    .then(usersWhithAges => {
        displayUsers(usersWhithAges);
    })
    .catch(error => {
        console.error ('error al encontrar el usuario:', error);
    });
});