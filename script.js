const GITHUB_USERNAME = "lifiaa";
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");

document.getElementById("year").textContent = new Date().getFullYear();

if (GITHUB_USERNAME !== "lifiaa") {
  document.getElementById("githubProfile").href = GITHUB_PROFILE;
  document.getElementById("githubLink").href = GITHUB_PROFILE;
}

menuButton.addEventListener("click", () => {
  const isOpen = !navMenu.classList.contains("hidden");
  navMenu.classList.toggle("hidden");
  menuButton.textContent = isOpen ? "☰" : "✕";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      navMenu.classList.add("hidden");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const label = theme === "dark" ? "☀ Light" : "☾ Dark";
  themeToggle.textContent = label;
  mobileThemeToggle.textContent = theme === "dark" ? "☀ Light mode" : "☾ Dark mode";
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  mobileThemeToggle.setAttribute("aria-pressed", String(theme === "dark"));
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
}
themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

const projectContainer = document.getElementById("projectContainer");
const projectStatus = document.getElementById("projectStatus");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const emptyState = document.getElementById("emptyState");
const retryButton = document.getElementById("retryButton");

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const title = document.createElement("h3");
  title.textContent = project.name;

  const description = document.createElement("p");
  description.textContent = project.description || "Repository ini belum memiliki deskripsi.";

  const meta = document.createElement("div");
  meta.className = "project-meta";
  const language = document.createElement("span");
  language.textContent = project.language || "Language not specified";
  const stars = document.createElement("span");
  stars.textContent = `★ ${project.stargazers_count}`;
  meta.append(language, stars);

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View Repository ↗";

  card.append(title, description, meta, link);
  return card;
}

async function loadProjects() {
  projectStatus.textContent = "Mengambil data repository...";
  projectContainer.replaceChildren();
  errorState.classList.add("hidden");
  emptyState.classList.add("hidden");

  if (GITHUB_USERNAME === "lifiaa") {
    projectStatus.textContent = "Atur username GitHub terlebih dahulu di file script.js.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=9`,
      { method: "GET", headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      throw new Error(response.status === 404
        ? "Username GitHub tidak ditemukan."
        : `Permintaan gagal (HTTP ${response.status}).`);
    }

    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error("Format data API tidak sesuai.");

    projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (projects.length === 0) {
      projectStatus.textContent = "0 repository ditemukan.";
      emptyState.classList.remove("hidden");
      return;
    }

    projects.forEach((project) => {
      projectContainer.appendChild(createProjectCard(project));
    });
    projectStatus.textContent = `${projects.length} repository publik ditemukan.`;
  } catch (error) {
    projectStatus.textContent = "Data repository tidak berhasil dimuat.";
    errorMessage.textContent = error.message || "Periksa koneksi internet lalu coba lagi.";
    errorState.classList.remove("hidden");
  }
}

retryButton.addEventListener("click", loadProjects);
loadProjects();
