// 🔥 PEGA AQUÍ TU CONFIG DE FIREBASE
const firebaseConfig = {
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASWE6DeHUb20icz9a7GmUMScBBfcZy-i0",
  authDomain: "inmo-13a1e.firebaseapp.com",
  projectId: "inmo-13a1e",
  storageBucket: "inmo-13a1e.firebasestorage.app",
  messagingSenderId: "668202549196",
  appId: "1:668202549196:web:f50909d50bc1e6b7e8a769"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// 🔐 LOGIN
function login(){
  firebase.auth().signInWithEmailAndPassword(
    document.getElementById("email").value,
    document.getElementById("password").value
  ).then(()=> alert("Login correcto"))
  .catch(e=>alert(e.message));
}

// 📤 SUBIR PROPIEDAD
async function subir(){
  let file = document.getElementById("imagen").files[0];

  let ref = firebase.storage().ref("propiedades/" + file.name);
  await ref.put(file);

  let url = await ref.getDownloadURL();

  await db.collection("propiedades").add({
    nombre: nombre.value,
    precio: precio.value,
    ubicacion: ubicacion.value,
    terreno: terreno.value,
    imagen: url
  });

  alert("Guardado");
}

// 🌐 MOSTRAR EN INDEX
if(document.getElementById("contenedor")){
  db.collection("propiedades").onSnapshot(snapshot=>{
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    snapshot.forEach(doc=>{
      let p = doc.data();

      contenedor.innerHTML += `
        <div class="card">
          <img src="${p.imagen}">
          <div class="card-content">
            <p class="precio">${p.precio}</p>
            <p>${p.ubicacion}</p>
            <p>${p.terreno}</p>
          </div>
        </div>
      `;
    });
  });
}