document.addEventListener("DOMContentLoaded", function () {

  const shots = Array.from(document.querySelectorAll(".shot"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbTitle = document.getElementById("lbTitle");
  const lbCount = document.getElementById("lbCount");

  const prevBtn = document.querySelector(".lb-prev");
  const nextBtn = document.querySelector(".lb-next");

  if (!shots.length) return; // stop if no gallery

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;

    const shot = shots[currentIndex];
    const full = shot.dataset.full;
    const title = shot.dataset.title || "Photo";

    lbImg.src = full;
    lbTitle.textContent = title;
    lbCount.textContent = (currentIndex + 1) + " / " + shots.length;

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lbImg.src = "";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % shots.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + shots.length) % shots.length;
    openLightbox(currentIndex);
  }

  shots.forEach((shot, index) => {
    shot.addEventListener("click", () => openLightbox(index));
  });

  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", function (e) {
    if (e.target.classList.contains("lightbox-backdrop") ||
        e.target.classList.contains("lb-close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

});
