import * as React from "react"

export interface TodoProps {
    name: string;
    id: number;
    onRemoved:((name: string)=> void);
}

export class Todo extends React.Component<TodoProps, {}> {
    render() {
        return(
            <li><a onClick={()=>this.props.onRemoved(this.props.name)}>-</a><span>{this.props.name}</span></li>
        )
    }
}