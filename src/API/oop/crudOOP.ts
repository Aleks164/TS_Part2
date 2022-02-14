import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child, update, remove } from "firebase/database";
import "./mysite.css";

export class CRUD {
    firebaseConfig = {
        apiKey: "AIzaSyAOR5jK5Bl_N1L3m367rIXRhCwrzTa6Wkg",
        authDomain: "semiotic-joy-340915.firebaseapp.com",
        databaseURL: "https://semiotic-joy-340915-default-rtdb.firebaseio.com",
        projectId: "semiotic-joy-340915",
        storageBucket: "semiotic-joy-340915.appspot.com",
        messagingSenderId: "421555283725",
        appId: "1:421555283725:web:1659dfa120303018e9f244"
    };

    app = initializeApp(this.firebaseConfig);

    db = getDatabase();

    dateBaseView = document.getElementById("dateBaseView");

    createData(colorInput: string, statusEl: string, createTagArray: () => string[], dateInput: string) {
        set(ref(this.db, `baloons/${colorInput}`), {
            "color": colorInput,
            "status": statusEl,
            "tags": createTagArray(),
            "date": dateInput
        })
            .then(() => {
                console.log("ok");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getData(colorInput: string) {
        const dbref = ref(this.db);
        get(child(dbref, `baloons/${colorInput}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    this.dateBaseView.innerHTML = `<div><p>
                    "color:"${snapshot.val().color} <br>
                    "status:"${snapshot.val().status}<br>
                    "tags:"${snapshot.val().tags}<br>
                    "date:"${snapshot.val().date}<br>
                </p>
                </div>`
                }
                else {
                    console.log("nothing");
                }

            })
            .catch((error) => {
                console.log(error)
            });
    }

    getFullData() {
        const dbref = ref(this.db);
        get(child(dbref, `baloons`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const baseList = JSON.stringify(snapshot.val());
                    let result = baseList.match(/"(\w+)":{.+?]}/g);
                    result = result.map((el) => `${el} <hr>`);
                    this.dateBaseView.innerHTML = `<div>
        <p>Full data base</p>
        <p>
                    "baloons:"<hr>
                     ${result}                  
                </p>
                </div>`
                }
                else {
                    console.log("nothing");
                }

            })
            .catch((error) => {
                console.log(error)
            });
    }

    updateData(colorInput: string, statusEl: string, createTagArray: () => string[], dateInput: string) {
        update(ref(this.db, `baloons/${colorInput}`), {
            "color": colorInput,
            "status": statusEl,
            "tags": createTagArray(),
            "date": dateInput
        })
            .then(() => {
                console.log("updated");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteData(colorInput: string) {
        remove(ref(this.db, `baloons/${colorInput}`))
            .then(() => {
                console.log("deleted");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}