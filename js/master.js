// check if there Local storage Color option
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.querySelectorAll(".colors-list li.active").forEach(element => {
        element.classList.remove("active");
    });
    document.querySelector(".colors-list li[data-color='" + mainColor + "']").classList.add("active");
}

// check if there Local storage random background option
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalOption = localStorage.getItem("background_option");
const randomBackgroundElement = document.querySelectorAll(".option-box .random-backgrounds span");

if (backgroundLocalOption !== null) {
    if (backgroundLocalOption === "true") backgroundOption = true;
    else if (backgroundLocalOption === "false") backgroundOption = false;
    randomBackgroundElement.forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalOption === "true") {
        document.querySelector(".option-box .random-backgrounds .yes").classList.add("active");
    }
    else if (backgroundLocalOption === "false") {
        document.querySelector(".option-box .random-backgrounds .no").classList.add("active");
    }
}

// Toggle spin class on gear icon
document.querySelector(".toggle-settings i").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("opened");
};

// Switch colors
const colorsLi = document.querySelectorAll(".option-box .colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});

// Switch random background option
randomBackgroundElement.forEach(span => {
    span.addEventListener("click", (e)=>{
        handleActive(e);
        if (e.target.dataset.randomBackground === "yes")  backgroundOption = true;
        else if (e.target.dataset.randomBackground === "no") backgroundOption = false;
        randomizeImages();
        localStorage.setItem("background_option", backgroundOption);
    });
});

// change landing page background
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Random background option
function randomizeImages() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = `url(images/${imgsArray[randomNumber]})`;
        
        }, 5000);
    } else {
        clearInterval(backgroundInterval);
    }
}
randomizeImages();

// skills animation
let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

// Create Popup with image
let galleryImages = document.querySelectorAll(".gallery img");
galleryImages.forEach(image => {
    image.addEventListener("click", function(event) {
        // create overlay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        // create popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if (image.alt !== null) {
            let imageHeading = document.createElement("h3");
            let imageText = document.createTextNode(image.alt);
            imageHeading.appendChild(imageText);
            popupBox.appendChild(imageHeading);
        }
        let popupImage = document.createElement("img");
        popupImage.src = image.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        // create the close span
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);
    });
});
// close popup
document.addEventListener("click", function(e) {
    if (e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});


// Scroll to Section Function
function scrollToSection(elements){
    elements.forEach(element => {
        element.addEventListener("click", (e)=> {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

// Nav bullets
const navBullets = document.querySelectorAll(".nav-bullets .bullets");
// Nav Menu
const navMenu = document.querySelectorAll(".header-links a");

scrollToSection(navBullets);
scrollToSection(navMenu);

// Handle Active State
function handleActive(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    event.target.classList.add("active");
}

// Show / Hide Bullets Option
const toggleBullets = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    toggleBullets.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === "show") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

toggleBullets.forEach(toggleBullet => {
    toggleBullet.addEventListener("click", function(e) {
        if (toggleBullet.dataset.display === "yes") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "show");
        }
        else if (toggleBullet.dataset.display === "no") {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "hide");
        }
        handleActive(e);
    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function() {
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullet_option");

    window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".header-area .toggle-menu");
let menuLinks = document.querySelector(".header-area .header-links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    menuLinks.classList.toggle("open");
};

// click anywhere outside to toggle menu
document.addEventListener("click", function(e){
    if (e.target !== toggleBtn && e.target !== menuLinks) {
        if (menuLinks.classList.contains("open")) {
            menuLinks.classList.remove("open");
        }
    }
});