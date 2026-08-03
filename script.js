function getEntries() {
  return JSON.parse(localStorage.getItem("vaultEntries") || "[]");
}

function saveEntries(entries) {
  localStorage.setItem("vaultEntries", JSON.stringify(entries));
}

function saveEntry() {
  const siteName = document.getElementById("siteName").value.trim();
  const siteUser = document.getElementById("siteUser").value.trim();
  const sitePass = document.getElementById("sitePass").value.trim();

  if (!siteName || !siteUser || !sitePass) {
    alert("Please fill all fields.");
    return;
  }

  const entries = getEntries();
  entries.push({ siteName, siteUser, sitePass });
  saveEntries(entries);

  document.getElementById("siteName").value = "";
  document.getElementById("siteUser").value = "";
  document.getElementById("sitePass").value = "";

  renderEntries();
}

function deleteEntry(index) {
  const entries = getEntries();
  entries.splice(index, 1);
  saveEntries(entries);
  renderEntries();
}

function renderEntries() {
  const entries = getEntries();
  const container = document.getElementById("entries");

  if (entries.length === 0) {
    container.innerHTML = "<p>No saved entries yet.</p>";
    return;
  }

  container.innerHTML = entries
    .map(
      (entry, index) => `
        <div class="entry">
          <strong>${entry.siteName}</strong>
          <div>Username: ${entry.siteUser}</div>
          <div>Password: ${entry.sitePass}</div>
          <button class="small-btn" onclick="deleteEntry(${index})">Delete</button>
        </div>
      `
    )
    .join("");
}

renderEntries();