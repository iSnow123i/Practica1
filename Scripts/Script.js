let contenedor = document.querySelector(".content");
let button = document.getElementById("submit-button");
let modalWindow = document.querySelector(".modal");
let search = document.getElementById("search");
//Create card using fragment
function createCard(title, src = "../imagenes/show.png", text, l1, l2, f1) {
    let fragment = document.createDocumentFragment();
    let card = document.createElement("DIV");
    card.classList.add("card");
    let cardTitle = document.createElement("H3");
    cardTitle.classList.add("card__title");
    cardTitle.innerText = title;
    let image = document.createElement("IMG");
    image.src = src;
    image.classList.add("card__img");
    let info = document.createElement("DIV");
    info.classList.add("card-information");
    let infotext = document.createElement("P");
    infotext.innerText = text;
    let infolist = document.createElement("UL");
    infolist.appendChild(createInfoLink(l1));
    infolist.appendChild(createInfoLink(l2));
    info.appendChild(infotext);
    info.appendChild(infolist);
    let footer = document.createElement("DIV");
    footer.classList.add("card-footer");
    footer.appendChild(createLink(f1));
    fragment.appendChild(card);
    card.appendChild(cardTitle);
    card.appendChild(image);
    card.appendChild(info);
    card.appendChild(footer);
    return fragment;
}
//Create link for card
function createInfoLink(link) {
    let item = document.createElement("LI");
    item.appendChild(createLink(link));
    return item;
}
//Asign a link to card
function createLink(text, link = "#") {
    let newLink = document.createElement("A");
    newLink.href = link;
    newLink.innerText = text;
    return newLink;
}
//Control the display of the modal panel
function displayModal(visibility) {
    modalWindow.style.visibility = visibility;
}
//Create a card using the form
button.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.forms["card-form"]["title-input"].value;
    let imgPath = document.forms["card-form"]["img-input"].files[0];
    let description = document.forms["card-form"]["description-input"].value;
    let reader = new FileReader();
    try {
        reader.readAsDataURL(imgPath);
    } catch (error) {
        console.log("No se pudo leer la imagen");
        displayModal("hidden");
        return;
    }
    reader.onload = () => {
        try {
            localStorage.setItem(imgPath["name"], reader.result);
        } catch (error) {
            console.log(
                "No se pudo cargar el archivo en local storage\n Error: " +
                    error
            );
            displayModal("hidden");
            return;
        }
    };
    if (!localStorage.getItem(imgPath["name"])) {
        console.log("El archivo no se encuentra en localStorage");
        return;
    }
    if (!title) {
        title = title = imgPath["name"];
    }

    contenedor.append(
        createCard(
            title,
            localStorage.getItem(imgPath["name"]),
            description,
            undefined,
            undefined,
            new Date().toLocaleDateString(),
            ""
        )
    );
    displayModal("hidden");
});
//Use fetch to create a card using PokeApi
search.addEventListener("keypress", (e) => {
    if (e.key != "Enter") {
        return;
    }
    console.log("Se presiono enter");
    let pokemon = search.value;
    console.log(pokemon);
    search.value = "";
    let request = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    peticion = fetch(request);
    peticion
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let title = data.name;
            let sprite = data.sprites["front_default"];
            let card = createCard(
                title,
                sprite,
                "none",
                undefined,
                undefined,
                new Date().toLocaleDateString()
            );
            contenedor.append(card);
        })
        .catch((e) => console.log("Error: " + e));
});

//Create cards from local storage
if (localStorage.length > 0) {
    for (i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        contenedor.append(
            createCard(
                key,
                localStorage.getItem(key),
                "Sin definir",
                undefined,
                undefined,
                new Date().toLocaleDateString()
            )
        );
    }
}
