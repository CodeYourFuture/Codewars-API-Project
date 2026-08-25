import "./component/header.js";
//import "./codewars-badge.js";
import "./component/hero.js";
import "./component/footer.js";
import "./component/warrior-profile.js";

const state = {
  userData: null,
  userName: "",
};

const header = document.querySelector("app-header");

const warrior = document.querySelector("warrior-profile");
const existingUser = localStorage.getItem(state.userName);

if (warrior != null) {
  warrior.addEventListener("user-input", async (e) => {
    state.userName = e.detail;

    if (existingUser) {
      state.userDate = JASON.parse(existingUser);
      warrior.userData = state.userData;
    } else {
      await load();
      warrior.userData = state.userData;
    }
  });
}

// fetch the data from the Codewars API
async function fetchActivity() {
  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${state.userName}`,
    );

    if (!response.ok) {
      throw new Error(`User not found (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function load() {
  localStorage.clear();
  const userData = await fetchActivity();
  if (!userData) {
    
    warrior.load = false;
    return;
  };
  state.userData = userData;
  if (!existingUser) {
    localStorage.setItem(`${state.userName}`, JSON.stringify(userData));
  }
}

