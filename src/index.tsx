import * as React from "react";
import * as ReactDom from "react-dom";
import {Todo} from "./components/todo";
import {App} from "./components/app";
import {splService} from "./components/splservice";


ReactDom.render(
    <App />,
    document.getElementById('main')
)


