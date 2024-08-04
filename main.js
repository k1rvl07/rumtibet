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

// Функция для проверки, находится ли точка внутри элемента
function isPointInsideElement(pointX, element) {
  const rect = element.getBoundingClientRect();
  return pointX >= rect.left && pointX <= rect.right;
}

// Add event listeners for touchstart and touchmove
slider.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  if (!isPointInsideElement(startX, slider)) {
    startX = null; // Если начальная точка не внутри слайдера, сбрасываем startX
  }
});

slider.addEventListener("touchmove", (event) => {
  if (startX !== null) {
    endX = event.touches[0].clientX;
    if (isPointInsideElement(endX, slider)) {
      swipeDistance = Math.abs(endX - startX);
    } else {
      endX = null; // Если конечная точка не внутри слайдера, сбрасываем endX
    }
  }
});

// Add event listener for touchend
slider.addEventListener("touchend", () => {
  if (swipeDistance > 1 && startX !== null && endX !== null) {
    if (endX < startX) {
      // Swipe left
      swiper.slideNext();
    } else {
      // Swipe right
      swiper.slidePrev();
    }
  }
  // Сбрасываем значения для следующего свайпа
  startX = endX = swipeDistance = null;
});
function sizeChange(button) {
  // Get the row containing the clicked button
  const row = button.parentNode;
  // Get all buttons in the row
  const buttons = row.querySelectorAll(".images-container__button");
  // Find the currently enlarged button in the row
  let enlargedButton = null;
  buttons.forEach((btn) => {
    if (btn.style.width === "580px") {
      enlargedButton = btn;
    }
  });

  // If the clicked button is already enlarged, do nothing
  if (enlargedButton === button) {
    return;
  }

  // Reset the enlarged button if it exists and is not the clicked button
  if (enlargedButton && enlargedButton !== button) {
    const enlargedImg = enlargedButton.querySelector(
      ".images-container__image"
    );
    if (enlargedImg.src.endsWith("LG.png")) {
      enlargedImg.src = enlargedImg.src.replace("LG.png", ".png");
    }
    enlargedButton.style.width = "280px";
  }

  // Enlarge the clicked button
  const img = button.querySelector(".images-container__image");
  if (img.src.endsWith(".png")) {
    img.src = img.src.replace(".png", "LG.png");
  }
  button.style.width = "580px";
}

// Initialize the first button in the first row and the second button in the second row
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


