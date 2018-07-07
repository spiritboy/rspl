import {menu} from "./model/menu";

export class splService{
    a:number=1500;
    public getData(callback:(menu: menu) => void){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                let mn = new menu();
                mn.deserialize(data);
                callback(mn);
            }
        };
        xhttp.open("GET", "/getdefinition", true);
        xhttp.send();
    }
}