// 🔥 PEGA AQUÍ TU CONFIG DE FIREBASE
const firebaseConfig = {
  apiKey: "AQUI",
  authDomain: "AQUI",
  projectId: "AQUI",
  storageBucket: "AQUI",
  messagingSenderId: "AQUI",
  appId: "AQUI"
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