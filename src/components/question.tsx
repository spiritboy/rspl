import {question} from "./model/question";
import * as React from "react";
import {GroupProps} from "./group";

export interface QuestionProps {
    question: question
}
const questionStyle = {
    width:'150px!important',
    display:'block'
};
export class Question extends React.Component<QuestionProps, {}> {
    constructor(p: any) {
        super(p);
    }

    render() {
        return (
            <div>
                <span style={questionStyle}>{this.props.question.title}</span>
                <input/>
            </div>
        )
    }
}