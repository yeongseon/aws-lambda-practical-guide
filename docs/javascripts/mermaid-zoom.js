// Mermaid diagram zoom support
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".mermaid").forEach(function (el) {
    el.addEventListener("click", function () {
      if (el.style.transform === "scale(1.5)") {
        el.style.transform = "scale(1)";
      } else {
        el.style.transform = "scale(1.5)";
      }
    });
  });
});
