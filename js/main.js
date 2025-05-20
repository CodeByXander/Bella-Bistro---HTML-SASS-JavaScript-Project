const saveBtns = document.querySelectorAll(".overlay-btn");
const savedList = document.querySelector(".saved-list");
const clearBtn = document.querySelector(".clear-list");
const likeBtn = document.querySelectorAll(".like");
const commentBtn = document.querySelector(".comment-btn");

let saveForLater = [];
let liked = [];
let comments = [];

// Set session storage
function onLoad() {
  if (sessionStorage.getItem("firstLoad") === null) {
    sessionStorage.setItem("saveForLater", JSON.stringify(saveForLater));
    sessionStorage.setItem("liked", JSON.stringify(liked));
    sessionStorage.setItem("comments", JSON.stringify(comments));
    sessionStorage.setItem("firstLoad", false);
  } else {
    saveForLater = JSON.parse(sessionStorage.getItem("saveForLater"));
    liked = JSON.parse(sessionStorage.getItem("liked"));
    comments = JSON.parse(sessionStorage.getItem("comments"));
  }
  addItemsToDOM(saveForLater);
}

// Add items to DOM
function addItemsToDOM(items) {
  const savedList = document.querySelector(".saved-list");
  saveForLater = JSON.parse(sessionStorage.getItem("saveForLater"));

  if (saveForLater.length !== 0) {
    saveForLater.forEach((item) => {
      if (item.substring(0, 2) === "./") {
        const newLi = `<li class="saved-item-img"><img class="saved-img" src=".${item} ></li>`;
        savedList.innerHTML += newLi;
      } else {
        const newLi = `<li class="saved-item-text">${item}</li>`;
        savedList.innerHTML += newLi;
      }
    });
  }
}

// Add items to storage
function addToStorage(e) {
  saveForLater = JSON.parse(sessionStorage.getItem("saveForLater"));

  if (e.target.parentElement.tagName === "TD") {
    const parentElement = e.target.parentElement;
    const targetElement = parentElement.querySelector("h4");
    const textContent = targetElement.textContent;
    saveForLater.push(textContent);
  } else {
    const parentElement = e.target.parentElement.parentElement;
    const targetElement = parentElement.querySelector("img");
    const end = targetElement.outerHTML.length - 1;
    saveForLater.push(targetElement.outerHTML.substring(10, end));
  }
  alert(`You have ${saveForLater.length} items saved`);
  sessionStorage.setItem("saveForLater", JSON.stringify(saveForLater));
  refreshDOM();
}

// Refresh DOM
function refreshDOM() {
  const savedList = document.querySelector(".saved-list");
  savedList.innerHTML = "";
  addItemsToDOM(saveForLater);
}

// Clear items from storage and DOM
if (clearBtn) {
  clearBtn.addEventListener("click", function () {
    saveForLater = JSON.parse(sessionStorage.getItem("saveForLater"));
    saveForLater = [];
    sessionStorage.setItem("saveForLater", JSON.stringify(saveForLater));
    refreshDOM();

    $("#clear").addClass("hidden");
  });
}

// Show/hide clear button
$(document).ready(function () {
  if (saveForLater.length === 0) {
    $("#clear").addClass("hidden");
  } else {
    $("#clear").removeClass("hidden");
  }
});

// Animation effect on CTA buttons
$(".rt , .vm, .comment-btn").hover(function () {
  $(this)
    .animate({ left: "-5px" }, 100)
    .animate({ left: "5px" }, 100)
    .animate({ left: "-5px" }, 100)
    .animate({ left: "5px" }, 100)
    .animate({ left: "0px" }, 100);
});

// Like feature for images
function addToLiked(e) {
  const target = e.target.parentElement.parentElement.parentElement;
  const targetImg = target.querySelector("img").outerHTML;

  liked = JSON.parse(sessionStorage.getItem("liked"));
  liked.push(targetImg);
  sessionStorage.setItem("liked", JSON.stringify(liked));
}

// Comment box
function addToComments() {
  comments = JSON.parse(sessionStorage.getItem("comments"));
  const comment = document.querySelector("#comment").value;

  if (comment !== "") {
    comments.push(comment);
    document.querySelector("#comment").value = "";
  }

  sessionStorage.setItem("comments", JSON.stringify(comments));
}

// Dropdown for take away button
$("#takeaway-btn").click(function () {
  $("#takeaway-info").slideToggle(300);
});

// Event Listeners
document.addEventListener("DOMContentLoaded", onLoad);
saveBtns.forEach((btn) => {
  btn.addEventListener("click", addToStorage);
});
likeBtn.forEach((btn) => {
  btn.addEventListener("click", addToLiked);
});
if (commentBtn) {
  commentBtn.addEventListener("click", addToComments);
}
$(commentBtn).click(function () {
  $("#popup").fadeIn(300).delay(1500).fadeOut(300);
});
