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
addAllPages(Pages)

var pageNumber = document.getElementById("page-number");
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");
var pageContainer = document.getElementById("page-container");
var current_page = null;
var page_loaded_timestamp = null;
setPage("home");


function addAllPages(PagesMap)
{
    // left
    // image
        // class="d-block align-self-start"
    // text
        // class="align-self-start"

    // center
    // image
        // class="d-block align-self-center"
    // text
        // class="align-self-center"

    // right
    // image
        // class="d-block align-self-end"
    // text
        // class="align-self-end"


    PagesMap.set("home", new Page(
        "home", "Home",
        "1", 10000, "nextlingertest",
        null, null, null,
        '<img src="./assets/home-blurb.png" class="d-block align-self-center"><p class="align-self-center">Coming Back Around is a story about a Kid and a Nutcracker.</p>'));

    PagesMap.set("1", new Page(
        "1", "1",
        "2", null, null,
        "home", null, null,
        '<img src="" class="d-block align-self-center">' +
        '<p class="align-self-center">What do I do now?</p>'));

    PagesMap.set("2", new Page(
        "2", "2 - Align testing",
        "3", null, null,
        "1", null, null,
        '<p>length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length-length</p>' +
        
        '<img src="./assets/home-blurb.png" class="d-block align-self-start">' +
        '<p class="align-self-start">this is the first piece of text on the left</p>' +
        
        '<img src="./assets/home-blurb.png" class="align-self-center">' +
        '<p class="align-self-center">this is the second piece of text in the centre</p>' +
        
        '<img src="./assets/home-blurb.png" class="align-self-end">' +
        '<p class="align-self-end">this is the third piece of text on the right</p>' +

        '<img src="./assets/home-blurb.png" class="d-block align-self-start">' +
        '<p class="align-self-start">this is the first piece of text on the left</p>' +
        
        '<img src="./assets/home-blurb.png" class="align-self-end">' +
        '<p class="align-self-end">this is the third piece of text on the right</p>' 
        
    ));

    PagesMap.set("3", new Page(
        "3", "3 - Right Align Test",
        null, null, null,
        "2", null, null,
        null));

    PagesMap.set("nextlingertest", new Page(
        "nextlingertest", "next_test Title",
        null, null, null,
        "home", 5000, "evilhome",
        '<p>waited 10 secs and went forward</p>'));

    PagesMap.set("evilhome", new Page(
        "evilhome", "EVILLLLLlll",
        "normalp1", null, null,
        null, null, null,
        '<p>EVILL HOMEE >:))))</p>'));
}


function setPage(page_id)
{
    nextButton.disabled = true;
    prevButton.disabled = true;
    pageContainer.innerHTML = "Loading...";

    current_page = Pages.get(page_id);

    // Add content to page container
    if (current_page.story_content == null)
        pageContainer.innerHTML = '<h1>error, no current_page.story_content for id[' + current_page.id + ']</h1>';
    else
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