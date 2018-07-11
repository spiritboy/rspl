import {Serializable} from "./Serializable";
import {question} from "./question";

export class FieldInfo implements Serializable<FieldInfo>{
  parentQuestion: question;
  type:string;
  isFree:boolean;
  isMultiSelect:boolean;
  clenderType:string;

  deserialize(input:any,parent:question): FieldInfo {
    this.parentQuestion = parent;
    if(!input)return this;
    this.type = input.type;
    this.isFree = input.isFree;
    this.isMultiSelect = input.isMultiSelect;
    this.clenderType = input.clenderType;
    return this;
  }
}

