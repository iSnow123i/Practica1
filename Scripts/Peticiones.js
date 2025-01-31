//Request usig Ajax
/*peticion = new XMLHttpRequest();
peticion.addEventListener("load", () => {
    console.log(JSON.parse(peticion.response));
});
peticion.open("GET", "https://pokeapi.co/api/v2/pokemon/ditto");
peticion.send();
*/
//Request using fetch
/*0
    peticion = fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    peticion
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let title = data.name;
            let sprite = data.sprites["front_default"];
        });
*/
//request using axios
axios("https://pokeapi.co/api/v2/pokemon/ditto").then((res) =>
    console.log(res)
);
