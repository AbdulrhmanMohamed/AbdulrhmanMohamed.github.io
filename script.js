const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
const clienId = "_Nd3LRkWgNKFcXO5RHIHnxrioGk5ehieQDBoarCyZOo";

const maxCount = 10;
const urlApi = `https://api.unsplash.com/photos/random?client_id=${clienId}&count=${maxCount}`;

let photosArray = [];

let loaded = false;

// creating the funciton for the loader to show while the image load for the first time 
function loadingSpinner() {
    // hide the image-container and show the loader 
    imageContainer.hidden = true;
    loader.hidden = false;

}

function hideLoaderSpinner() {
    imageContainer.hidden = false;
    loader.hidden = true;
    loaded = true;
}

function setAttributes(element, attributes) {
    for (key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

async function getPhotos() {
    if (!loaded) {
        loadingSpinner();
    }

    try {
        const response = await fetch(urlApi);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

function displayPhotos() {

    console.log(photosArray.length);
    photosArray.forEach(photo => {
        // create the link to the unsplash


        const link = document.createElement('a');
        // setAttributes to the a tag
        setAttributes(link, {
            href: photo.links.html,
            target: '_blank',
        });

        // create img tag for the actual image
        const image = document.createElement('img');
        // set the attributes of the img
        setAttributes(image, {
                src: photo.urls.regular,
                alt: photo.description,
                title: photo.description,
            })
            // append the image inside the link tag
        link.appendChild(image);
        // append the tag to the imageContainer
        imageContainer.appendChild(link);
    });
    if (!loaded)
        hideLoaderSpinner();

}


// on Load
getPhotos();

window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
        console.log("images gets loaded");
    }

});