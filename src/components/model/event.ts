import {Serializable} from "./Serializable";
import {question} from "./question";

export class event implements Serializable<event>{
  parentQuestion:question;
  onExit:string;
  onEnter:string;
  onValidate:string;

  deserialize(input:any,parent :question): event {
    if(!input)return this;
    this.onExit = input.onExit;
    this.onEnter = input.onEnter;
    this.onValidate = input.onValidate;
    return this;
  }
}
