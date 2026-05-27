class Page
{
    constructor(id, display_page_number,
        next, next_linger, next_alt,
        prev, prev_linger, prev_alt,
        story_content)
    {
        this.id = id;
        this.display_page_number = display_page_number;
        this.next = next;
        this.next_linger = next_linger;
        this.next_alt = next_alt;
        this.prev = prev;
        this.prev_linger = prev_linger;
        this.prev_alt = prev_alt;
        this.story_content = story_content;
    }
}

var Pages = new Map();
Pages.set("home", new Page(
    "home", "Home",
    "normalp1", 10000, "nextlingertest",
    null, null, null,
    '<img src="./assets/home-blurb.png"><p>Coming Back Around is a story about a Kid and a Nutcracker.</p>'));

Pages.set("normalp1", new Page(
    "normalp1", "1",
    null, null, null,
    "home", null, null,
    '<p>page 1</p>'));

Pages.set("nextlingertest", new Page(
    "nextlingertest", "next_test Title",
    null, null, null,
    "home", 5000, "evilhome",
    '<p>waited 10 secs and went forward</p>'));

Pages.set("evilhome", new Page(
    "evilhome", "EVILLLLLlll",
    "normalp1", null, null,
    null, null, null,
    '<p>EVILL HOMEE >:))))</p>'));

var pageNumber = document.getElementById("page-number");
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");
var pageContainer = document.getElementById("page-container");
var current_page = null;
var page_loaded_timestamp = null;
setPage("home");


function setPage(page_id)
{
    nextButton.disabled = true;
    prevButton.disabled = true;
    pageContainer.innerHTML = "Loading...";

    current_page = Pages.get(page_id);

    // Add content to page container
    pageContainer.innerHTML = current_page.story_content;

    // Set Buttons
    nextButton.disabled = current_page.next == null ? true : false;
    pageNumber.innerHTML = current_page.display_page_number;
    prevButton.disabled = current_page.prev == null ? true : false;

    page_loaded_timestamp = Date.now();
}


function nextPage()
{
    console.log("page load", page_loaded_timestamp)
    console.log("now", Date.now())
    console.log("time on page", Date.now() - page_loaded_timestamp)
    console.log("current page next linger", current_page.next_linger)
    // See if this page has been viewed for its next_linger
    if (current_page.next_linger != null && Date.now() - page_loaded_timestamp >= current_page.next_linger)
    {
        setPage(current_page.next_alt)
    }

    else
    {
        setPage(current_page.next)
    }
}


function prevPage()
{
    console.log("page load", page_loaded_timestamp)
    console.log("now", Date.now())
    console.log("time on page", Date.now() - page_loaded_timestamp)
    console.log("current page next linger", current_page.next_linger)
    // See if this page has been viewed for its prev_linger
    if (current_page.prev_linger != null && Date.now() - page_loaded_timestamp >= current_page.prev_linger)
    {
        setPage(current_page.prev_alt)
    }

    else
    {
        setPage(current_page.prev)
    }
}