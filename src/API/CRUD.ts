/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child, update, remove } from "firebase/database";
import "./mysite.css";

const firebaseConfig = {
  apiKey: "AIzaSyAOR5jK5Bl_N1L3m367rIXRhCwrzTa6Wkg",
  authDomain: "semiotic-joy-340915.firebaseapp.com",
  databaseURL: "https://semiotic-joy-340915-default-rtdb.firebaseio.com",
  projectId: "semiotic-joy-340915",
  storageBucket: "semiotic-joy-340915.appspot.com",
  messagingSenderId: "421555283725",
  appId: "1:421555283725:web:1659dfa120303018e9f244"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const date = new Date();

let day = String(date.getDate());
let month = String(date.getMonth() + 1);
const year = date.getFullYear();

if (+month < 10) { month = `0${month}`; }
if (+day < 10) { day = `0${day}`; }

const today = `${year}-${month}-${day}`;
(<HTMLInputElement>document.getElementById("theDate")).value = today;

let dateInput = (<HTMLInputElement>document.getElementById("theDate")).value
let colorInput = (<HTMLInputElement>document.getElementById("color")).value;
const Taglarge = (<HTMLInputElement>document.getElementById("Taglarge"));
const Tagsmall = (<HTMLInputElement>document.getElementById("Tagsmall"));
const Tagpainted = (<HTMLInputElement>document.getElementById("Tagpainted"));
const Tagunpainted = (<HTMLInputElement>document.getElementById("Tagunpainted"));
let statusEl = (<HTMLInputElement>document.getElementById("status")).value;
const createDataButton = document.getElementById("create");
const readDataButton = document.getElementById("read");
const updateDataButton = document.getElementById("update");
const deleteDataButton = document.getElementById("delete");
const dateBaseView = document.getElementById("dateBaseView");
const shortWindow = document.getElementById("shortWindow");
let selectFilter = (<HTMLInputElement>document.getElementById("selectFilter")).value;
let fullBase;

const filterWell = document.getElementById("selectFilter");
filterWell.addEventListener('change', () => {
  selectFilter = (<HTMLInputElement>filterWell).value;
  console.log(selectFilter);
}, false);

const colorWell = document.getElementById("color");
colorWell.addEventListener('change', () => {
  colorInput = (<HTMLInputElement>colorWell).value;
  console.log(colorInput);
}, false);

const statusrWell = document.getElementById("status");
statusrWell.addEventListener('change', () => {
  statusEl = (<HTMLInputElement>statusrWell).value;
  console.log("statusrWell")
}, false);

const dateWell = document.getElementById("theDate");
dateWell.addEventListener("input", () => {
  dateInput = (<HTMLInputElement>dateWell).value;
  console.log("dateWell")
}, false);

Taglarge.addEventListener("change", function () {
  if (this.checked) {
    Tagsmall.disabled = true;
  } else {
    Tagsmall.disabled = false;
  }
});
Tagsmall.addEventListener("change", function () {
  if (this.checked) {
    Taglarge.disabled = true;
  } else {
    Taglarge.disabled = false;
  }
});
Tagpainted.addEventListener("change", function () {
  if (this.checked) {
    Tagunpainted.disabled = true;
  } else {
    Tagunpainted.disabled = false;
  }
});
Tagunpainted.addEventListener("change", function () {
  if (this.checked) {
    Tagpainted.disabled = true;
  } else {
    Tagpainted.disabled = false;
  }
});

Taglarge.dispatchEvent(new Event("change"));
Tagpainted.dispatchEvent(new Event("change"));

export function createTagArray() {
  const newArr = [];
  if (Taglarge.checked) {
    newArr.push("large");
    if (Tagpainted.checked) {
      newArr.push("painted");
    }
    else { newArr.push("unpainted"); }
  }
  else {
    newArr.push("small");
    if (Tagpainted.checked) {
      newArr.push("painted");
    }
    else { newArr.push("unpainted"); }
  }
  return newArr;
}
export function message(text: string) {
  shortWindow.style.visibility = "visible";
  shortWindow.innerHTML = `${text}`;
  shortWindow.classList.add("animation")
  setTimeout(() => {
    shortWindow.style.visibility = "hidden";
    shortWindow.classList.remove("animation")
  }, 3000)
}

// export function filterByOption(param: string,curentBase:object) {
//   const result = {}
//   switch (param) {
//     case "Status": {
//       for (const i in curentBase) {
//         const item = curentBase[i]
//         if (item.status === "sold") {
//           result[i] = item;
//         }

//       }
//       return result;
//     }
//     case "Date": {
//       for (const i in curentBase) {
//         const item = curentBase[i]
//         if (item.date === "sold") {
//           result[i] = item;
//         }        
//       }
//       return result;
//     }
//     case "reset": {
//       return 
//     }
//     default: {
//       return param;
//     }
//   }
// }

export function createData() {
  set(ref(db, `baloons/${colorInput}`), {
    "color": colorInput,
    "status": statusEl,
    "tags": createTagArray(),
    "date": dateInput
  })
    .then(() => {
      const text = `the ${colorInput} element is created`
      message(text);
    })
    .catch((error) => {
      message(error);
    });
}

export function getData() {
  const dbref = ref(db);
  get(child(dbref, `baloons/${colorInput}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const text = `<div><p>
                    "color:"${snapshot.val().color} <br>
                    "status:"${snapshot.val().status}<br>
                    "tags:"${snapshot.val().tags}<br>
                    "date:"${snapshot.val().date}<br>
                </p>
                </div>`
        message(text);
      }
      else {
        const text = `element "${colorInput}" was not found`
        message(text);
      }

    })
    .catch((error) => {
      message(error);
    });
}

export function getFullData() {
  const dbref = ref(db);
  get(child(dbref, `baloons`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        fullBase = JSON.stringify(snapshot.val());
        console.log(fullBase)
        let result = fullBase.match(/"(\w+)":{.+?]}/g);
        result = result.map((el) => `${el} <hr>`);
        dateBaseView.innerHTML = `<div>
        <p>Full data base</p>
        <p>
                    "baloons:"<hr>
                     ${result}                  
                </p>
                </div>`
      }
      else {
        const text = `requested database was not found`
        message(text);
      }

    })
    .catch((error) => {
      message(error);
    });
}

export function updateData() {
  const dbref = ref(db);
  get(child(dbref, `baloons/${colorInput}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        update(ref(db, `baloons/${colorInput}`), {
          "color": colorInput,
          "status": statusEl,
          "tags": createTagArray(),
          "date": dateInput
        })
          .then(() => {
            const text = `element "${colorInput}" was updated`
            message(text);
          })
          .catch((error) => {
            message(error);
          });
      }
      else {
        const text = `element "${colorInput}" was not found`
        message(text);
      }
    })
    .catch((error) => {
      message(error);
    });
};

export function deleteData() {
  const dbref = ref(db);
  get(child(dbref, `baloons/${colorInput}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(db, `baloons/${colorInput}`))
          .then(() => {
            const text = `element "${colorInput}" was deleted`
            message(text);
          })
          .catch((error) => {
            message(error);
          });
      }
      else {
        const text = `element "${colorInput}" was not found`
        message(text);
      }
    })
    .catch((error) => {
      message(error);
    });
}

createDataButton.addEventListener("click", async (ev) => {
  ev.preventDefault();
  createData();
  getFullData();
});

readDataButton.addEventListener("click", async (ev) => {
  ev.preventDefault();
  getData();
  getFullData();
});

updateDataButton.addEventListener("click", async (ev) => {
  ev.preventDefault();
  updateData();
  setTimeout(() => getFullData(), 500);

});

deleteDataButton.addEventListener("click", async (ev) => {
  ev.preventDefault();
  deleteData();
  setTimeout(() => getFullData(), 500);
});

getFullData();
