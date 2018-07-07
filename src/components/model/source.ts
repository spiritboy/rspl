import {Serializable} from "./Serializable";
import {question} from "./question";


export class source implements Serializable<source>{
  parentQuestion:question;
  runat:string;
  isFree:boolean;
  isMultiSelect:boolean;
  script:string;

  deserialize(input:any,parent:question): source {
    this.parentQuestion = parent;
    if(!input)return this;
    this.runat = input.runat;
    this.isFree = input.isFree;
    this.isMultiSelect = input.isMultiSelect;
    this.script = input.script;
    return this;
  }

}
