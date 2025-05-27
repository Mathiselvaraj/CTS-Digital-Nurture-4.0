// 1. JavaScript Setup
console.log("Welcome to the Community Portal");
window.addEventListener('load', () => {
  alert("Page fully loaded. Welcome to the Community Event Portal!");
  fetchEvents(); // load events on page load
});

// 2. Event Data Setup
const events = [
  { name: "Yoga Camp", date: "2025-06-10", category: "Wellness", seats: 20 },
  { name: "Cooking Workshop", date: "2025-07-05", category: "Food", seats: 0 },
  { name: "Music Fest", date: "2025-05-30", category: "Music", seats: 10 },
  { name: "Art Gallery", date: "2025-08-15", category: "Art", seats: 5 }
];

// Utility: Format Date
function isFutureDate(dateStr) {
  return new Date(dateStr) > new Date();
}

// 3. Display Events
function renderEvents(eventList) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  eventList.forEach(event => {
    if (!isFutureDate(event.date) || event.seats <= 0) return;

    const card = document.createElement("div");
    card.className = "eventCard";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Category: ${event.category}</p>
      <p>Seats Available: ${event.seats}</p>
      <button class="registerBtn" data-event="${event.name}">Register</button>
    `;
    container.appendChild(card);
  });

  // 8. Event Handling - Register Button
  document.querySelectorAll(".registerBtn").forEach(btn => {
    btn.onclick = () => showRegisterForm(btn.dataset.event);
  });
}

// 4. Filtering
document.getElementById("categoryFilter").onchange = function () {
  const category = this.value;
  const filtered = category
    ? events.filter(e => e.category === category)
    : events;
  renderEvents(filtered);
};

document.getElementById("searchInput").addEventListener("keydown", (e) => {
  const query = e.target.value.toLowerCase();
  const result = events.filter(e => e.name.toLowerCase().includes(query));
  renderEvents(result);
});

// 5. Register Form Show/Hide
function showRegisterForm(eventName) {
  document.getElementById("registerSection").classList.remove("hidden");
  document.querySelector("#registerForm select").value = eventName;
}

document.getElementById("closeBtn").onclick = () => {
  document.getElementById("registerSection").classList.add("hidden");
};

// 6. Form Handling
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.username.value.trim();
  const email = form.email.value.trim();
  const eventName = form.event.value;

  if (!name || !email || !eventName) {
    alert("Please fill all the fields.");
    return;
  }

  const regData = { name, email, event: eventName };
  console.log("Submitting registration:", regData);

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(regData),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (!res.ok) throw new Error("Failed to register");

    const data = await res.json();
    console.log("Registration success:", data);

    alert("Registration Successful!");
    form.reset();
    document.getElementById("registerSection").classList.add("hidden");

    // Reduce seats after successful registration
    const eventIndex = events.findIndex(e => e.name === eventName);
    if (eventIndex !== -1) {
      events[eventIndex].seats--;
      renderEvents(events);
    }
  } catch (err) {
    console.error(err);
    alert("Registration Failed.");
  }
});

// 7. Async JS – Fetch and Loader
async function fetchEvents() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  try {
    await new Promise(res => setTimeout(res, 1000)); // simulate loading
    renderEvents(events); // mock API replaced with local array
  } catch (err) {
    console.error("Error loading events", err);
  } finally {
    loader.classList.add("hidden");
  }
}

// 9. jQuery Example
$(document).ready(function () {
  $('#registerForm').on('submit', function () {
    $('#registerSection').fadeOut(500);
  });
});

// 10. Modern JavaScript features
const cloneEventList = [...events];
const [{ name: firstEventName }] = cloneEventList;
console.log(`First event name using destructuring: ${firstEventName}`);
