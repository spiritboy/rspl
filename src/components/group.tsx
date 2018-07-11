import {group} from "./model/group";
import {splService} from "./splservice";
import * as React from "react";
import {Question} from "./question";

export interface GroupProps {
    group: group,
    isSearch: boolean
}

export class Group extends React.Component<GroupProps, {}> {
    service = new splService();

    constructor(p: any) {
        super(p);
    }

    save = () => {
        this.service.saveGroup(this.props.group);
    };

    render() {
        return (
            <div className="group">
                <div className="row">
                    {this.props.group.questions.map(function (q) {
                        return (
                            <div key={q.uid} className="col-md-3">
                                <Question question={q}/>
                            </div>
                        )
                    })}

                </div>
                <div>
                    {(this.props.isSearch == false) ?
                        <div>
                            <button className="icon spl-save" onClick={this.save}><i className="fa fa-check"/></button>
                            <button className="icon spl-cancel-save"><i className="fa fa-times"/></button>
                        </div>
                        :
                        <div></div>

                    }
                </div>
            </div>)
    }
}