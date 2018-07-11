import {menu} from "./model/menu";
import * as React from "react";
import {splService} from "./splservice";

export interface GroupListProps {
    menu: menu
}

export class GroupList extends React.Component<GroupListProps, {}> {
    service = new splService();

    render() {
        return (
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                 aria-orientation="vertical">
                {this.props.menu.groups.map((gr, i) => {
                    return (
                        <a key={gr.uid} className={i == 0? "nav-link active":"nav-link"} data-toggle="pill" role="tab"
                           aria-controls={"v-pills-" + gr.uid} aria-selected="true"
                           href={'#' + gr.uid}>
                            <div>
                                <span>{gr.title}</span>
                            </div>
                        </a>
                    )
                })}
            </div>
        );
    }
}

