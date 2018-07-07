import {group} from "./group";
import {Serializable} from "../model/Serializable";
import {question} from "./question";
import {groupData} from "./groupData";

export class menu implements Serializable<menu> {
  title: string;
  groups: group[] = [];
  search:group;
  uid:string;
  fkId: number = 0;

  deserialize(input:any): menu {
    if (!input) return this;
    this.uid = input.uid;
    this.title = input.title;
    this.uid = input.uid;
    input.groups.forEach((value:any, index:any) => {
      this.groups.push(new group().deserialize(value,this));
    });
    this.search = new group().deserialize(input.search[0],this);
    this.search.isSearch = true;



    return this;
  }

  loadData(GData:groupData[]){

  }
  init(){
    this.fkId = 0;
    this.groups.forEach((v,i)=>{v.init();})
  }
  findQuestion(guid:string, quid:string):question{
    for(let g in this.groups)
    {
      if(this.groups[g].uid == guid) {
        for (let q in this.groups[g].questions) {
          var question = this.groups[g].questions[q];
          if (question.uid == quid) {
            return question;
          }
        }
      }
    }
    return null;
  }
}
