import {questionData} from "./questionData";

export class groupData {
  uid: string;
  menuuid: string;
  title: string;
  questionsData: questionData[] = [];
  fkId: number = 0;



  normalizeData(isSearch: boolean): any {
    var obj: any = {};
    for (let q in this.questionsData) {
      if (this.questionsData[q].value!=null)
        obj[this.questionsData[q].uid] = this.questionsData[q].value;
      else if(isSearch)
        obj[this.questionsData[q].uid] = "";
    }

    return obj;
  }

}
