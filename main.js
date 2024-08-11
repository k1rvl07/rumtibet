function openMenu() {
  const menu = document.querySelector(".header__menu");
  menu.style.display = "block";
}

function closeMenu() {
  const menu = document.querySelector(".header__menu");
  menu.style.display = "none";
}

const slider = document.querySelector(".slider");
let currentSlide = 0;
let startX, endX, swipeDistance;

function isPointInsideElement(pointX, element) {
  const rect = element.getBoundingClientRect();
  return pointX >= rect.left && pointX <= rect.right;
}

slider.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  if (!isPointInsideElement(startX, slider)) {
    startX = null; 
  }
});

slider.addEventListener("touchmove", (event) => {
  if (startX !== null) {
    endX = event.touches[0].clientX;
    if (isPointInsideElement(endX, slider)) {
      swipeDistance = Math.abs(endX - startX);
    } else {
      endX = null; 
    }
  }
});

slider.addEventListener("touchend", () => {
  if (swipeDistance > 1 && startX !== null && endX !== null) {
    if (endX < startX) {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  }
  startX = endX = swipeDistance = null;
});
function sizeChange(button) {
  const row = button.parentNode;
  const buttons = row.querySelectorAll(".images-container__button");
  let enlargedButton = null;
  buttons.forEach((btn) => {
    if (btn.style.width === "580px") {
      enlargedButton = btn;
    }
  });

  if (enlargedButton === button) {
    return;
  }

  if (enlargedButton && enlargedButton !== button) {
    const enlargedImg = enlargedButton.querySelector(
      ".images-container__image"
    );
    if (enlargedImg.src.endsWith("LG.png")) {
      enlargedImg.src = enlargedImg.src.replace("LG.png", ".png");
    }
    enlargedButton.style.width = "280px";
  }

  const img = button.querySelector(".images-container__image");
  if (img.src.endsWith(".png")) {
    img.src = img.src.replace(".png", "LG.png");
  }
  button.style.width = "580px";
}

window.onload = function () {
  const firstRow = document.querySelector(
    ".images-container__row:first-of-type"
  );
  const firstButton = firstRow.querySelector(
    ".images-container__button:first-of-type"
  );
  sizeChange(firstButton);

  const secondRow = document.querySelector(
    ".images-container__row:nth-of-type(2)"
  );
  const secondButton = secondRow.querySelector(
    ".images-container__button:nth-of-type(2)"
  );
  sizeChange(secondButton);
};

const mediaQuery = window.matchMedia("(min-width: 1180px)");

if (mediaQuery.matches) {
  document.querySelector(".mail__heading").textContent =
    "Получайте полезные рассылки о путешествиях";
} else {
  document.querySelector(".mail__heading").textContent =
    "Полезные рассылки о путешествиях";
}

mediaQuery.addEventListener("change", function (event) {
  if (event.matches) {
    document.querySelector(".mail__heading").textContent =
      "Получайте полезные рассылки о путешествиях";
  } else {
    document.querySelector(".mail__heading").textContent =
      "Полезные рассылки о путешествиях";
  }
});


