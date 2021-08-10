# LABORATORY REACT GLSL BACKGROUND

https://laboratory-react-glsl-bg.herokuapp.com/

## Goal

This project is my playground for training for `GLSL` and aslo for making full screen effect. I am liking this project to the latest version of `react` with `r3f` or in full name `react-three-fiber`.

GLSL is hard language to learn because of the small resources available but it happens to be at the same time the most impressive effect that a website could have.

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Experiences](#experiences)
- [Tutorials](#tutorials)
- [Links](#links)
- [Documentation](#documentation)
- [Organization](#organization)
- [Development](#development)
- [Running](#running)
- [Commands](#commands)

## Experience

- **Experience 1**: Creating a noise materials
- **Experience 2**: Creating a fire materials (perfect for transition between one slide to another)

## Experience

- **Tutorial 1**: Drawing a circle by hypothenuse
- **Tutorial 2**: Max for drawing a rectangle
- **Tutorial 3**: Understanding step with a rectangle
- **Tutorial 4**: Drawing a circle
- **Tutorial 5**: Using a frac for drawing a zen garden
- **Tutorial 6**: Varying the radius of a circle for drawing forms
- **Tutorial 7**: Creating a shader using the shaderMaterial from drei 

## Links

- [Book of shaders](https://thebookofshaders.com/)
- [Shaderific API](https://www.shaderific.com/)
- [Iquilezles](https://iquilezles.org/)

## Documentation
#### Code documentation

The jsdoc can be generated locally with the following command :

```
npm run build:docs
```

## Organization
#### Organization of the global folder

| Folder's Name | Description of the folder                               |
| :------------ | :------------------------------------------------------ |
| out           | The documentation generated by jsdoc                    |
| public        | Regroup the images and public files                     |
| src           | Regroup the source code                                 |

#### Organization of the src folder

| Folder's Name | Description of the folder                               |
| :------------ | :------------------------------------------------------ |
| components    | Regroup the components used inside the pages            |
| constants     | Regroup the exported constants                          |
| pages         | Regroup the components representing the pages           |
| services      | Regroup the services of the app                         |
| styles        | Regroup the scss files                                  |


## Development

#### Creating a page

For creating a new page, you need to set create a components inside the folder *pages* and to connect it in *app* by creating a Panel with the size of the page and creating the route.

#### Packages

- **react-app-rewired**: Allow us to rewrite the config of React without ejecting the app
- **customize-cra**: Allow us to rewrite the config of webpack and create module alias
- **eslint**: For linting the code with EsLint
- **@babel/eslint-parser**: Changing the parser for having access to eslint in babel
- **eslint-config-airbnb**: For having the set of rules airbnb for eslint
- **eslint-plugin-import**: For managing the alias import with eslint
- **eslint-plugin-react**: For managing the react rules
- **prettier**: For formating the style of the code
- **eslint-plugin-prettier**: For using the prettier package with esLint
- **sass**: For using the SASS css preprocessor (scss)
- **jsdoc**: For managing the dev documentation of the project
- **react-router-dom**: For managing the router and the path to the differents pages
- **react-helmet**: For managing the meta of the differents page
- **three**: Allow us to use the webgl easily
- **@react-three/fiber**: For connecting three with react
- **@react-three/drei**: An extension of r3f for using the shader
- **wouter**: For managing the routing of the app easily

## Running

For running the API, a single command is needed.

```
npm run start
```

## Commands

- **npm run start**: Run the linter and then the project
- **npm run build**: Build the project
- **npm run test**: Run the test of the project
- **npm run eject**: Eject the application (sometimes necessary)
- **npm run linter:fix**: Run the linter and fix the errors
- **npm run build:docs**: Build the documentation from the comments in the code
- **npm run check-update**: Check if the package are up to date (for now, everything is except the testing and webvital)
