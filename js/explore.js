/* =========================================================
   NIMEGAMI — EXPLORE.JS
   ========================================================= */

/* =========================================================
   01. ANIME DATA
   ========================================================= */

const animeData = [
    {
        id: 1,
        title: "Demon Slayer",
        japaneseTitle: "Kimetsu no Yaiba",
        year: 2019,
        genre: ["Action", "Fantasy", "Adventure"],
        status: "Finished",
        rating: 8.6,
        episodes: 55,
        type: "TV",
        description:
            "A young boy joins the Demon Slayer Corps after his family is attacked by demons, determined to save his sister and defeat the powerful demons threatening humanity.",
        image: "images/anime/demon-slayer.jpg"
    },

    {
        id: 2,
        title: "Jujutsu Kaisen",
        japaneseTitle: "Jujutsu Kaisen",
        year: 2020,
        genre: ["Action", "Fantasy", "Supernatural"],
        status: "Ongoing",
        rating: 8.7,
        episodes: 47,
        type: "TV",
        description:
            "Yuji Itadori enters the dangerous world of jujutsu sorcery after becoming involved with a powerful cursed object.",
        image: "images/anime/jujutsu-kaisen.jpg"
    },

    {
        id: 3,
        title: "Attack on Titan",
        japaneseTitle: "Shingeki no Kyojin",
        year: 2013,
        genre: ["Action", "Drama", "Fantasy"],
        status: "Finished",
        rating: 9.1,
        episodes: 89,
        type: "TV",
        description:
            "Humanity fights for survival behind enormous walls while mysterious Titans threaten everything they know.",
        image: "images/anime/attack-on-titan.jpg"
    },

    {
        id: 4,
        title: "My Hero Academia",
        japaneseTitle: "Boku no Hero Academia",
        year: 2016,
        genre: ["Action", "School", "Superhero"],
        status: "Finished",
        rating: 8.0,
        episodes: 170,
        type: "TV",
        description:
            "In a world where almost everyone has superpowers, a powerless boy dreams of becoming a great hero.",
        image: "images/anime/my-hero-academia.jpg"
    },

    {
        id: 5,
        title: "One Piece",
        japaneseTitle: "One Piece",
        year: 1999,
        genre: ["Action", "Adventure", "Fantasy"],
        status: "Ongoing",
        rating: 9.0,
        episodes: 1100,
        type: "TV",
        description:
            "Monkey D. Luffy and his crew travel across the Grand Line in search of the legendary treasure known as the One Piece.",
        image: "images/anime/one-piece.jpg"
    },

    {
        id: 6,
        title: "Spy x Family",
        japaneseTitle: "Spy x Family",
        year: 2022,
        genre: ["Comedy", "Action", "Family"],
        status: "Ongoing",
        rating: 8.5,
        episodes: 50,
        type: "TV",
        description:
            "A spy, an assassin, and a telepath create a fake family while secretly hiding their unusual identities from each other.",
        image: "images/anime/spy-family.jpg"
    },

    {
        id: 7,
        title: "Haikyuu!!",
        japaneseTitle: "Haikyuu!!",
        year: 2014,
        genre: ["Sports", "Comedy", "School"],
        status: "Finished",
        rating: 8.7,
        episodes: 85,
        type: "TV",
        description:
            "A short but determined volleyball player works with his teammates to reach the top of Japanese high school volleyball.",
        image: "images/anime/haikyuu.jpg"
    },

    {
        id: 8,
        title: "Your Name",
        japaneseTitle: "Kimi no Na wa",
        year: 2016,
        genre: ["Romance", "Drama", "Fantasy"],
        status: "Finished",
        rating: 8.8,
        episodes: 1,
        type: "Movie",
        description:
            "Two teenagers mysteriously begin switching bodies and discover a connection that reaches far beyond their ordinary lives.",
        image: "images/anime/your-name.jpg"
    },

    {
        id: 9,
        title: "Frieren",
        japaneseTitle: "Sousou no Frieren",
        year: 2023,
        genre: ["Fantasy", "Adventure", "Drama"],
        status: "Ongoing",
        rating: 9.2,
        episodes: 28,
        type: "TV",
        description:
            "After defeating the Demon King, an elf mage begins a journey to understand humanity and the meaning of the memories she left behind.",
        image: "images/anime/frieren.jpg"
    },

    {
        id: 10,
        title: "Naruto",
        japaneseTitle: "Naruto",
        year: 2002,
        genre: ["Action", "Adventure", "Comedy"],
        status: "Finished",
        rating: 8.4,
        episodes: 220,
        type: "TV",
        description:
            "A young ninja who dreams of becoming Hokage works hard to gain recognition and protect the people he cares about.",
        image: "images/anime/naruto.jpg"
    },

    {
        id: 11,
        title: "Blue Lock",
        japaneseTitle: "Blue Lock",
        year: 2022,
        genre: ["Sports", "Action", "Drama"],
        status: "Ongoing",
        rating: 8.2,
        episodes: 38,
        type: "TV",
        description:
            "Hundreds of young football players compete in an intense training program designed to create Japan's ultimate striker.",
        image: "images/anime/blue-lock.jpg"
    },

    {
        id: 12,
        title: "Solo Leveling",
        japaneseTitle: "Ore dake Level Up na Ken",
        year: 2024,
        genre: ["Action", "Fantasy", "Adventure"],
        status: "Ongoing",
        rating: 8.8,
        episodes: 25,
        type: "TV",
        description:
            "Once considered the weakest hunter, Sung Jin-Woo gains a mysterious ability that allows him to level up beyond ordinary limits.",
        image: "images/anime/solo-leveling.jpg"
    }
];


