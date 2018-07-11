import {question} from "./question";
import {groupData} from "./groupData";
import {menu} from "./menu";
import {Serializable} from "./Serializable";

export class group implements Serializable<group>{
  parentMenu:menu;
  title: string;
  type: string;
  uid: string;
  id: number;
  questions: question[]=[];
  isSearch: boolean = false;

  init(){
    this.questions.forEach((v,i)=>{v.init();})
  }

  deserialize(input:any, parent:menu): group {
    this.parentMenu = parent;
    if(!input)return this;
    this.title = input.title;
    this.type = input.type;
    this.uid = input.uid;
    input.questions.forEach((value:any, index:any) =>{
      this.questions.push(new question().deserialize(value,this));
    });
    return this;
  }
   public getData(): groupData {
     var res = new groupData();
     res.menuuid = this.parentMenu.uid;
     res.uid = this.uid;
     res.title = this.title;
     this.questions.forEach(function (q, index) {
       res.questionsData.push(q.getData());
     });

     return res;
   }
   loadData(GData:groupData){

   }
}
