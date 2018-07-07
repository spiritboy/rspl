import {source} from "./source";
import {event} from "./event";
import {splComponentType} from "./splComponentTypes";
import {groupData} from "./groupData";
import {questionData} from "./questionData";
import {Serializable} from "./Serializable";
import {group} from "./group";


export class question implements Serializable<question> {
  parentGroup: group;
  title: string;
  id: number;
  uid: string;
  groupUid: string;
  value: any;
  component: splComponentType;
  source: source;
  events: event;

  getData(): questionData {
    let qdata = new questionData();
    qdata.id = this.id;
    qdata.title = this.title;
    qdata.value = this.value;
    qdata.uid = this.uid;

    return qdata;
  }

  init(){
    this.value = "";
  }
  deserialize(input:any, parent: group): question {
    this.parentGroup = parent;
    if (!input) return this;
    this.id = input.id;
    this.title = input.title;
    this.uid = input.uid;
    this.groupUid = input.groupUid;
    if (this.groupUid)
      this.uid = this.parentGroup.parentMenu.uid + '.' + this.groupUid + '.' + this.uid;
    this.component = new splComponentType().deserialize(input.component, this);
    this.source = new source().deserialize(input.source, this);
    this.events = new event().deserialize(input.events, this);
    return this;
  }
}
