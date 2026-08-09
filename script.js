/* =========================================================
   NIMEGAMI — ANIME DISCOVERY HUB
   SCRIPT.JS
========================================================= */


/* =========================================================
   01. ANIME DATABASE
========================================================= */

const animeDatabase = [

    {
        title: "Attack on Titan",
        year: 2013,
        episodes: 87,
        rating: 9.1,
        genres: ["Action", "Drama", "Fantasy"],
        moods: ["hype", "thinking", "emotional"],
        description:
            "A powerful story of survival, freedom, friendship, and humanity's struggle against mysterious giants.",
        imageClass: "image-one"
    },

    {
        title: "Demon Slayer",
        year: 2019,
        episodes: 63,
        rating: 8.9,
        genres: ["Action", "Adventure", "Supernatural"],
        moods: ["hype", "emotional"],
        description:
            "Follow Tanjiro as he journeys to save his sister and defeat powerful demons along the way.",
        imageClass: "image-two"
    },

    {
        title: "Jujutsu Kaisen",
        year: 2020,
        episodes: 47,
        rating: 8.8,
        genres: ["Action", "Fantasy", "Supernatural"],
        moods: ["hype", "thinking"],
        description:
            "A young student enters the dangerous world of cursed spirits and supernatural battles.",
        imageClass: "image-three"
    },

    {
        title: "Haikyuu!!",
        year: 2014,
        episodes: 85,
        rating: 8.7,
        genres: ["Sports", "Comedy", "Drama"],
        moods: ["hype", "funny", "emotional"],
        description:
            "A determined volleyball player dreams of becoming a great athlete despite his small stature.",
        imageClass: "image-four"
    },

    {
        title: "Frieren: Beyond Journey's End",
        year: 2023,
        episodes: 28,
        rating: 9.0,
        genres: ["Fantasy", "Adventure", "Drama"],
        moods: ["relax", "emotional", "thinking"],
        description:
            "An elf mage begins a new journey long after the great adventure that changed her life has ended.",
        imageClass: "image-two"
    },

    {
        title: "Spy x Family",
        year: 2022,
        episodes: 37,
        rating: 8.5,
        genres: ["Comedy", "Action", "Slice of Life"],
        moods: ["funny", "relax"],
        description:
            "A spy, an assassin, and a telepath pretend to be a normal family while hiding their secrets.",
        imageClass: "image-three"
    },

    {
        title: "Your Lie in April",
        year: 2014,
        episodes: 22,
        rating: 8.6,
        genres: ["Romance", "Drama", "Music"],
        moods: ["romance", "emotional"],
        description:
            "A talented pianist who lost his ability to hear music meets a violinist who changes his world.",
        imageClass: "image-one"
    },

    {
        title: "Blue Lock",
        year: 2022,
        episodes: 38,
        rating: 8.4,
        genres: ["Sports", "Action"],
        moods: ["hype"],
        description:
            "Strikers compete in an intense training program designed to create Japan's greatest football player.",
        imageClass: "image-four"
    },

    {
        title: "Violet Evergarden",
        year: 2018,
        episodes: 13,
        rating: 8.9,
        genres: ["Drama", "Romance", "Slice of Life"],
        moods: ["emotional", "relax"],
        description:
            "A former soldier learns to understand emotions and the meaning behind the words 'I love you.'",
        imageClass: "image-three"
    },

    {
        title: "One Punch Man",
        year: 2015,
        episodes: 24,
        rating: 8.6,
        genres: ["Action", "Comedy", "Supernatural"],
        moods: ["hype", "funny"],
        description:
            "A hero who can defeat any enemy with one punch searches for an opponent who can challenge him.",
        imageClass: "image-one"
    },

    {
        title: "Kuroko's Basketball",
        year: 2012,
        episodes: 75,
        rating: 8.3,
        genres: ["Sports", "Comedy", "Drama"],
        moods: ["hype", "funny"],
        description:
            "A mysterious basketball player joins a new team and aims to defeat his former teammates.",
        imageClass: "image-four"
    },

    {
        title: "Death Note",
        year: 2006,
        episodes: 37,
        rating: 8.9,
        genres: ["Psychological", "Supernatural", "Drama"],
        moods: ["thinking"],
        description:
            "A brilliant student discovers a mysterious notebook capable of killing anyone whose name is written inside.",
        imageClass: "image-two"
    }

];


/* =========================================================
   02. DOM ELEMENTS
========================================================= */

const searchModal = document.getElementById("searchModal");
const recommendationModal =
    document.getElementById("recommendationModal");

const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");

const heroSurprise = document.getElementById("heroSurprise");
const navSurprise = document.getElementById("navSurprise");
const surpriseButton = document.getElementById("surpriseButton");

const closeRecommendation =
    document.getElementById("closeRecommendation");

