import {Serializable} from "./Serializable";
import {question} from "./question";

export class splComponentType implements Serializable<splComponentType>{
  parentQuestion: question;
  type:string;
  isFree:boolean;
  isMultiSelect:boolean;
  clenderType:string;

  deserialize(input:any,parent:question): splComponentType {
    this.parentQuestion = parent;
    if(!input)return this;
    this.type = input.type;
    this.isFree = input.isFree;
    this.isMultiSelect = input.isMultiSelect;
    this.clenderType = input.clenderType;
    return this;
  }
}

