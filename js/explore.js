/* =========================================================
   NIMEGAMI — EXPLORE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ANIME DATA
    ===================================================== */

    const animeData = [
        {
            title: "Moonlit Memories",
            genre: "Romance",
            genres: ["Romance", "Drama", "Fantasy"],
            rating: "9.1",
            year: "2024",
            mood: ["romance", "sad", "comfort"],
            description:
                "A beautiful story about friendship, memories, dreams, and a love that slowly changes everything."
        },

        {
            title: "Crimson Horizon",
            genre: "Action",
            genres: ["Action", "Adventure", "Fantasy"],
            rating: "8.8",
            year: "2023",
            mood: ["action"],
            description:
                "A thrilling adventure where fearless heroes face powerful enemies and fight for a world worth protecting."
        },

        {
            title: "Dreaming Sakura",
            genre: "Slice of Life",
            genres: ["Slice of Life", "Romance"],
            rating: "8.7",
            year: "2022",
            mood: ["happy", "romance", "comfort"],
            description:
                "A warm and gentle story about friendship, school life, dreams, and the little moments that become unforgettable."
        },

        {
            title: "Shadow of Tomorrow",
            genre: "Mystery",
            genres: ["Mystery", "Action", "Sci-Fi"],
            rating: "9.0",
            year: "2025",
            mood: ["mystery", "action"],
            description:
                "A mysterious journey through secrets, strange discoveries, and a future that may not be what it seems."
        },

        {
            title: "Whispers of Eden",
            genre: "Fantasy",
            genres: ["Fantasy", "Adventure", "Drama"],
            rating: "8.9",
            year: "2021",
            mood: ["comfort", "sad"],
            description:
                "A fantasy adventure about finding hope in a forgotten world filled with ancient secrets."
        },

        {
            title: "Summer After Rain",
            genre: "Romance",
            genres: ["Romance", "Slice of Life"],
            rating: "8.6",
            year: "2020",
            mood: ["romance", "happy", "comfort"],
            description:
                "Two friends discover that growing up means learning to appreciate the people who have always been there."
        }
    ];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchModal =
        document.getElementById("searchModal");

    const openSearch =
        document.getElementById("openSearch");

    const closeSearch =
        document.getElementById("closeSearch");

    const animeSearch =
        document.getElementById("animeSearch");

    const searchResults =
        document.getElementById("searchResults");

    const recommendationModal =
        document.getElementById("recommendationModal");

    const closeRecommendation =
        document.getElementById("closeRecommendation");

    const recommendationTitle =
        document.getElementById("recommendationTitle");

    const recommendationMeta =
        document.getElementById("recommendationMeta");

    const recommendationRating =
        document.getElementById("recommendationRating");

    const recommendationDescription =
        document.getElementById("recommendationDescription");

    const heroSurprise =
        document.getElementById("heroSurprise");

    const navSurprise =
        document.getElementById("navSurprise");

    const bigSurprise =
        document.getElementById("bigSurprise");

    const recommendationAction =
        document.getElementById("recommendationAction");


    /* =====================================================
       FAVORITES
    ===================================================== */

    let favorites =
        JSON.parse(
            localStorage.getItem("nimegamiFavorites")
        ) || [];


    function saveFavorites() {

        localStorage.setItem(
            "nimegamiFavorites",
            JSON.stringify(favorites)
        );

    }


    function updateFavoriteButton(button) {

        const animeName =
            button.dataset.anime;

        const icon =
            button.querySelector("i");

        const isFavorite =
            favorites.includes(animeName);


        if (isFavorite) {

            button.classList.add("active");

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        } else {

            button.classList.remove("active");

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }

    }


    function initializeFavorites() {

        const buttons =
            document.querySelectorAll(
                ".favorite-btn"
            );

        buttons.forEach(button => {

            updateFavoriteButton(button);

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const animeName =
                        button.dataset.anime;


                    if (
                        favorites.includes(
                            animeName
                        )
                    ) {

                        favorites =
                            favorites.filter(
                                item =>
                                    item !== animeName
                            );

                        showToast(
                            `${animeName} removed from favorites.`
                        );

                    } else {

                        favorites.push(
                            animeName
                        );

                        showToast(
                            `${animeName} added to favorites ❤️`
                        );

                    }


                    saveFavorites();

                    updateFavoriteButton(
                        button
                    );

                }
            );

        });

    }


    initializeFavorites();



    /* =====================================================
       SEARCH MODAL
    ===================================================== */

    function openSearchModal() {

        if (!searchModal) return;

        searchModal.classList.add("show");

        searchModal.setAttribute(
            "aria-hidden",
            "false"
        );


        setTimeout(() => {

            animeSearch?.focus();

        }, 200);

    }


    function closeSearchModal() {

        if (!searchModal) return;

        searchModal.classList.remove("show");

        searchModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    openSearch?.addEventListener(
        "click",
        openSearchModal
    );


    closeSearch?.addEventListener(
        "click",
        closeSearchModal
    );


    searchModal?.addEventListener(
        "click",
        event => {

            if (
                event.target === searchModal
            ) {

                closeSearchModal();

            }

        }
    );



    /* =====================================================
       SEARCH FUNCTION
    ===================================================== */

    function searchAnime(query) {

        query =
            query.trim().toLowerCase();


        if (!query) {

            searchResults.style.display =
                "none";

            searchResults.innerHTML = "";

            return;

        }


        const results =
            animeData.filter(anime => {

                const title =
                    anime.title.toLowerCase();

                const genre =
                    anime.genre.toLowerCase();

                const genres =
                    anime.genres.join(" ")
                        .toLowerCase();


                return (
                    title.includes(query) ||
                    genre.includes(query) ||
                    genres.includes(query)
                );

            });


        displaySearchResults(results);

    }


    function displaySearchResults(results) {

        searchResults.style.display =
            "block";


        if (!results.length) {

            searchResults.innerHTML = `
                <div
                    style="
                        padding: 20px;
                        text-align: center;
                        color: var(--gray);
                    "
                >
                    <i
                        class="fa-solid fa-face-sad-tear"
                        style="
                            font-size: 25px;
                            margin-bottom: 10px;
                        "
                    ></i>

                    <p>
                        No anime found.
                    </p>

                    <small>
                        Try another title or genre.
                    </small>
                </div>
            `;

            return;

        }


        searchResults.innerHTML =
            results.map(anime => `

                <button
                    class="search-result-item"
                    data-title="${anime.title}"
                    style="
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 15px;
                        padding: 15px;
                        margin-bottom: 8px;
                        border-radius: 14px;
                        background: var(--cream);
                        text-align: left;
                    "
                >

                    <div>

                        <strong>
                            ${anime.title}
                        </strong>

                        <div
                            style="
                                margin-top: 4px;
                                color: var(--gray);
                                font-size: 11px;
                            "
                        >
                            ${anime.genres.join(" • ")}
                        </div>

                    </div>

                    <span
                        style="
                            font-weight: 800;
                            color: var(--orange-dark);
                        "
                    >
                        ★ ${anime.rating}
                    </span>

                </button>

            `).join("");


        document
            .querySelectorAll(
                ".search-result-item"
            )
            .forEach(item => {

                item.addEventListener(
                    "click",
                    () => {

                        const anime =
                            animeData.find(
                                a =>
                                    a.title ===
                                    item.dataset.title
                            );

                        if (anime) {

                            closeSearchModal();

                            showRecommendation(
                                anime
                            );

                        }

                    }
                );

            });

    }


    animeSearch?.addEventListener(
        "input",
        event => {

            searchAnime(
                event.target.value
            );

        }
    );



    /* =====================================================
       SEARCH SUGGESTIONS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-search]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const query =
                        button.dataset.search;

                    animeSearch.value =
                        query;

                    searchAnime(query);

                }
            );

        });



    /* =====================================================
       RECOMMENDATION MODAL
    ===================================================== */

    function showRecommendation(anime) {

        if (!recommendationModal) return;


        recommendationTitle.textContent =
            anime.title;

        recommendationMeta.textContent =
            `${anime.genres.join(" • ")} • ${anime.year}`;

        recommendationRating.textContent =
            anime.rating;

        recommendationDescription.textContent =
            anime.description;


        recommendationModal.classList.add(
            "show"
        );

        recommendationModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeRecommendationModal() {

        if (!recommendationModal) return;

        recommendationModal.classList.remove(
            "show"
        );

        recommendationModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    closeRecommendation?.addEventListener(
        "click",
        closeRecommendationModal
    );


    recommendationModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                recommendationModal
            ) {

                closeRecommendationModal();

            }

        }
    );



    /* =====================================================
       ANIME CARD CLICK
    ===================================================== */

    document
        .querySelectorAll(
            ".anime-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".favorite-btn"
                        )
                    ) {
                        return;
                    }


                    const title =
                        card.dataset.title;


                    const anime =
                        animeData.find(
                            item =>
                                item.title ===
                                title
                        );


                    if (anime) {

                        showRecommendation(
                            anime
                        );

                    }

                }
            );

        });



    /* =====================================================
       SURPRISE ME
    ===================================================== */

    function surpriseMe() {

        const randomIndex =
            Math.floor(
                Math.random() *
                animeData.length
            );


        const randomAnime =
            animeData[randomIndex];


        showRecommendation(
            randomAnime
        );

    }


    navSurprise?.addEventListener(
        "click",
        surpriseMe
    );


    heroSurprise?.addEventListener(
        "click",
        surpriseMe
    );


    bigSurprise?.addEventListener(
        "click",
        surpriseMe
    );


    recommendationAction?.addEventListener(
        "click",
        () => {

            closeRecommendationModal();

            document
                .getElementById("anime")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );



    /* =====================================================
       MOOD FILTER
    ===================================================== */

    document
        .querySelectorAll(
            ".mood-card"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const mood =
                        button.dataset.mood;


                    const results =
                        animeData.filter(
                            anime =>
                                anime.mood.includes(
                                    mood
                                )
                        );


                    if (results.length) {

                        showRecommendation(
                            results[
                                Math.floor(
                                    Math.random() *
                                    results.length
                                )
                            ]
                        );

                    } else {

                        showToast(
                            "No recommendations for this mood yet."
                        );

                    }

                }
            );

        });



    /* =====================================================
       GENRE FILTER
    ===================================================== */

    document
        .querySelectorAll(
            ".genre-card"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const genre =
                        button.dataset.genre;


                    const results =
                        animeData.filter(
                            anime =>
                                anime.genres
                                    .some(
                                        item =>
                                            item.toLowerCase() ===
                                            genre.toLowerCase()
                                    )
                        );


                    if (results.length) {

                        showRecommendation(
                            results[
                                Math.floor(
                                    Math.random() *
                                    results.length
                                )
                            ]
                        );

                    } else {

                        showToast(
                            `No ${genre} recommendations yet.`
                        );

                    }

                }
            );

        });



    /* =====================================================
       YEAR FILTER
    ===================================================== */

    document
        .querySelectorAll(
            ".year-item"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".year-item"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );


                    button.classList.add(
                        "active"
                    );


                    const yearRange =
                        button.dataset.year;


                    let results = [];


                    if (
                        yearRange ===
                        "1990s"
                    ) {

                        results =
                            animeData.filter(
                                anime =>
                                    anime.year >=
                                    "1990" &&
                                    anime.year <=
                                    "1999"
                            );

                    } else if (
                        yearRange ===
                        "2000s"
                    ) {

                        results =
                            animeData.filter(
                                anime =>
                                    anime.year >=
                                    "2000" &&
                                    anime.year <=
                                    "2009"
                            );

                    } else if (
                        yearRange ===
                        "2010s"
                    ) {

                        results =
                            animeData.filter(
                                anime =>
                                    anime.year >=
                                    "2010" &&
                                    anime.year <=
                                    "2019"
                            );

                    } else if (
                        yearRange ===
                        "2020s"
                    ) {

                        results =
                            animeData.filter(
                                anime =>
                                    anime.year >=
                                    "2020" &&
                                    anime.year <=
                                    "2029"
                            );

                    }


                    if (results.length) {

                        showRecommendation(
                            results[
                                Math.floor(
                                    Math.random() *
                                    results.length
                                )
                            ]
                        );

                    } else {

                        showToast(
                            `No anime available for the ${yearRange} yet.`
                        );

                    }

                }
            );

        });



    /* =====================================================
       VIEW ALL ANIME
    ===================================================== */

    document
        .getElementById("viewAllAnime")
        ?.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".anime-card"
                    )
                    .forEach(card => {

                        card.style.display =
                            "block";

                    });


                document
                    .getElementById("anime")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });


                showToast(
                    "Showing all available anime ✨"
                );

            }
        );



    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeSearchModal();

                closeRecommendationModal();

            }

        }
    );



    /* =====================================================
       TOAST NOTIFICATION
    ===================================================== */

    function showToast(message) {

        const existingToast =
            document.querySelector(
                ".nimegami-toast"
            );


        existingToast?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "nimegami-toast";


        toast.innerHTML = `
            <i class="fa-solid fa-sparkles"></i>
            <span>${message}</span>
        `;


        Object.assign(
            toast.style,
            {
                position: "fixed",
                left: "50%",
                bottom: "30px",
                transform:
                    "translateX(-50%) translateY(20px)",
                zIndex: "9999",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 20px",
                borderRadius: "100px",
                background: "#252321",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "700",
                boxShadow:
                    "0 15px 40px rgba(0,0,0,0.2)",
                opacity: "0",
                transition:
                    "all 0.35s ease"
            }
        );


        document.body.appendChild(
            toast
        );


        requestAnimationFrame(() => {

            toast.style.opacity = "1";

            toast.style.transform =
                "translateX(-50%) translateY(0)";

        });


        setTimeout(() => {

            toast.style.opacity = "0";

            toast.style.transform =
                "translateX(-50%) translateY(20px)";


            setTimeout(() => {

                toast.remove();

            }, 350);

        }, 2500);

    }



    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
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
                            behavior: "smooth"
                        });

                    }

                }
            );

        });



    /* =====================================================
       PAGE LOAD
    ===================================================== */

    console.log(
        "✨ NIMEGAMI Explore initialized!"
    );

    console.log(
        `📚 ${animeData.length} anime loaded.`
    );

});