const anotherRecommendation =
    document.getElementById("anotherRecommendation");

const searchInput =
    document.getElementById("searchInput");

const recommendationTitle =
    document.getElementById("recommendationTitle");

const recommendationMeta =
    document.getElementById("recommendationMeta");

const recommendationRating =
    document.getElementById("recommendationRating");

const recommendationDescription =
    document.getElementById("recommendationDescription");

const recommendationPoster =
    document.getElementById("recommendationPoster");


/* =========================================================
   03. SEARCH MODAL
========================================================= */

function showSearchModal() {

    if (!searchModal) return;

    searchModal.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        if (searchInput) {
            searchInput.focus();
        }

    }, 300);
}


function hideSearchModal() {

    if (!searchModal) return;

    searchModal.classList.remove("show");

    document.body.style.overflow = "";
}


if (openSearch) {
    openSearch.addEventListener(
        "click",
        showSearchModal
    );
}


if (closeSearch) {
    closeSearch.addEventListener(
        "click",
        hideSearchModal
    );
}


if (searchModal) {

    searchModal.addEventListener("click", (event) => {

        if (event.target === searchModal) {
            hideSearchModal();
        }

    });

}


/* =========================================================
   04. SEARCH FUNCTION
========================================================= */

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();

        if (searchValue.length === 0) {
            return;
        }

        const results =
            animeDatabase.filter((anime) => {

                const titleMatch =
                    anime.title
                        .toLowerCase()
                        .includes(searchValue);

                const genreMatch =
                    anime.genres.some((genre) =>
                        genre.toLowerCase().includes(searchValue)
                    );

                const yearMatch =
                    anime.year.toString()
                        .includes(searchValue);

                return titleMatch || genreMatch || yearMatch;

            });


        console.log("Search Results:", results);

    });

}


/* =========================================================
   05. SEARCH SUGGESTIONS
========================================================= */

const suggestionButtons =
    document.querySelectorAll(
        ".search-suggestions button"
    );


suggestionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (!searchInput) return;

        searchInput.value = button.textContent;

        searchInput.dispatchEvent(
            new Event("input")
        );

        searchInput.focus();

    });

});


/* =========================================================
   06. SURPRISE ME
========================================================= */

function getRandomAnime() {

    const randomIndex =
        Math.floor(
            Math.random() * animeDatabase.length
        );

    return animeDatabase[randomIndex];

}


function showRecommendation(anime) {

    if (!anime) return;

    recommendationTitle.textContent =
        anime.title;

    recommendationMeta.textContent =
        `${anime.year} · ${anime.episodes} Episodes · ${anime.genres.join(" · ")}`;

    recommendationRating.textContent =
        anime.rating;

    recommendationDescription.textContent =
        anime.description;


    recommendationPoster.className =
        "recommendation-poster " + anime.imageClass;


    recommendationPoster.innerHTML = `
        <div class="poster-placeholder">
            ${anime.title}
        </div>
    `;


    recommendationModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function surpriseMe() {

    const anime = getRandomAnime();

    showRecommendation(anime);

}


if (heroSurprise) {

    heroSurprise.addEventListener(
        "click",
        surpriseMe
    );

}


if (navSurprise) {

    navSurprise.addEventListener(
        "click",
        surpriseMe
    );

}


if (surpriseButton) {

    surpriseButton.addEventListener(
        "click",
        surpriseMe
    );

}


if (anotherRecommendation) {

    anotherRecommendation.addEventListener(
        "click",
        surpriseMe
    );

}


/* =========================================================
   07. CLOSE RECOMMENDATION
========================================================= */

function hideRecommendation() {

    if (!recommendationModal) return;

    recommendationModal.classList.remove("show");

    document.body.style.overflow = "";

}


if (closeRecommendation) {

    closeRecommendation.addEventListener(
        "click",
        hideRecommendation
    );

}


if (recommendationModal) {

    recommendationModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                recommendationModal
            ) {

                hideRecommendation();

            }

        }
    );

}


/* =========================================================
   08. ESC KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    hideSearchModal();
    hideRecommendation();

});


/* =========================================================
   09. FAVORITE BUTTONS
========================================================= */

const favoriteButtons =
    document.querySelectorAll(
        ".favorite-btn"
    );


favoriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        const icon =
            button.querySelector("i");

        if (!icon) return;


        if (button.classList.contains("active")) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }

    });

});


/* =========================================================
   10. MOOD RECOMMENDATIONS
========================================================= */

const moodCards =
    document.querySelectorAll(
        ".mood-card"
    );


