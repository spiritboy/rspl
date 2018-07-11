import {question} from "./model/question";
import * as React from "react";
import Select from 'react-select';
export interface QuestionProps {
    question: question
}

export interface QuestionState {
    value: string;
}

export class Question extends React.Component<QuestionProps, QuestionState> {
    constructor(p: any) {
        super(p);
        this.state = {value: ''};
        this.props.question.value='';
        $(document).ready(function() {
              // $('.select2').select2({
              //     theme: "bootstrap"
              // });
            //$(".date").pDatepicker();
        });
    }

    onValueChange = (e: any) => {
        this.setState({value: e.target.value});
        this.props.question.value = e.target.value;
    };
    renderInput(){

    }
    render() {
        let field;
        if(this.props.question.fieldInfo.type == "text"){
            field = <input value={this.props.question.value} onChange={this.onValueChange} className={"form-control"}/>
        }
        else if(this.props.question.fieldInfo.type == "select"){
            field =
                <Select  name={this.props.question.uid} options={[{ value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' }]}>
                </Select>

        }
        if(this.props.question.fieldInfo.type == "date"){
            field = <input value={this.props.question.value} onChange={this.onValueChange} className={"form-control"}/>
        }
        return (

            <div className={"form-group"}>
                <label className={"control-label"}>{this.props.question.title}</label>
                {field}

            </div>
        )
    }
}