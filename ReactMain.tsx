/// <reference path="node_modules/@types/electron/index.d.ts" />

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {SvgContainer} from "./SvgContainer";

ReactDom.render(<SvgContainer height={100} width={100}>
        <rect height={50} width={50} x={25} y={25} fill="mediumorchid" stroke="crimson" strokeWidth={3}/>
    </SvgContainer>,
    document.getElementById('container'));
