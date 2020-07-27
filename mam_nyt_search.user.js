// ==UserScript==
// @name        NYT Search On MAM
// @namespace   NYT_SearchMAM
// @match       https://www.nytimes.com/books/best-sellers/*
// @grant       none
// @run-at      document-idle
// @version     1.0
// @author      Mickkey
// @description This script add a "Search On MAM" button for books on NYT Best-sellers pages
// ==/UserScript==
if (RegExp("https://www.nytimes.com/books/best-sellers/(?=$|[0-9]{4}/[0-9]{2}/[0-9]{2}/$)").test(window.location.href)) {
    formatMainPage();
}
else if (RegExp("https://www.nytimes.com/books/best-sellers/*/").test(window.location.href)) {
    formatCategoryPage();
}

function formatMainPage() {
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let buttonParentDiv = document.createElement("div");
    let searchOnMAMButton = document.createElement("button");
    div1.className = "css-1j7meuk";
    div2.className = "css-rp3ceh";
    buttonParentDiv.className = "css-79elbk";
    searchOnMAMButton.className = "css-80zux2 mam-button";
    searchOnMAMButton.innerText = "Search on MAM";

    div1.appendChild(div2);
    div2.appendChild(buttonParentDiv);
    buttonParentDiv.appendChild(searchOnMAMButton);

    let booksLists = document.querySelectorAll(".css-v39h9q");
    booksLists.forEach(bookList => {
        let bookLiElements = bookList.querySelectorAll(".css-1mr03gh");
        bookLiElements.forEach(bookLi => {
            let bookTitle = bookLi.querySelector("h3").innerText;
            let author = bookLi.querySelector("p[itemprop='author']").innerText.substring(3);
            searchOnMAMButton.setAttribute("onclick", `window.open('https://www.myanonamouse.net/tor/browse.php?tor[text]=${bookTitle} ${author}')`);
            bookLi.appendChild(div1.cloneNode(true));
        })
    })
}

function formatCategoryPage() {
    let divButtonContainer = document.createElement("div");
    let searchOnMAMButton = document.createElement("button");
    divButtonContainer.className = "css-79elbk";
    searchOnMAMButton.className = "css-80zux2";
    searchOnMAMButton.innerText = "Search On MAM";

    divButtonContainer.appendChild(searchOnMAMButton);

    let booksListElements = document.querySelectorAll(".css-13y32ub");
    booksListElements.forEach(bookList => {
        let bookTitle = bookList.querySelector("h3").innerText;
        let author = bookList.querySelector("p[itemprop='author']").innerText.substring(3);
        searchOnMAMButton.setAttribute("onclick", `window.open('https://www.myanonamouse.net/tor/browse.php?tor[text]=${bookTitle} ${author}')`);
        bookList.querySelector(".css-fugswm").appendChild(divButtonContainer.cloneNode(true));
    })
}