import * as React from "react"
import {Simulate} from "react-dom/test-utils";
import {Todo} from "./todo";
import {splService} from "./splservice";
import {menu} from "./model/menu";
import {Group} from "./group";
import './css/app.css'
import {GroupList} from "./GroupList";
import {SearchDialog} from "./search-dialog";
import * as bootstrap from 'bootstrap';
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
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        })
    }

    search = () => {
        $('#myModal').modal()
    };
    loadFk = (fkId: number) => {

        this.state.menu.init();
        this.service.loadFK(this.state.menu, fkId, (data: any) => {
            this.state.menu.fkId = fkId;
            for (let guid in data) {
                for (let quid in data[guid]) {
                    let foundQuestion = this.state.menu.findQuestion(guid, quid);
                    if (foundQuestion)
                        foundQuestion.value = data[guid][quid];
                }
            }
            this.forceUpdate();
        });
    }

    render() {
        return (
            (this.state.menu != null) ?
                <div>
                    <header>
                        <h1>{this.state.menu.title}</h1>
                        <div className={'div-buttons'}>
                            <button className='search-button icon' onClick={this.search}>
                                <i className="fa fa-search"/>
                            </button>
                            <button className={'load-button icon'}>
                                <i className="fa fa-book-open"/>
                            </button>
                        </div>
                        <div className={"clear"}></div>
                    </header>
                    <hr/>
                    <div className="row">
                        <div className="col-md-3">
                            <GroupList menu={this.state.menu}/>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content">
                                {this.state.menu.groups.map(function (gr, i) {
                                    return (
                                        <div key={gr.uid} id={gr.uid} className="tab-pane fade  group">
                                            <Group isSearch={false} group={gr}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <SearchDialog onSelect={this.loadFk} group={this.state.menu.search}/>
                </div>
                : <div></div>

        );
    }

}