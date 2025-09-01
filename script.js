const launchesDiv = document.getElementById("launches");
const upcomingBtn = document.getElementById("upcomingBtn");
const pastBtn = document.getElementById("pastBtn");

async function fetchLaunches(type) {
  launchesDiv.innerHTML = "<p>⏳ Loading launches...</p>";

  let url = "https://api.spacexdata.com/v5/launches";
  if (type === "upcoming") url += "/upcoming";
  if (type === "past") url += "/past";

  try {
    const res = await fetch(url);
    const data = await res.json();

    launchesDiv.innerHTML = "";
    data.slice(0, 12).forEach(launch => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${launch.links.patch.small || ''}" alt="Mission Patch">
        <h3>${launch.name}</h3>
        <p><b>Rocket:</b> ${launch.rocket}</p>
        <p><b>Date:</b> ${new Date(launch.date_utc).toDateString()}</p>
        ${launch.links.webcast ? `<a href="${launch.links.webcast}" target="_blank">🎥 Watch</a>` : ""}
        ${launch.links.article ? `<a href="${launch.links.article}" target="_blank">📖 Read</a>` : ""}
      `;
      launchesDiv.appendChild(card);
    });
  } catch (err) {
    launchesDiv.innerHTML = "<p>❌ Error loading launches.</p>";
  }
}

upcomingBtn.addEventListener("click", () => fetchLaunches("upcoming"));
pastBtn.addEventListener("click", () => fetchLaunches("past"));

// Load upcoming by default
fetchLaunches("upcoming");