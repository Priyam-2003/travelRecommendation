const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.Home, .About, .Contact');
const searchbtn = document.querySelector('.search-btn');
const clearbtn = document.querySelector('.clear-btn');
const searchBar = document.querySelector(".search-bar");
const search = document.querySelector('.search');
 const resultsDiv = document.querySelector(".search-suggestion");


sections.forEach(sec => {
    if (sec.classList.contains('Home')) {
        sec.classList.remove('deactive');
        searchBar.classList.remove('deactive');
    } else {
        sec.classList.add('deactive');
    }
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.id;
        sections.forEach(sec => {
            if (targetId === 'Home') {
                searchBar.classList.remove('deactive');
            }
            else {
                searchBar.classList.add('deactive');
            }
            if (sec.classList.contains(targetId)) {
                sec.classList.remove('deactive');
            } else {
                sec.classList.add('deactive');
            }
        });
    });
});
let travelData = {};

(async function getData() {
    await fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            travelData = data;
        })
        .catch(error => console.error("Error loading JSON:", error));
})()

let searchData = () => {
    const query = search.value.toLowerCase().trim();
    resultsDiv.innerHTML = "";

    if (query.trim() === "") return;

    const results = [];
    travelData.countries?.forEach(country => {
        country.cities.forEach(city => {
            if (
                city.name.toLowerCase().trim().includes(query) ||
                country.name.toLowerCase().trim().includes(query)
            ) {
                results.push(city);
            }
        });
    });
    travelData.temples?.forEach(tem => {
        if (tem.name.toLowerCase().trim().includes(query)) {
            results.push(tem);
        }
    });

    travelData.beaches?.forEach(bre => {
        if (bre.name.toLowerCase().trim().includes(query)) {
            results.push(bre);
        }
    });

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No matching places found...</p>";
        return;
    }

    for (let i = 0; i < 2; i++) {
        const place = results[i];

        const searchItem = document.createElement("div");
        searchItem.className = "search-item";

        const imgDiv = document.createElement("div");
        imgDiv.className = "search-img";

        const img = document.createElement("img");
        img.src = place.imageUrl;
        img.alt = "image";

        imgDiv.appendChild(img);

        const placeDiv = document.createElement("div");
        placeDiv.className = "search-place";

        const title = document.createElement("h2");
        title.textContent = place.name;

        placeDiv.appendChild(title);

        const descDiv = document.createElement("div");
        descDiv.className = "search-desc";

        const p = document.createElement("p");
        p.textContent = place.description;

        descDiv.appendChild(p);

        const btn = document.createElement("button");
        btn.className = "visit-button";
        btn.textContent = "Visit";

        searchItem.appendChild(imgDiv);
        searchItem.appendChild(placeDiv);
        searchItem.appendChild(descDiv);
        searchItem.appendChild(btn);

        resultsDiv.appendChild(searchItem);
    }

}
function clearSearch() {
    search.value = "";
    resultsDiv.innerHTML = "";
}
search.addEventListener("keyup", searchData);
searchbtn.addEventListener('click',searchData);
clearbtn.addEventListener('click',clearSearch);

