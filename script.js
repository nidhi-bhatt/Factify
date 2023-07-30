const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");
const categoryButtons = document.querySelectorAll(".btn-category");
const allCategoriesButton = document.querySelector(".btn-all-categories");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://gbsdsyjdiazcdbplgqoi.supabase.co/rest/v1/facts",

    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  // const filteredData = data.filter((fact) => fact.category === "technology");

  createFactsList(data);
}

function createFactsList(dataArray) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>Jonas</li>");

  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
    <p>
    ${fact.text}
      <a
        class="source"
        href="${fact.source}"
        target="_blank"
      >(Source)</a>
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }">${fact.category}</span>
  </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

// Add event listener for form submission
document
  .querySelector(".btn-large")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const factInput = document.querySelector(".fact-form input[type='text']");
    const sourceInput = document.querySelector(
      ".fact-form input[type='text']:last-of-type"
    );
    const categorySelect = document.querySelector(".fact-form select");

    const factText = factInput.value.trim();
    const sourceText = sourceInput.value.trim();
    const categoryValue = categorySelect.value;

    if (factText === "" || sourceText === "" || categoryValue === "") {
      alert("Please fill in all fields");
      return;
    }

    const factData = {
      text: factText,
      source: sourceText,
      category: categoryValue,
    };

    try {
      const res = await fetch(
        "https://gbsdsyjdiazcdbplgqoi.supabase.co/rest/v1/facts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
          },
          body: JSON.stringify(factData),
        }
      );

      if (res.ok) {
        const newData = await res.json();

        // Add the new fact to the facts list
        createFactsList([newData, ...factsList.children]);

        // Clear the form fields
        factInput.value = "";
        sourceInput.value = "";
        categorySelect.value = "";

        // Remove active class from all category buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  });
// Add event listener for form submission
document
  .querySelector(".btn-large")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const factInput = document.querySelector(".fact-form input[type='text']");
    const sourceInput = document.querySelector(
      ".fact-form input[type='text']:last-of-type"
    );
    const categorySelect = document.querySelector(".fact-form select");

    const factText = factInput.value.trim();
    const sourceText = sourceInput.value.trim();
    const categoryValue = categorySelect.value;

    if (factText === "" || sourceText === "" || categoryValue === "") {
      alert("Please fill in all fields");
      return;
    }

    const factData = {
      text: factText,
      source: sourceText,
      category: categoryValue,
    };

    try {
      const res = await fetch(
        "https://gbsdsyjdiazcdbplgqoi.supabase.co/rest/v1/facts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
          },
          body: JSON.stringify(factData),
        }
      );

      if (res.ok) {
        const newData = await res.json();
        console.log("Fact added successfully");

        // Add the new fact to the facts list
        await loadFacts();

        // Clear the form fields
        factInput.value = "";
        sourceInput.value = "";
        categorySelect.value = "";

        // Remove active class from all category buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  });

// Filter facts by category when a category button is clicked
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const category = button.textContent.toLowerCase();
    filterFactsByCategory(category);
    // Highlight the active category button
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Show all facts when "All" button is clicked
allCategoriesButton.addEventListener("click", function () {
  showAllFacts();
  // Remove active class from all category buttons
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
});

function filterFactsByCategory(category) {
  const facts = Array.from(factsList.children);
  facts.forEach((fact) => {
    const factCategory = fact.querySelector(".tag").textContent.toLowerCase();
    if (category === "all" || factCategory === category) {
      fact.style.display = "block";
    } else {
      fact.style.display = "none";
    }
  });
}

function showAllFacts() {
  const facts = Array.from(factsList.children);
  facts.forEach((fact) => {
    fact.style.display = "block";
  });
}
