interface Veiw {
    createTagArray(Taglarge: HTMLInputElement, Tagpainted: HTMLInputElement): string[];
}


export class ViewCrud implements Veiw {
    dateInput: string;

    colorInput: string;

    statusEl: string;

    static Taglarge: HTMLInputElement;

    static Tagsmall: HTMLInputElement;

    static Tagpainted: HTMLInputElement;

    static Tagunpainted: HTMLInputElement;

    constructor(el: HTMLElement) {

        // eslint-disable-next-line no-param-reassign
        el.innerHTML = `<div id="newObjField">
        <form>
            <div>
                <label for="color">color</label>
                <select id="color">
                    <option value="Red">Red</option>
                    <option value="White">White</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                    <option value="Pink">Pink</option>
                </select>
            </div>
            <div>
                <label for="date">date</label>
                <input type="date" id="theDate" name="dateForGoods" min="2018-01-01" max="2022-12-31">
            </div>
            <div class="checkselect">
                <label for="checkForm">Tags</label>
                <label><input id="Taglarge" type="checkbox" name=large value="1" checked> large</label>
                <label><input id="Tagsmall" type="checkbox" name="small" value="2"> small</label>
                <label><input id="Tagpainted" type="checkbox" name="painted" value="3" checked> painted</label>
                <label><input id="Tagunpainted" type="checkbox" name="unpainted" value="4"> unpainted</label>
            </div>
            <div>
                <label for="status">status</label>
                <select id="status">
                    <option value="sold">sold</option>
                    <option value="unsold">unsold</option>
                </select>
            </div>
            <div>
                <p id="buttons"><input id="create" type="submit" value="create data">
                    <input id="read" type="submit" value="request data by color">
                    <input id="update" type="submit" value="update data by color">
                    <input id="delete" type="submit" value="delete data by color">

                </p>
            </div>
        </form>    
    <div id="dateBaseView">
    </div>
</div>`

        const date = new Date();

        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        const year = date.getFullYear();

        if (+month < 10) { month = `0${month}`; }
        if (+day < 10) { day = `0${day}`; }

        const today = `${year}-${month}-${day}`;

        (<HTMLInputElement>document.getElementById("theDate")).value = today;


        this.dateInput = (<HTMLInputElement>document.getElementById("theDate")).value
        this.colorInput = (<HTMLInputElement>document.getElementById("color")).value;
        ViewCrud.Taglarge = (<HTMLInputElement>document.getElementById("Taglarge"));
        ViewCrud.Tagsmall = (<HTMLInputElement>document.getElementById("Tagsmall"));
        ViewCrud.Tagpainted = (<HTMLInputElement>document.getElementById("Tagpainted"));
        ViewCrud.Tagunpainted = (<HTMLInputElement>document.getElementById("Tagunpainted"));
        this.statusEl = (<HTMLInputElement>document.getElementById("status")).value;

        const colorWell = document.getElementById("color");

        colorWell.addEventListener('change', () => {
            this.colorInput = (<HTMLInputElement>colorWell).value;
            console.log(this.colorInput);
        }, false);

        const statusrWell = document.getElementById("status");
        statusrWell.addEventListener('change', () => {
            this.statusEl = (<HTMLInputElement>statusrWell).value;
            console.log("statusrWell")
        }, false);

        const dateWell = document.getElementById("theDate");
        dateWell.addEventListener("input", () => {
            this.dateInput = (<HTMLInputElement>dateWell).value;
            console.log("dateWell")
        }, false);

        ViewCrud.Taglarge.addEventListener("change", function () {
            if (this.checked) {
                (<HTMLInputElement>ViewCrud.Tagsmall).disabled = true;
            } else {
                (<HTMLInputElement>ViewCrud.Tagsmall).disabled = false;
            }
        });
        ViewCrud.Tagsmall.addEventListener("change", function () {
            if (this.checked) {
                ViewCrud.Taglarge.disabled = true;
            } else {
                ViewCrud.Taglarge.disabled = false;
            }
        });
        ViewCrud.Tagpainted.addEventListener("change", function () {
            if (this.checked) {
                ViewCrud.Tagunpainted.disabled = true;
            } else {
                ViewCrud.Tagunpainted.disabled = false;
            }
        });
        ViewCrud.Tagunpainted.addEventListener("change", function () {
            if (this.checked) {
                ViewCrud.Tagpainted.disabled = true;
            } else {
                ViewCrud.Tagpainted.disabled = false;
            }
        });

        ViewCrud.Taglarge.dispatchEvent(new Event("change"));
        ViewCrud.Tagpainted.dispatchEvent(new Event("change"));
    }

    // eslint-disable-next-line class-methods-use-this
    createTagArray(Taglarge: HTMLInputElement, Tagpainted: HTMLInputElement) {
        const newArr = [];
        if (Taglarge.checked) {
            newArr.push("large");
            if (Tagpainted.checked) {
                newArr.push("painted");
            }
            else { newArr.push("unpainted"); }
        }
        else {
            newArr.push("large");
            if (Tagpainted.checked) {
                newArr.push("painted");
            }
            else { newArr.push("unpainted"); }
        }
        return newArr;
    }
}