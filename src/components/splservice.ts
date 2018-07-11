import {menu} from "./model/menu";
import {group} from "./model/group";
import {groupData} from "./model/groupData";

export class splService {
    public getData(callback: (menu: menu) => void) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                console.log(data.groups[0].questions[0].fieldInfo)
                let mn = new menu();
                mn.deserialize(data);
                callback(mn);
            }
        };
        xhttp.open("GET", "/getdefinition", true);
        xhttp.send();
    }

    public saveGroup(group: group) {
        var result = {
            menuUid: group.parentMenu.uid,
            groupUid: group.uid,
            data: group.getData().normalizeData(false),
            fkId: group.parentMenu.fkId
        };
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                let mn = new menu();
                group.parentMenu.fkId = data.fkId;
            }
        };
        xhttp.open("POST", "/saveData", true);
        xhttp.setRequestHeader("Content-Type", "application/json");


        xhttp.send(JSON.stringify(result));
    }

    searchMenu(group: group, callback: (result: any) => void) {
        var result = group.getData().normalizeData(true);
        result.menuUid = group.parentMenu.uid;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                callback(data);
            }
        };
        xhttp.open("POST", "/searchMenu", true);
        xhttp.setRequestHeader("Content-Type", "application/json");


        xhttp.send(JSON.stringify(result));
    }

    loadFK = (menu: menu, fkId: number, callback: (result: any) => void) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                console.log(data);
                callback(data);
            }
        };
        xhttp.open("GET", "/loadfk?fkId=" + fkId, true);
        xhttp.setRequestHeader("Content-Type", "application/json");


        xhttp.send();
    }
}