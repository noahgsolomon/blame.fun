document.addEventListener("DOMContentLoaded", () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  applyTheme(prefersDarkScheme.matches ? "dark" : "light");

  prefersDarkScheme.addEventListener("change", (e) => {
    applyTheme(e.matches ? "dark" : "light");
  });
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
