const clienId = "_Nd3LRkWgNKFcXO5RHIHnxrioGk5ehieQDBoarCyZOo";
const maxCount = 10;
const urlApi = `https://api.unsplash.com/photos/random?client_id=${clienId}&count=${maxCount}`;

async function getPhotos() {
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

// on Load
getPhotos();