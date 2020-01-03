# ReactJS Burger Builder

#### A ReactJS Development Reference Material

##### By Adam Chew

## Description

This repository was built with [Create React App](https://create-react-app.dev/) with the intention to act as a reference material for future Web Development with ReactJS.

The project utilises the following technological stacks:

|     Concept      | References                                                |
| :--------------: | --------------------------------------------------------- |
|      UI/UX       | [ReactJS](https://reactjs.org/)                           |
|                  | [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) |
|                  | [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)   |
| State Management | [Redux](https://redux.js.org/)                            |
|                  | [Redux-Thunk](https://github.com/reduxjs/redux-thunk)     |
|     Testing      | [Jest](https://jestjs.io/)                                |
|                  | [Enzyme](https://airbnb.io/enzyme/)                       |

## Pre-requisites

The following software should be installed prior to running the project.

| Concept         | References                       |
| --------------- | -------------------------------- |
| Dev Environment | [NodeJS](https://nodejs.org/en/) |


The following software are recommended to be installed prior to running the project.

| Concept        | References                                           |
| -------------- | ---------------------------------------------------- |
| IDE            | [Visual Studio Code](https://code.visualstudio.com/) |
| Source Control | [GIT](https://git-scm.com/)                          |

## Set-Up & Installation

### 1. Downloading/Checking out the repository.
Download a zip file or checkout the project repository [here](https://github.com/adamchew89/BurgerBuilder) from a public Github repository.

### 2. Install project dependencies via NPM.
Run the following command in your preferred choice of command terminal:
```
cd ~/<project root>
npm install
```

### 3. Run the project on a development server.
Run the following command:
```
npm run start
```
and you should see the following output on the terminal:
```
Compiled successfully!

You can now view burger-builder in the browser.

Local:            http://localhost:3000/
On Your Network:  http://10.0.75.1:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```
Proceed to the url stated and you should have a running application of the Burger Builder.

## Testing

### 1. Execute test runner.
Run the following command:
```
npm run test -- --watchAll
```
and you should see the following output on the terminal:
<details>
<summary>View Output</summary>
<code>
> burger-builder@0.1.0 test ~\BurgerBuilder
> react-scripts test "--watchAll"
 PASS  src/hocs/Layout/Layout.test.js (6.608s)
 PASS  src/containers/Auth/Auth.test.js (6.904s)
 PASS  src/components/Navigation/Toolbar/Toolbar.test.js (6.821s)
 PASS  src/App.test.js (7.179s)
...

Test Suites: 36 passed, 36 total
Tests:       127 passed, 127 total
Snapshots:   0 total
Time:        14.79s
Ran all test suites.
</code>
</details>

### 2. Generate Code Coverage Report
Run the following command:
```
npm run test -- --watchAll --coverage
```
and you should see the following output on the terminal:
<details>
<summary>View Output</summary>
<code>
> burger-builder@0.1.0 test ~\BurgerBuilder
> react-scripts test "--watchAll" "--coverage"
 PASS  src/components/Navigation/SideDrawer/SideDrawer.test.js (6.215s)
 PASS  src/components/Navigation/Toolbar/Toolbar.test.js (6.137s)
 PASS  src/hocs/Layout/Layout.test.js (6.484s)
...

Test Suites: 36 passed, 36 total
Tests:       127 passed, 127 total
Snapshots:   0 total
Time:        17.159s
Ran all test suites.
</code>
</details>

and subsequently open the following file:
```
~/coverage/lcov-report/index.html
```
on a browser to view the generated coverage report.

## Deployment

### 1. Generating production ready code
Upon confirming that the code passes all its test. We can proceed to build the production code by running the following command:

```
npm run build
```
and you should see the following output on the terminal:
<details>
<summary>View Output</summary>
<code>
> burger-builder@0.1.0 build ~\BurgerBuilder
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  60.7 KB  build\static\js\2.6a646185.chunk.js
  6.47 KB  build\static\js\main.0b3fd929.chunk.js
  2.33 KB  build\static\css\main.95aeeb8f.chunk.css
  1.99 KB  build\static\js\3.b8627037.chunk.js
  1.67 KB  build\static\js\4.0d620710.chunk.js
  1.52 KB  build\static\js\runtime-main.59dccd78.js
  790 B    build\static\js\5.519c8e59.chunk.js
  404 B    build\static\css\3.abaaa8f1.chunk.css
  373 B    build\static\css\4.dfe027cf.chunk.css
  237 B    build\static\css\5.79f199df.chunk.css

The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  bit.ly/CRA-deploy
</code>
</details>

Upon completion of building the production codes, you should have a new folder:
```
~/build/
```

### 2. Viewing the production code locally
As shown in the terminal output, you can proceed to do a final manual test of your production version by running the following command to spin up an instance locally:
```
npm install -g serve
serve -s build
```
<details>
<summary>View Output</summary>
<code>
┌───────────────────────────────────────────────┐
│                                               │
│   Serving!                                    │
│                                               │
│   - Local:            http://localhost:5000   │
│   - On Your Network:  http://10.0.75.1:5000   │
│                                               │
│   Copied local address to clipboard!          │
│                                               │
└───────────────────────────────────────────────┘
</code>
</details>

During this stage, you can test out features that are normally not tested during the development stages such as:
- caching, 
- sessions or local storage, 
- and generally any progressive web application (PWA) features involving the service worker.

### 3. Deployment

In order to deploy the production code upon your preferred server, it is recommended that you follow the instructions stated on their respective documents.

However, generally, you will have to:
- Copy everything contained within '~/build' onto the server's directory.
- Ensure that 'index.html' is served for all url including 404. (ReactJS Single Page Application handles routing internally and will fail if the server manages the routing before ReactJS gets its chance).

## Reference Guide

### Project Reference Breakdown
| Item            | Reference          | Description                                                                                                                                                                                    |
| --------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Components      | ~/src/components/  | Components are reusable components that focuses on rendering UIs and managing only its local state. Examples: Show or hide 'Modal'.                                                            |
| Containers      | ~/src/containers/  | Containers are usually project specific and focuses on managing application state and renders components. Examples: Managing a list of 'Ingredient' to be passed to multiple child components. |
| Actions         | ~/src/actions/     | Actions are outward reaching functions. Examples: API calls.                                                                                                                                   |
| HOCs            | ~/src/hocs/        | Higher Order Components (HOCs) are reusuable wrapping components or functions that introduces additional local states and/or component behaviours.                                             |
| Utils           | ~/shared/utils     | Utils are reusuable functions. These functions are usually in javascripts and not ReactJS related. Examples: Regex, formatter, etc.                                                            |
| Stores          | ~/stores/          | Stores holds Action Creators and State Reducers.                                                                                                                                               |
| Action Creators | ~/stores/actions/  | Action Creators are functions that triggers a side effect or triggers changes outside the scope of the calling function. In this case, it calls a state reducer into action.                   |
| State Reducers  | ~/stores/reducers/ | State Reducers are functions that modifies the application's state. They digest side effects of Action Creators and updates the application state accordingly.                                 |
| Tests           | ~/**/*.test.js     | Test files contains the test specification for their respective components/containers/HOCs or functions. Test suites act as a summary of the expect behaviours.                                |

###### Credits: Maximilian Schwarzmuller & Academind.com