/* =========================================================
   02. DOM ELEMENTS
   ========================================================= */

const animeGrid =
    document.querySelector(".anime-grid");

const searchInput =
    document.querySelector("#animeSearch") ||
    document.querySelector(".search-box input");

const genreFilter =
    document.querySelector("#genreFilter");

const yearFilter =
    document.querySelector("#yearFilter");

const sortFilter =
    document.querySelector("#sortFilter");

const resultCount =
    document.querySelector("#resultCount");

const emptyState =
    document.querySelector("#emptyState");


/* =========================================================
   03. FAVORITES
   ========================================================= */

let favorites =
    JSON.parse(localStorage.getItem("nimegamiFavorites")) || [];


/* =========================================================
   04. CURRENT FILTERS
   ========================================================= */

let currentAnimeList = [...animeData];


/* =========================================================
   05. CREATE ANIME CARD
   ========================================================= */

function createAnimeCard(anime, index) {

    const isFavorite =
        favorites.includes(anime.id);

    const genreText =
        anime.genre.slice(0, 2).join(" • ");

    return `
        <article
            class="anime-card"
            data-id="${anime.id}"
        >

            <div
                class="anime-image"
                style="
                    background-image:
                    linear-gradient(
                        to top,
                        rgba(20,14,10,0.75),
                        rgba(20,14,10,0.05)
                    ),
                    url('${anime.image}');
                "
            >

                <div class="ranking">
                    #${String(index + 1).padStart(2, "0")}
                </div>

                <button
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    data-favorite="${anime.id}"
                    aria-label="Add ${anime.title} to favorites"
                >
                    <i class="${isFavorite ? "fas" : "far"} fa-heart"></i>
                </button>

                <div class="anime-overlay">

                    <div class="anime-rating">
                        <i class="fas fa-star"></i>
                        ${anime.rating}
                    </div>

                    <h3>${anime.title}</h3>

                    <p>
                        ${anime.year}
                        &nbsp; • &nbsp;
                        ${genreText}
                    </p>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   06. RENDER ANIME
   ========================================================= */

function renderAnime(list = currentAnimeList) {

    if (!animeGrid) return;

    if (list.length === 0) {

        animeGrid.innerHTML = "";

        if (emptyState) {
            emptyState.style.display = "block";
        }

        updateResultCount(0);

        return;
    }

    if (emptyState) {
        emptyState.style.display = "none";
    }

    animeGrid.innerHTML =
        list
            .map((anime, index) =>
                createAnimeCard(anime, index)
            )
            .join("");

    updateResultCount(list.length);

    attachCardEvents();
}


/* =========================================================
   07. RESULT COUNT
   ========================================================= */

function updateResultCount(count) {

    if (!resultCount) return;

    resultCount.textContent =
        `${count} anime${count !== 1 ? "s" : ""} found`;
}


/* =========================================================
   08. SEARCH
   ========================================================= */

function searchAnime(keyword) {

    const searchTerm =
        keyword.trim().toLowerCase();

    let filtered =
        animeData.filter(anime => {

            const title =
                anime.title.toLowerCase();

            const japaneseTitle =
                anime.japaneseTitle.toLowerCase();

            const genres =
                anime.genre.join(" ").toLowerCase();

            return (
                title.includes(searchTerm) ||
                japaneseTitle.includes(searchTerm) ||
                genres.includes(searchTerm)
            );
        });

    filtered = applyFilters(filtered);

    currentAnimeList = filtered;

    renderAnime(filtered);
}


/* =========================================================
   09. APPLY FILTERS
   ========================================================= */

function applyFilters(list) {

    let filtered = [...list];

    /* GENRE */

    if (
        genreFilter &&
        genreFilter.value &&
        genreFilter.value !== "all"
    ) {

        filtered =
            filtered.filter(anime =>
                anime.genre.includes(
                    genreFilter.value
                )
            );
    }


    /* YEAR */

    if (
        yearFilter &&
        yearFilter.value &&
        yearFilter.value !== "all"
    ) {

        const selectedYear =
            yearFilter.value;

        filtered =
            filtered.filter(anime =>
                String(anime.year) === selectedYear
            );
    }


    /* SORT */

    if (sortFilter) {

        const sort =
            sortFilter.value;

        if (sort === "rating") {

            filtered.sort(
                (a, b) =>
                    b.rating - a.rating
            );
        }

        else if (sort === "newest") {

            filtered.sort(
                (a, b) =>
                    b.year - a.year
            );
        }

        else if (sort === "oldest") {

            filtered.sort(
                (a, b) =>
                    a.year - b.year
            );
        }

        else if (sort === "title") {

            filtered.sort(
                (a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
            );
        }
    }

    return filtered;
}


/* =========================================================
   10. FILTER EVERYTHING
   ========================================================= */

function filterAnime() {

    const keyword =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    let filtered =
        animeData.filter(anime => {

            if (!keyword) return true;

            return (
                anime.title
                    .toLowerCase()
                    .includes(keyword) ||

                anime.japaneseTitle
                    .toLowerCase()
                    .includes(keyword) ||

                anime.genre
                    .join(" ")
                    .toLowerCase()
                    .includes(keyword)
            );
        });

    filtered = applyFilters(filtered);

    currentAnimeList = filtered;

    renderAnime(filtered);
}


/* =========================================================
   11. FAVORITE SYSTEM
   ========================================================= */

function toggleFavorite(id) {

    id = Number(id);

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

        showToast("Removed from favorites");

    } else {

        favorites.push(id);

        showToast("Added to favorites ❤️");
    }

    localStorage.setItem(
        "nimegamiFavorites",
        JSON.stringify(favorites)
    );

    renderAnime(currentAnimeList);
}


/* =========================================================
   12. CARD EVENTS
   ========================================================= */

function attachCardEvents() {

    const favoriteButtons =
        document.querySelectorAll(
            "[data-favorite]"
        );

    favoriteButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const id =
                    button.dataset.favorite;

                toggleFavorite(id);
            }
        );
    });


    const animeCards =
        document.querySelectorAll(
            ".anime-card"
        );

    animeCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const id =
                    Number(card.dataset.id);

                openAnimeModal(id);
            }
        );
    });
}


/* =========================================================
   13. ANIME MODAL
   ========================================================= */

function openAnimeModal(id) {

    const anime =
        animeData.find(
            item => item.id === Number(id)
        );

    if (!anime) return;

    let modal =
        document.querySelector(
            "#animeDetailsModal"
        );

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "animeDetailsModal";

        modal.className =
            "recommendation-modal";

        document.body.appendChild(modal);
    }


    modal.innerHTML = `

        <div class="recommendation-card">

            <button
                class="close-recommendation"
                id="closeAnimeModal"
                aria-label="Close"
            >
                <i class="fas fa-times"></i>
            </button>


            <div
                class="recommendation-poster"
                style="
                    background-image:
                    linear-gradient(
                        145deg,
                        rgba(233,135,72,0.25),
                        rgba(92,57,48,0.45)
                    ),
                    url('${anime.image}');
                    background-size: cover;
                    background-position: center;
                "
            >

                <div class="poster-placeholder">
                    ${anime.title}
                </div>

            </div>


            <div class="recommendation-info">

                <div class="eyebrow">
                    <span>✦</span>
                    NIMEGAMI PICK
                </div>

                <h2>
                    ${anime.title}
                </h2>

                <div class="recommendation-meta">
                    ${anime.japaneseTitle}
                    <br>
                    ${anime.year}
                    &nbsp; • &nbsp;
                    ${anime.type}
                    &nbsp; • &nbsp;
                    ${anime.episodes} episodes
                    <br>
                    ${anime.status}
                </div>


                <div class="recommendation-rating">

                    <i class="fas fa-star"></i>

                    ${anime.rating}

                    <span>
                        / 10
                    </span>

                </div>


                <p>
                    ${anime.description}
                </p>


                <div
                    style="
                        display:flex;
                        flex-wrap:wrap;
                        gap:7px;
                        margin-bottom:25px;
                    "
                >

                    ${anime.genre
                        .map(
                            genre => `
                                <span
                                    style="
                                        padding:7px 12px;
                                        border-radius:50px;
                                        background:var(--cream);
                                        font-size:10px;
                                        font-weight:700;
                                    "
                                >
                                    ${genre}
                                </span>
                            `
                        )
                        .join("")}

                </div>


                <button
                    class="primary-button"
                    id="modalFavoriteButton"
                >

                    <i class="${
                        favorites.includes(anime.id)
                            ? "fas"
                            : "far"
                    } fa-heart"></i>

                    ${
                        favorites.includes(anime.id)
                            ? "Remove Favorite"
                            : "Add to Favorites"
                    }

                </button>

            </div>

        </div>
    `;


    modal.classList.add("show");

    document.body.style.overflow = "hidden";


    /* CLOSE */

    const closeButton =
        document.querySelector(
            "#closeAnimeModal"
        );

    closeButton.addEventListener(
        "click",
        closeAnimeModal
    );


    /* FAVORITE */

    const favoriteButton =
        document.querySelector(
            "#modalFavoriteButton"
        );

    favoriteButton.addEventListener(
        "click",
        () => {

            toggleFavorite(anime.id);

            openAnimeModal(anime.id);
        }
    );


    /* BACKDROP */

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {
                closeAnimeModal();
            }
        }
    );
}


/* =========================================================
   14. CLOSE ANIME MODAL
   ========================================================= */

function closeAnimeModal() {

    const modal =
        document.querySelector(
            "#animeDetailsModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

    setTimeout(() => {

        if (modal.parentNode) {
            modal.remove();
        }

    }, 350);
}


/* =========================================================
   15. ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAnimeModal();

            closeSearchModal();
        }
    }
);


/* =========================================================
   16. SEARCH MODAL
   ========================================================= */

function openSearchModal() {

    const modal =
        document.querySelector(
            ".search-modal"
        );

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

    const input =
        modal.querySelector("input");

    if (input) {

        setTimeout(
            () => input.focus(),
            200
        );
    }
}


function closeSearchModal() {

    const modal =
        document.querySelector(
            ".search-modal"
        );

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";
}


/* =========================================================
   17. SEARCH BUTTON
   ========================================================= */

const searchButton =
    document.querySelector(
        ".search-button"
    );

if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearchModal
    );
}


/* =========================================================
   18. CLOSE SEARCH
   ========================================================= */

const closeSearch =
    document.querySelector(
        ".close-search"
    );

if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        closeSearchModal
    );
}


/* =========================================================
   19. SEARCH MODAL BACKDROP
   ========================================================= */

const searchModal =
    document.querySelector(
        ".search-modal"
    );

if (searchModal) {

    searchModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchModal
            ) {

                closeSearchModal();
            }
        }
    );
}


/* =========================================================
   20. SEARCH INPUT
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterAnime
    );
}


/* =========================================================
   21. FILTER EVENTS
   ========================================================= */

if (genreFilter) {

    genreFilter.addEventListener(
        "change",
        filterAnime
    );
}

if (yearFilter) {

    yearFilter.addEventListener(
        "change",
        filterAnime
    );
}

if (sortFilter) {

    sortFilter.addEventListener(
        "change",
        filterAnime
    );
}


/* =========================================================
   22. SEARCH SUGGESTIONS
   ========================================================= */

const suggestionButtons =
    document.querySelectorAll(
        ".search-suggestions button"
    );

suggestionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const value =
                button.textContent.trim();

            if (searchInput) {

                searchInput.value =
                    value;

                filterAnime();
            }

            closeSearchModal();
        }
    );
});


/* =========================================================
   23. RESET FILTERS
   ========================================================= */

const resetButton =
    document.querySelector(
        "#resetFilters"
    );

if (resetButton) {

    resetButton.addEventListener(
        "click",
        () => {

            if (searchInput)
                searchInput.value = "";

            if (genreFilter)
                genreFilter.value = "all";

            if (yearFilter)
                yearFilter.value = "all";

            if (sortFilter)
                sortFilter.value = "default";

            currentAnimeList =
                [...animeData];

            renderAnime();
        }
    );
}


/* =========================================================
   24. TOAST NOTIFICATION
   ========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(
            "#nimegamiToast"
        );

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "nimegamiToast";

        toast.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: 30px;
            transform: translate(-50%, 20px);
            z-index: 9999;

            padding: 13px 20px;

            border-radius: 100px;

            background: #252321;
            color: white;

            font-family: "DM Sans", sans-serif;
            font-size: 12px;
            font-weight: 700;

            box-shadow:
                0 15px 40px rgba(0,0,0,0.2);

            opacity: 0;

            transition:
                opacity 0.3s ease,
                transform 0.3s ease;

            pointer-events: none;
        `;

        document.body.appendChild(toast);
    }


    toast.textContent = message;

    toast.style.opacity = "1";

    toast.style.transform =
        "translate(-50%, 0)";


    clearTimeout(
        window.nimegamiToastTimer
    );


    window.nimegamiToastTimer =
        setTimeout(() => {

            toast.style.opacity = "0";

            toast.style.transform =
                "translate(-50%, 20px)";

        }, 2000);
}


