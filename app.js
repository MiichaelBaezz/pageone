firebase.initializeApp({
    apiKey: "AIzaSyDh3LFQnFnabOG3M-tXfGh6DTPmunAiczk",
    authDomain: "inventory-f690e.firebaseapp.com",
    projectId: "inventory-f690e",
})

var db = firebase.firestore();

//Agregar documentos
function guardar() {
    var nombre = document.getElementById('name').value;
    var apellido = document.getElementById('lastname').value;
    var fecha = document.getElementById('date').value;

    db.collection("users").add({
        name: nombre,
        surname: apellido,
        date: fecha
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('name').value = '';
            document.getElementById('lastname').value = '';
            document.getElementById('date').value = '';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

//Leer Documentos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().name}</td>
        <td>${doc.data().surname}</td>
        <td>${doc.data().date}</td>
        <td><button class="btn bt-danger" onclick="editar('${doc.id}', '${doc.data().name}', '${doc.data().surname}', '${doc.data().date}')">Editar</button></td>
        <td><button class="btn bt-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        `
    });
});

//Borrar documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

//editar documento

function editar(id, name, surname, date) {

    document.getElementById('name').value = name;
    document.getElementById('lastname').value = surname;
    document.getElementById('date').value = date;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {

        var washingtonRef = db.collection("users").doc(id);

        var nombre = document.getElementById('name').value;
        var apellido = document.getElementById('lastname').value;
        var fecha = document.getElementById('date').value;

        return washingtonRef.update({
            name: nombre,
            surname: apellido,
            date: fecha
        })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
                document.getElementById('name').value = '';
                document.getElementById('lastname').value = '';
                document.getElementById('date').value = '';

            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }
}

const myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
// or
const myModalAlternative = new bootstrap.Modal('#myModal', options)