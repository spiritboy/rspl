import {group} from "./model/group";
import {splService} from "./splservice";
import * as React from "react";
import {Question} from "./question";
import {Group} from "./group";

export interface SearchDialogProps {
    group: group,
    onSelect:((fkId: number)=> void);
}

export interface SearchDialogState {
    searchResult: SearchItemRow[],
    cols: string[]
}

export interface SearchItemRow {
    data: any,
    isSelected: boolean
}

export class SearchDialog extends React.Component<SearchDialogProps, SearchDialogState> {
    splservice = new splService();

    constructor(p: any) {
        super(p);
        this.state = {cols: [], searchResult: []};
    }

    normalizeItem(item: any, parent: string, MAINITEM: any) {

        for (let j in item) {
            if (typeof(item[j]) == "object") {
                var obj = this.normalizeItem(item[j], j.toString(), MAINITEM);
            }
            else {
                MAINITEM[parent ? parent + '.' + j : j] = item[j];
            }
        }
    }

    search = () => {
        this.splservice.searchMenu(this.props.group, (res) => {
            var searchResultNormalized: SearchItemRow[] = [];
            for (let i in res) {
                var mainItem = {};
                this.normalizeItem(res[i], '', mainItem);
                searchResultNormalized.push({isSelected: false, data: mainItem});
            }


            console.log(searchResultNormalized)

            this.setState({searchResult: searchResultNormalized});
            this.calculateColumns();
        })
    };

    calculateColumns(): void {
        let cols: string[] = [];
        if (this.state.searchResult && this.state.searchResult.length > 0) {
            for (let col in this.state.searchResult[0].data)
                if (col != "_id" && col != "isSelected" && col != "fkId")
                    cols.push(col);
        }
        this.setState({cols: cols});
    }

    rowClicked = (row: SearchItemRow) => {
        this.state.searchResult.forEach((value, index) => {
            value.isSelected = false;
        });
        row.isSelected = true;
        this.setState({searchResult: this.state.searchResult});
    }
    selectRow = () => {
        this.state.searchResult.forEach((value, index) => {
            if(value.isSelected == true)
                this.props.onSelect(value.data.fkId);

            $('#myModal').modal('toggle');
        });
    }

    render() {
        return (
            <div className="modal fade" id="myModal" tabIndex={-1} role="dialog"
                 aria-labelledby="myModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <Group group={this.props.group} isSearch={true}/>
                            <div>
                                <button className="icon" onClick={this.search}><i className="fa fa-search"/></button>
                            </div>
                            <table className="table table-responsive-lg">
                                <thead>
                                <tr>
                                    {this.state.cols.map(function (c) {
                                        return (
                                            <th key={c}>{c}</th>
                                        )
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.searchResult.map((item: SearchItemRow, i: number) => {
                                    return (
                                        <tr className={(item.isSelected ? "active" : "")} key={i}
                                            title={item.isSelected.toString()}
                                            onClick={() => {
                                                this.rowClicked(item)
                                            }}
                                        onDoubleClick={this.selectRow}>
                                            {this.state.cols.map((col: any, i: number) => {
                                                return (
                                                    <td key={i}>{item.data[col]}</td>
                                                )
                                            })}
                                        </tr>

                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">خروج</button>
                            <button type="button" className="btn btn-primary">انتخاب</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}