/* =========================================================
   25. YEAR FILTER AUTO GENERATION
   ========================================================= */

function populateYearFilter() {

    if (!yearFilter) return;

    const years =
        [...new Set(
            animeData.map(
                anime => anime.year
            )
        )].sort(
            (a, b) => b - a
        );


    /*
       Only generate options if
       the select doesn't already
       contain year options.
    */

    if (yearFilter.options.length <= 1) {

        years.forEach(year => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = year;

            option.textContent = year;

            yearFilter.appendChild(
                option
            );
        });
    }
}


/* =========================================================
   26. GENRE FILTER AUTO GENERATION
   ========================================================= */

function populateGenreFilter() {

    if (!genreFilter) return;

    const genres =
        [
            ...new Set(
                animeData.flatMap(
                    anime => anime.genre
                )
            )
        ].sort();


    if (genreFilter.options.length <= 1) {

        genres.forEach(genre => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = genre;

            option.textContent = genre;

            genreFilter.appendChild(
                option
            );
        });
    }
}


/* =========================================================
   27. INITIALIZE
   ========================================================= */

function initializeExplorePage() {

    populateYearFilter();

    populateGenreFilter();

    currentAnimeList =
        [...animeData];

    renderAnime();

    console.log(
        "🌸 Nimegami Explore loaded!"
    );

    console.log(
        `📚 ${animeData.length} anime loaded.`
    );
}


/* =========================================================
   28. DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeExplorePage
    );

} else {

    initializeExplorePage();
}