moodCards.forEach((card) => {

    card.addEventListener("click", () => {

        const mood =
            card.dataset.mood;

        const matchingAnime =
            animeDatabase.filter((anime) =>
                anime.moods.includes(mood)
            );


        if (matchingAnime.length === 0) {

            alert(
                "We couldn't find an anime for that mood yet!"
            );

            return;

        }


        const randomAnime =
            matchingAnime[
                Math.floor(
                    Math.random() *
                    matchingAnime.length
                )
            ];


        showRecommendation(randomAnime);

    });

});


/* =========================================================
   11. GENRE FILTERING
========================================================= */

const genreCards =
    document.querySelectorAll(
        ".genre-card"
    );


genreCards.forEach((card) => {

    card.addEventListener("click", () => {

        const genre =
            card
                .querySelector("strong")
                ?.textContent
                .trim();


        if (!genre) return;


        const matchingAnime =
            animeDatabase.filter((anime) =>
                anime.genres.some(
                    (animeGenre) =>
                        animeGenre.toLowerCase() ===
                        genre.toLowerCase()
                )
            );


        if (matchingAnime.length === 0) {

            alert(
                `No ${genre} anime found yet.`
            );

            return;

        }


        const randomAnime =
            matchingAnime[
                Math.floor(
                    Math.random() *
                    matchingAnime.length
                )
            ];


        showRecommendation(randomAnime);

    });

});


/* =========================================================
   12. YEAR FILTERING
========================================================= */

const yearItems =
    document.querySelectorAll(
        ".year-item"
    );


yearItems.forEach((item) => {

    item.addEventListener("click", () => {

        yearItems.forEach((year) =>
            year.classList.remove("active")
        );

        item.classList.add("active");


        const yearText =
            item
                .querySelector("strong")
                ?.textContent
                .trim();


        if (!yearText) return;


        let startYear;
        let endYear;


        if (yearText === "1990s") {

            startYear = 1990;
            endYear = 1999;

        } else if (yearText === "2000s") {

            startYear = 2000;
            endYear = 2009;

        } else if (yearText === "2010s") {

            startYear = 2010;
            endYear = 2019;

        } else if (yearText === "2020s") {

            startYear = 2020;
            endYear = 2029;

        }


        const matchingAnime =
            animeDatabase.filter(
                (anime) =>
                    anime.year >= startYear &&
                    anime.year <= endYear
            );


        if (matchingAnime.length === 0) {

            alert(
                `No anime available for ${yearText} yet.`
            );

            return;

        }


        const randomAnime =
            matchingAnime[
                Math.floor(
                    Math.random() *
                    matchingAnime.length
                )
            ];


        showRecommendation(randomAnime);

    });

});


/* =========================================================
   13. NAVIGATION ACTIVE STATE
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((navLink) =>
            navLink.classList.remove("active")
        );

        link.classList.add("active");

    });

});


/* =========================================================
   14. INTERSECTION OBSERVER
   Reveal animations while scrolling
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".anime-card, .mood-card, .genre-card, .community-card, .year-item"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach((element) => {

    element.classList.add(
        "scroll-hidden"
    );

    observer.observe(element);

});


/* =========================================================
   15. DYNAMIC SCROLL ANIMATION STYLE
========================================================= */

const animationStyle =
    document.createElement("style");


animationStyle.textContent = `

    .scroll-hidden {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(
                0.22,
                1,
                0.36,
                1
            );
    }

    .scroll-hidden.visible {
        opacity: 1;
        transform: translateY(0);
    }

`;


document.head.appendChild(
    animationStyle
);


/* =========================================================
   16. STAGGER CARD ANIMATION
========================================================= */

document
    .querySelectorAll(
        ".anime-card, .mood-card, .genre-card, .community-card"
    )
    .forEach((element, index) => {

        element.style.transitionDelay =
            `${(index % 4) * 0.08}s`;

    });


/* =========================================================
   17. HERO PARALLAX
========================================================= */

const heroArt =
    document.querySelector(
        ".hero-art"
    );


if (heroArt) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (window.innerWidth / 2 -
                    event.clientX) /
                50;

            const y =
                (window.innerHeight / 2 -
                    event.clientY) /
                50;


            heroArt.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   18. DOUBLE CLICK FAVORITE
========================================================= */

document
    .querySelectorAll(".anime-image")
    .forEach((image) => {

        image.addEventListener(
            "dblclick",
            () => {

                const favorite =
                    image.querySelector(
                        ".favorite-btn"
                    );

                if (favorite) {

                    favorite.click();

                }

            }
        );

    });


/* =========================================================
   19. SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   20. WELCOME CONSOLE
========================================================= */

console.log(`
╔══════════════════════════════════════╗
║                                      ║
║        ✦ NIMEGAMI ✦                 ║
║                                      ║
║     Anime Discovery Hub              ║
║                                      ║
║     Discover. Explore. Enjoy.        ║
║                                      ║
╚══════════════════════════════════════╝
`);


/* =========================================================
   21. INITIAL LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

