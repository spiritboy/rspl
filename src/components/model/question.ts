import {source} from "./source";
import {event} from "./event";
import {FieldInfo} from "./FieldInfo";
import {groupData} from "./groupData";
import {questionData} from "./questionData";
import {Serializable} from "./Serializable";
import {group} from "./group";


export class question implements Serializable<question> {
  parentGroup: group;
  title: string;
  uid: string;
  groupUid: string;
  value: any;
  fieldInfo: FieldInfo;
  source: source;
  events: event;

  getData(): questionData {
    let qdata = new questionData();
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
    this.title = input.title;
    this.uid = input.uid;
    this.groupUid = input.groupUid;
    if (this.groupUid)
      this.uid = this.parentGroup.parentMenu.uid + '.' + this.groupUid + '.' + this.uid;
    this.fieldInfo = new FieldInfo().deserialize(input.fieldInfo, this);
    this.source = new source().deserialize(input.source, this);
    this.events = new event().deserialize(input.events, this);
    return this;
  }
}
