# Demo - Create Desktop App using Electron, React and TypeScript 2.0 over NodeJS

The accompanying repo is a demonstration of a minimal dev-environment for creating a desktop application using [Electron](http://electron.atom.io/) and [React](https://facebook.github.io/react/), written in [TypeScript](https://www.typescriptlang.org/) and executed with, well, [NodeJS](https://nodejs.org/en/).
The application itself is based on the demo app of Electron and present simple information with some drawing of a box.

This Readme file is a small guide for the creation of such an environment. It does not presume to give an overall introduction or guide for the mentioned platforms, but merely how to connect the dots.

## Introduction
**NodeJS** is basically the V8 engine of Google Chrome, taken out and wrapped with all sorts of goodies to create a cross-platform execution environment for applications written in JavaScript.
Using the platform of NodeJS one can write code that is run on the server side, and does not need any kind of explorer to run it. Another benefit is that now the JS code can reach machine resources like files.

**TypeScript** is a rising star language by Microsoft, which actually converges the great tools for SW engineering in languages like C#/Java with the agility and ease of data structure management in JavaScript.
The TypeScript language is actually a super-set of JavaScript, meaning that its compiler (tsc) outputs a JS code which you can run on platforms like Chrome, Edge or NodeJS.
It also means that you could write just JS code or mix TS with JS code - and the TS compiler will acknowlege it.
Typescript has always adhered to the ES standards, and even been ahead of it like in the case of the [async-await pattern](https://www.typescriptlang.org/docs/release-notes/typescript-1.7.html) presented in TS v1.7 while ES6 was still the de-facto JS standard.

**React** is a JS library by Facebook for creating the view part of the UI. It is a well adopted library and my favorite concept for creating a UI view is the usage of _JSX_ which is basically JS with embedded XML parts that describe the UI components. 
This approach allows designing the UI part directly into the JS code, thereby creating UI components that contain one another and their behavior - written in JS.
The TS compiler acknowleges _TSX_ which is the parallel to JSX in the TS world, so you can write React components in TS as well!

**Electron** Takes the idea of NodeJS to allow JS run outside the environment of an explorer, and combines it with the UI rendering engine of Chrome to create UI for a desktop application, written with web-tools (like React or Angular) and running cross-platform (remember NodeJS?) !

If you would just like to see it running, from the root folder:
```
npm run build
npm start
```
The build script calls the `bash devtools/copy-files.sh` script to copy all HTML and JSON files to the Output/ folder, so if you're on Windows and don't have bash installed - change this script or copy them manually.

For those of you who wants to build the dev-environment step by step - let us now create a dev environment combining all those cool tools for creating our own cross-platform, web-UI based, desktop application!

## Environment Structure
Our small environment contains of the following files & folders structure:
```
root/
 |--devtools/
 |--node_modules/
 |--Output/
 |--package.json
 |--tsconfig.json
 |--*.html
 |--*.tsx
```
- `devtools`: A folder containing additional scripts for the build process.
- `node_modules`: A folder containing the imported npm packages.
- `Output`: A folder containing the build artifacts, namely the JS and HTML files required for the execution.
- `package.json`: The npm definition file, including the dev-scripts.
- `*.html` & `*.tsx`: The project's sources.

## Step by step
This repo contains the whole project ready for use and study, or you can do it yourself, with the help of the following guide.

### Installing and Initializing a dev-environment
[Installing NodeJS](https://nodejs.org/en/) also brings us the [npm](https://www.npmjs.com/) tool.
Using npm, we now [install TypeScript 2.0](https://www.typescriptlang.org/index.html#download-links), globally:
`npm install -g typescript`

Now, we initialize an npm-package (project) environment:
`npm init`
Simply answer yes (default) to all questions, and you have a ready `package.json` under the root folder. We can now replace the contents of `package.json` with:
```JSON
{
    "name": "electron-example",
    "version": "1.0.0",
    "description": "",
    "main": "main.js",
    "scripts": {
        "start": "electron Output",
        "compile": "tsc",
        "clean": "rimraf Output",
        "copy": "bash devtools/copy-files.sh",
        "build": "npm run clean && npm run copy && npm run compile"
    },
    "author": "<your name here>",
    "license": "ISC",
    "dependencies": {
        "electron": "^1.4.4",
        "react": "^15.3.2",
        "react-dom": "^15.3.2"
    },
    "devDependencies": {
        "@types/electron": "^1.4.24",
        "@types/react": "^0.14.41",
        "@types/react-dom": "^0.14.18",
        "rimraf": "^2.5.4"
    }
}
```
Now, using this npm definitions file, we can install the React and Electron libraries:
`npm install`
This installs the required libraries, along with TS definition files in the new TypeScript 2.0 manner.
Note that the `package.json` file contains also a `scripts` section, which we will use for our build process.

Since we also want to run our Electron app from our PATH, we install Electron globally as well:
`npm install -g electron`

### The dev-environment helper scripts (npm scripts)
Unlike JS, which execution is just running the entry JS source, TS is compiled into JS. So if we compile the TS code into a separate folder, in our case the `Output/` folder, we can start running our app from there.
As you can see in file `package.json`, in the `scripts` section - the build script is:
`"build": "npm run clean && npm run copy && npm run compile"` - run the clean, the copy and the compile scripts:
`"clean": "rimraf Output"` - clean simply removes the artifacts folder.
`"copy": "bash devtools/copy-files.sh"` - if you look in the bash script for the copy script, you can see that it copies all HTML and JSON files from the sources folder to the `Output/` folder. There are many ways to run bash on Windows, but you can always simply change it to a Windows batch file.
`"compile": "tsc"` - the compile script simply runs the TS compiler.

Also, running the app uses the script:
`"start": "electron Output"` - using electron, run the npm package in `Output/` folder. Since with the build script we copy there also the `package.json` file - the entry point is given.

So for actually:
- Clean & build the app: `npm run build`
- Running the app: `npm start`

A few words about tsc, the TypeScript compiler. tsc can accept switches with the command line (and it has many) or have it given a `tsconfig.json` configuration file, like in our case:
```JSON
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "outDir": "Output",
        "inlineSourceMap": true,
        "jsx": "react",
        "strictNullChecks": true
    },
    "exclude": [
        "node_modules",
        "Output"
    ]
}
```
Here we instruct tsc to compile the TS code to ES6 JS standard, understand that if there's JSX embedded - it is React's (so the XML is compiled directly to React's API calls) and output all of the artifacts to the `Output/` folder.
Note that `strictNullChecks` switch is used, which is a new feature of TS 2.0 that can statically analyze the code for cases where a null-reference may happen. Since enabling this switch is a breaking change - it is recommended to enable it right on the start of the project development. More about this feature - [here](https://www.typescriptlang.org/docs/release-notes/typescript-2.0.html).

You can find more about `tsconfig.json` [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

### The code
Now that we have a minimal development environment, we can start adding the actual application code.

As you can see in file `package.json`, the entry point is `main.js`, meaning we have a `main.ts` source. In this case, this file is taken directly out of the Electron demo app, for initialization and execution. You may find many tools, components, boiler plate applications and other cool stuff for Electron [here](http://electron.atom.io/community/).
The purpose of the `main.ts` is, therefore, initializing the Electron platform and loading our `index.html` into view:
_file main.ts:_
```javascript
win.loadURL(`file://${__dirname}/index.html`);
```
In `index.html` you will find other than the 'Hello World' message, the following:
_file index.html:_
```HTML
<div id="container">
    <!-- This element's contents will be replaced with your React component. -->
</div>
```
This `container` element ID is used to identify where we will put our React's view. We also include our React file in this HTML:
_file index.html:_
```HTML
<script>
    require('./ReactMain');
</script>
```

Having created our basic HTML to load, let's create our view with React. We are going to display an SVG of a purple-filled rectangle with red boundaries.
In React, we are creating UI components that maintain their own properties (in `this.props`) and state (in `this.state`) and possibly other components. `props` are the immutable part of the component while `state` can be changed throughout its life cycle.
Another thing that those components do is implement a `render` function that is called by the React environment once their `props` or `state` is changed, or other reasons for rendering, like a change in children.
Aside for our custom components, there's an assortment of ready-made components and containers to work with.
For the sake of the demonstration, let's create a React component, `SvgContainer` which is used, well, as a container to SVG components.
TS approach is to be strongly typed where we can, so in TS we create interfaces for describing our components' `props` and `state`. In this case we only need the `props` part:
_file SvgContainer.tsx:_
```typescript
export interface SvgContainerProps {
    height: number;
    width: number;
}
```
and then we use it when defining our component. Note the use of JSX in the TS code:
_file SvgContainer.tsx:_
```typescript
export class SvgContainer extends React.Component<SvgContainerProps, {}> {
    render() {
        return <svg {...this.props}>{this.props.children}</svg>;
    }
}
```
The XML part in the TS code is the JSX defining the component: use the library component `svg` with the given `props` and include in it the children of the component given also in the `props`.
Note that we define `class SvgContainer` as a `React.Component` class accepting its `props` as we defined the interface `SvgContainerProps` to be.

Another very powerful thing to notice here is that not only JSX is an XML embedded within TS (or JS) - but also that **within JSX we can embed JS code!**, the code within `{}` is a TS expression!

Finally, this is our SvgContainer.tsx source:
```typescript
import * as React from 'react';

export interface SvgContainerProps {
    height: number;
    width: number;
}

export class SvgContainer extends React.Component<SvgContainerProps, {}> {
    render() {
        return <svg {...this.props}>{this.props.children}</svg>;
    }
}
```

Now, in order to use our component, we can embed it in another component, but eventually we get to the root of all components - where the React starts its rendering.
In every React application there's one of the following lines, using the ReactDom library to render the React components into the hosting HTML for view:
_file ReactMain.tsx:_
```typescript
ReactDom.render(<SvgContainer height={100} width={100}>
        <rect height={50} width={50} x={25} y={25} fill="mediumorchid" stroke="crimson" strokeWidth={3}/>
    </SvgContainer>,
    document.getElementById('container'));
```
`ReactDom.render()` renders our `SvgContainer` which is set with the `props` for `height` and `width` and a child of an svg component of `rect` to produce our rectangle (see its `props`) - into the 'container' ID-ed element in our loaded document (`index.html`). 

Little does React know that it is not presented as a web-page on Chrome or Edge - but as a view for a desktop application executed with NodeJS and it can run on Windows, Linux or MacOS!

All that is now remaining is to run from the root folder:
```
npm run build
npm start
```
and you can see the application running in its own desktop window. Click Ctrl+Shift+I, and you will be reminded that all of the UI rendering is indeed HTML & JS within the Chrome UI rendering engine!

### Conclusion
I was having lots of fun creating this little demo and walk-through.
Getting acquainted with the powerful tools of React and its powerful and well defined JSX, and of Electron as a cross platform for creating desktop applications with the powerful tools of web-presenting has taught me a lot.

I hope you enjoyed this as much as I did creating it, and fully understand the potential within this combination of NodeJS, TypeScript, React and Electron platforms and tools.
