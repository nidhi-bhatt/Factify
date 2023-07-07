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
document.querySelector(".btn-large").addEventListener("click", async function (event) {
  event.preventDefault();

  const factInput = document.querySelector(".fact-form input[type='text']");
  const sourceInput = document.querySelector(".fact-form input[type='text']:last-of-type");
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
    const res = await fetch("https://gbsdsyjdiazcdbplgqoi.supabase.co/rest/v1/facts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
          authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic2RzeWpkaWF6Y2RicGxncW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NzM4NzMsImV4cCI6MjAwMDI0OTg3M30.44rCVHLdHzmNj2yldHqSCB_sztI6E9g_Qb8PTYLDUO0",
      },
      body: JSON.stringify(factData),
    });

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









 







console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
console.log([7, 64, 6, -23, 11].find((el) => el > 10));
console.log(CATEGORIES.find((cat) => cat.name === "society").color);




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



/*
let votesInteresting = 23;
let votesMindlowing = 5;
const text = "Lisbon is the capital of Portugal";

votesInteresting = votesInteresting + 1;
votesInteresting++;
console.log(votesInteresting);

let totalUpvotes = votesInteresting + votesMindlowing;
console.log("Upvotes:", totalUpvotes);

let votesFalse = 4;
const isCorrect = votesFalse < totalUpvotes;
console.log(isCorrect);

console.log(parseInt("24.533ccc"));
*/

/*
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const age1 = calcFactAge(2015);
console.log(age1);
console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

// const calcFactAge2 = (year) => 2022 - year;
const calcFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;

console.log(calcFactAge2(2015));
console.log(calcFactAge2(2037));
*/

/*
let votesInteresting = 20;
let votesMindlowing = 5;

if (votesInteresting === votesMindlowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (votesInteresting > votesMindlowing) {
  console.log("Intersting fact!");
} else if (votesInteresting < votesMindlowing) {
  console.log("Mindblowing fact!!");
}

// falsy values: 0, '', null, undefined
// truthy value: everything else...
if (votesMindlowing) {
  console.log("MINDBLOWING FACT!!!");
} else {
  console.log("Not so special...");
}

let votesFalse = 7;
const totalUpvotes = votesInteresting + votesMindlowing;

const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources...";
// alert(message);

const text = "Lisbon is the capital of Portugal";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}". It is ${calcFactAge(
  2015
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "correct" : "not true"
}.`;
console.log(str);
*/

/*
const fact = ["Lisbon is the capital of Portugal", 2015, true];
console.log(fact[2]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

const [text, createdIn] = fact;
const newFact = [...fact, "society"];
console.log(newFact);

const factObj = {
  text: "Lisbon is the capital of Portugal",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  createSummary: function () {
    return `The fact "${
      this.text
    }" is from the category ${this.category.toUpperCase()}`;
  },
};

console.log(factObj.text);
console.log(factObj["text"]);

const { category, isCorrect } = factObj;
console.log(category);
console.log(factObj.createSummary());

// [2, 4, 6, 8].forEach(function (el) {
//   console.log(el);
// });

// const times10 = [2, 4, 6, 8].map(function (el) {
//   return el * 10;
// });
const times10 = [2, 4, 6, 8].map((el) => el * 10);
console.log(times10);

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

const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories);

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
console.log(factAges);
console.log(factAges.join("-"));
*/
