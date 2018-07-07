import {group} from "./model/group";
import {splService} from "./splservice";
import * as React from "react";
import {Question} from "./question";

export interface GroupProps {
    group: group
}

export class Group extends React.Component<GroupProps, {}> {
    constructor(p: any) {
        super(p);
    }

    render() {
        return (
            <div className="row">
                {this.props.group.questions.map(function (q) {
                    return (
                        <div className="col-md-3">
                            <Question key={q.uid} question={q}/>
                        </div>
                    )

                })}
            </div>)
    }
}