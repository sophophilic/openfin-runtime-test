# OpenfinRuntimeTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.0.
This project is intended to test OpenFin Runtime features and identify issues during the runtime upgrades

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run openfin app for testing runtime

Open 2 terminals/cmd instance
1. on first one, run `npm start`. It should start the local development server and `http://localhost:4200` should be accessible.
````
path should be ~\openfin-runtime-test\ before running npm start
````
2. On Second terminal/command prompt - 
````
path should be ~\openfin-runtime-test\ before running the below commands
cd src
scripts\run-openfin.bat
````

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
