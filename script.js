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

// Text goes between elements
const p_home =  '<p class="align-self-center">Coming Back Around is a story about a <span class="kid">Kid</span> and a <span class="nutcracker">Nutcracker</span>.</p>';

const p_left = ['<p class="align-self-start">', '</p>'];
const p_center = ['<p class="align-self-center">', '</p>'];
const p_right = ['<p class="align-self-end">', '</p>'];

const k_left = ['<p class="kid align-self-start"><img src="./assets/kid-headshot.png" style="height:1em; width:auto; object-fit:cover; vertical-align:middle;"> ', '</p>'];
const k_center = ['<p class="kid align-self-center"><img src="./assets/kid-headshot.png" style="height:1em; width:auto; object-fit:cover; vertical-align:middle;"> ', '</p>'];
const k_right = ['<p class="kid align-self-end"><img src="./assets/kid-headshot.png" style="height:1em; width:auto; object-fit:cover; vertical-align:middle;"> ', '</p>'];

const n_left = ['<p class="nutcracker align-self-start">', ' <img src="./assets/nutcracker-headshot.png" style="height:1em; width:auto; object-fit:cover; vertical-align:middle;"></p>'];
const n_center = ['<p class="nutcracker align-self-center">', ' <img src="./assets/nutcracker-headshot.png" style="height:1em; width:auto; object-fit:cover; vertical-align:middle;"></p>'];
const n_right = ['<p class="nutcracker align-self-end">', ' <img src="./assets/nutcracker-headshot.png" style="height:1em; width:auto; object-fit:cover; vertical-align:middle;"></p>'];

// Image location goes between elements
const img_left = ['<img class="d-block align-self-start" src=', '>'];
const img_center = ['<img class="d-block align-self-center" src=', '>'];
const img_right = ['<img class="d-block align-self-end" src=', '>'];

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
        "1", null, null,
        null, null, null,
        '<img center "./assets/home-blurb.png">' +
        '<p home></p>' +
        '<k left>"Are you interested?"</k>' +
        '<n right>I KNOW I AM</n>'));


    PagesMap.set("1", new Page(
        "1", "1",
        "2", null, null,
        "home", null, null,
        '<img center "./assets/home-blurb.png">' +
        '<p center>"What do I do now?"</p>'));


    PagesMap.set("2", new Page(
        "2", "2",
        "3", null, null,
        "1", null, null,
        '<img left "./assets/home-blurb.png">' +
        '<p left>"They wanted me to do my work."</p>'+
        '<p left>"I guess I\'ll do my work."</p>'));

    // 2a


    PagesMap.set("3", new Page(
        "3", "3",
        "4", null, null,
        "2", null, null,
        '<img left "./assets/home-blurb.png">' +
        '<p left>"This is easy."</p>'+
        
        '<img center "./assets/home-blurb.png">' +
        '<p center>"I don\'t want to do this."</p>' +
        
        '<img right "./assets/home-blurb.png">'));


    PagesMap.set("4", new Page(
        "4", "4",
        "5", null, null,
        "3", null, null,
        '<img center "./assets/home-blurb.png">'));


    PagesMap.set("5", new Page(
        "5", "5",
        "6", null, null,
        "4", null, null,
        '<img left "./assets/home-blurb.png">' +
        '<img center "./assets/home-blurb.png">'));


    PagesMap.set("6", new Page(
        "6", "6",
        null, null, null,
        "5", null, null,
        '<img center "./assets/home-blurb.png">' +
        '<p center>What do I do now?</p>'));
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
        pageContainer.innerHTML = generateBootstrap(current_page.story_content);

    // Set Buttons
    nextButton.disabled = current_page.next == null ? true : false;
    pageNumber.innerHTML = current_page.display_page_number;
    prevButton.disabled = current_page.prev == null ? true : false;

    page_loaded_timestamp = Date.now();
}


function generateBootstrap(story_content_string)
{
    // <p left>Lorem ipsum</p> = <p class="align-self-start">Lorem ipsum</p>
    // <p center>Lorem ipsum</p> = <p class="align-self-center">Lorem ipsum</p>
    // <p right>Lorem ipsum</p> = <p class="align-self-end">Lorem ipsum</p>
    // <img left "./assets/home-blurb.png"> = <img src="./assets/home-blurb.png" class="d-block align-self-left">
    // <img center "./assets/home-blurb.png"> = <img src="./assets/home-blurb.png" class="d-block align-self-center">
    // <img right "./assets/home-blurb.png"> = <img src="./assets/home-blurb.png" class="d-block align-self-end">

    let raw_html_out = story_content_string

    // replace shorthand with regex
    raw_html_out = raw_html_out.replace(/<p home>([\s\S]*?)<\/p>/g, p_home)

    raw_html_out = raw_html_out.replace(/<p left>([\s\S]*?)<\/p>/g, p_left[0] + '$1' + p_left[1])
    raw_html_out = raw_html_out.replace(/<p center>([\s\S]*?)<\/p>/g, p_center[0] + '$1' + p_center[1])
    raw_html_out = raw_html_out.replace(/<p right>([\s\S]*?)<\/p>/g, p_right[0] + '$1' + p_right[1])

    raw_html_out = raw_html_out.replace(/<k left>([\s\S]*?)<\/k>/g, k_left[0] + '$1' + k_left[1])
    raw_html_out = raw_html_out.replace(/<k center>([\s\S]*?)<\/k>/g, k_center[0] + '$1' + k_center[1])
    raw_html_out = raw_html_out.replace(/<k right>([\s\S]*?)<\/k>/g, k_right[0] + '$1' + k_right[1])

    raw_html_out = raw_html_out.replace(/<n left>([\s\S]*?)<\/n>/g, n_left[0] + '$1' + n_left[1])
    raw_html_out = raw_html_out.replace(/<n center>([\s\S]*?)<\/n>/g, n_center[0] + '$1' + n_center[1])
    raw_html_out = raw_html_out.replace(/<n right>([\s\S]*?)<\/n>/g, n_right[0] + '$1' + n_right[1])

    raw_html_out = raw_html_out.replace(/<img left "([^"]+)">/g, img_left[0] + '"$1"' + img_left[1])
    raw_html_out = raw_html_out.replace(/<img center "([^"]+)">/g, img_center[0] + '"$1"' + img_center[1])
    raw_html_out = raw_html_out.replace(/<img right "([^"]+)">/g, img_right[0] + '"$1"' + img_right[1])

    return raw_html_out
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