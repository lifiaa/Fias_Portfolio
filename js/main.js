const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectTotal = document.querySelector("#project-total");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☼" : "☾";
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !shouldShow);
      if (shouldShow) visibleCount += 1;
    });

    projectTotal.textContent = `${String(visibleCount).padStart(2, "0")} PROJECTS`;
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

function applyProfileConfig() {
  const githubUsername = PORTFOLIO_CONFIG.githubUsername;
  const githubProfile = document.querySelector("#github-profile");
  const contactGithub = document.querySelector("#contact-github");
  const contactEmail = document.querySelector("#contact-email");
  const email = PORTFOLIO_CONFIG.email;

  if (githubUsername && githubUsername !== "GITHUB_USERNAME_KAMU") {
    githubProfile.href = `https://github.com/${githubUsername}`;
    contactGithub.href = `https://github.com/${githubUsername}`;
    loadGithubRepositories(githubUsername);
  }

  if (email && email !== "emailkamu@example.com") {
    contactEmail.href = `mailto:${email}`;
    contactEmail.textContent = `${email} ↗`;
  }

  if (PORTFOLIO_CONFIG.linkedinUrl) {
    document.querySelector('a[href="https://www.linkedin.com/"]').href = PORTFOLIO_CONFIG.linkedinUrl;
  }
  if (PORTFOLIO_CONFIG.instagramUrl) {
    document.querySelector('a[href="https://www.instagram.com/"]').href = PORTFOLIO_CONFIG.instagramUrl;
  }
}

async function loadGithubRepositories(username) {
  const status = document.querySelector("#github-status");
  const container = document.querySelector("#github-repos");
  status.textContent = "Loading public repositories...";

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const repositories = await response.json();

    if (!Array.isArray(repositories) || repositories.length === 0) {
      status.textContent = "Belum ada repository publik yang dapat ditampilkan.";
      return;
    }

    status.textContent = `${repositories.length} recent public repositories`;
    container.innerHTML = repositories.map((repo) => `
      <article class="repo-card">
        <h4>${escapeHTML(repo.name)}</h4>
        <p>${escapeHTML(repo.description || "No description provided.")}</p>
        <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer">Open repository ↗</a>
      </article>
    `).join("");
  } catch (error) {
    status.textContent = `Gagal memuat repository (${error.message}).`;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

applyProfileConfig();
