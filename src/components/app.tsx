import * as React from "react"
import {Simulate} from "react-dom/test-utils";
import {Todo} from "./todo";
import {splService} from "./splservice";
import {menu} from "./model/menu";
import {Group} from "./group";

export interface AppState {
    menu: menu
}

export class App extends React.Component<{}, AppState> {
    service = new splService();

    constructor(p: any) {
        super(p);
        this.state = {menu: null};
        this.service.getData((d) => {
            this.setState({menu: d});
        });
    }

    render() {
        return (
            (this.state.menu != null) ?
                <div>
                    <h1>{this.state.menu.title}</h1>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                                 aria-orientation="vertical">
                                {this.state.menu.groups.map((gr) => {
                                    return (
                                            <a className="nav-link"  data-toggle="pill" role="tab" aria-controls={"v-pills-"+gr.uid} aria-selected="true"
                                               href={'#' + gr.uid}>{gr.title}</a>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                {this.state.menu.groups.map(function (gr) {
                                    return (
                                        <div key={'a'+gr.uid} id={gr.uid} className="tab-pane fade group">
                                            <Group group={gr}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>


                : <div></div>

        );
    }

}