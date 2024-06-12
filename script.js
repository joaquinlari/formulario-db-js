const firebaseConfig = {
    apiKey: "AIzaSyBfO0oF_T5xLMtm30C2jQfgoeHLtxq6abc",
    authDomain: "datos-de-formulario-7692a.firebaseapp.com",
    projectId: "datos-de-formulario-7692a",
    storageBucket: "datos-de-formulario-7692a.appspot.com",
    messagingSenderId: "581803153975",
    appId: "1:581803153975:web:7d54b5e707c4a0b29a7db2",
    measurementId: "G-DJ25KLJWFF"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduzca un nombre valido'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    let entradaEmail = document.getElementById('email')
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(entradaEmail.value)) {
        errorEmail.textContent = 'Por favor, introduzca un email valido'
        errorEmail.classList.add('error-message')
    } else {
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }

    let entradaContrasena = document.getElementById('password')
    let errorContrasena = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(entradaContrasena.value)) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        errorContrasena.classList.add('error-message')
    } else {
        errorContrasena.textContent = ''
        errorContrasena.classList.remove('error-message')
    }

    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: entradaContrasena.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con éxito', docRef.id)
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error)
            });
    }
})


