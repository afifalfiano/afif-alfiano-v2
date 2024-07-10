---
title: 'How to run Cypress in Angular with Github Action'
description: 'Hi, In this case, we will learn about how to add cypress for e2e testing in angular and run in GitHub action every push on Github. When GitHub action runs in the project.'
coverImage: '/assets/blog/25.angular-cypress/26.monitoring.png'
dateFormatted: '2021-12-03T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/25.angular-cypress/26.monitoring.png'
wordCount: 1113
layout: ../../layouts/post.astro
---

### Introduction

Hi, In this case, we will learn about how to add cypress for e2e testing in angular and run in GitHub action every push on Github. When GitHub action runs in the project, the cypress it will be run to test angular apps. To avoid wasting time let’s start the project.

For your information in this case we don’t have a fancy user interface because the main purpose of this blog is we can use cypress as a tool for e2e testing on angular and with GitHub action.

#### 1. Initialize Project

To start the project we can run this command

```js
ng new angular-cypress
```

<img src="/assets/blog/25.angular-cypress/1.generate.png" alt="Generate" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Wait a minute until the creating project is finished.

We need to check the project is not broken, so just serve the angular at the first time. We can use commands like this

```javascript
ng serve
```

If your project is not broken, that will show like the image below

<img src="/assets/blog/25.angular-cypress/2.serve.png" alt="Serve" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

#### 2. Adding Cypress on Project

After that, we add cypress to our project to run end-to-end testing. But the testing is not complex.

Just run this command to add cypress in project

```javascript
ng add @cypress/schematics
```

<img src="/assets/blog/25.angular-cypress/3.add-cypress.png" alt="Add-Cypress" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

If you want to change the default testing for e2e in angular just press Y for yes. The change is from protractor to cypress.

The process of adding cypress in angular takes a while time. So just wait until the process is finished.

<img src="/assets/blog/25.angular-cypress/4.finish-cypress.png" alt="Finish-Cypress" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

The cypress added some files and change some scripts in angular.json

#### 3. Write E2E Testing

Create a new file on folder cypress > integrations with file name ui.spec.ts 	and remove the example test with filename spec.ts

<img src="/assets/blog/25.angular-cypress/5.file-spec.png" alt="File-Spec" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

The next step is to write code for e2e testing. In this test, I just want to check the title of the project in the frame.
So, let’s write code test like this in the ui.spec.ts

```javascript
describe('My First Test', () => {
   it('Visits the initial project page', () => {
     cy.visit('/');
     cy.contains('Welcome');
     cy.contains('angular-cypress app is running!');
   });
 });
```

Every testing always has a main title of testing and the main title of testing have a child and it wraps on it(‘sub title’, () => ///code test ). The command visit means the cypress needs to visit on / or root and by default on cypress.json, we have config base URL on localhost:4200. The command contains means is cypress looking for every element that included that name, in this example is includes Welcome and angular-cypress app is running!

#### 4. Run Test in Localhost

Now, time to run the test in localhost. We have two types when running the e2e test with cypress. The first type is running in the terminal or console and the second type is running on the GUI of cypress. Let’s try the first type or on the console. If you want to run the e2e test in terminal mode, just run npm run cypress:run and make sure the project was run on localhost:4200.

<img src="/assets/blog/25.angular-cypress/6.run-local.png" alt="Run-Local-Spec" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

The left side of the terminal is the command to run project with ng serve and right side of the terminal is the command to run the test in the terminal with npm run cypress:run

Let’s try the second type is GUI of cypress. Just run npm run cypress:open and automatically will show this interface.

<img src="/assets/blog/25.angular-cypress/7.ui-spec.png" alt="UI-Spec" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Just click the Run 1 integration spec and the result of testing on the GUI of cypress is like this.

<img src="/assets/blog/25.angular-cypress/8.e2e-gui.png" alt="GUI-Spec" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

The one feature of cypress that I like is we can time travel on every step on e2e testing. If we hover the mouse in the contains Welcome, the interface it will show like this.

<img src="/assets/blog/25.angular-cypress/9.travel.png" alt="Travel-Test" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

See? We can identify where is the element’s location.

#### 5. Config Github Action

Create file github-action.yaml in  folder .github/workflows. If on your project the folder doesn’t exist, just create the new folder.

<img src="/assets/blog/25.angular-cypress/10.github-action.png" alt="Github-Action" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

After that at this config YAML to run cypress in GitHub action. Here is the code of github-action.yaml

````yaml
name: angular-cypress
 
on: [push]
 
jobs:
 cypress-run:
   runs-on: ubuntu-latest
   steps:
     - name: Checkout
       uses: actions/checkout@v2
     # Install NPM dependencies, cache them correctly
     # and run all Cypress tests
     - name: Cypress run
       uses: cypress-io/github-action@v2
       with:
         record: true
         build: npm run build
         start: npm start
         wait-on: 'http://localhost:4200'
         config: baseUrl=http://localhost:4200
       env:
         # pass the Dashboard record key as an environment variable
         CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
         # pass the project ID from the secrets through environment variable
         CYPRESS_PROJECT_ID: ${{ secrets.PROJECT_ID }}

````

After that, we create a new repository on Github and push this project. Make sure the name of the repository is the same as a project, for example, this project name is angular-cypress, so I create a new repository with the name angular-cypress too. Just git add the project, then git commit, and git push the project.

Because we need project id and record id from cypress. We should create an account at there and create a new project like this. Visit https://dashboard.cypress.io/login . You can log in with account Gmail or GitHub and after that create an organization for the project and just click create a new project.

<img src="/assets/blog/25.angular-cypress/11.dashboard-cypress.png" alt="Dashboard-Cypress" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Give a project name like this and the CI provider choose Github Action

<img src="/assets/blog/25.angular-cypress/12.new-project.png" alt="New-Project" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

After that copy the project id and record id like this

<img src="/assets/blog/25.angular-cypress/13.id-project.png" alt="Id-Project" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

The projectId copy on file cypress.json

<img src="/assets/blog/25.angular-cypress/14.project-id.png" alt="Project-ID" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Then the script of the record key copy on package.json

<img src="/assets/blog/25.angular-cypress/15.record-key.png" alt="Record-Key" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

To integrate our project and the dashboard cypress just run the npm run cypress:record.

<img src="/assets/blog/25.angular-cypress/16.integrate.png" alt="Integrate" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Wallaa!!!, The testing of a project runs on dashboard cypress.

After that git add, commit and push your changes project on your repository Github.

Visit the repository on GitHub and click on tab action.

Click on the build: add github action that still running and the detail show is like this.

<img src="/assets/blog/25.angular-cypress/17.build.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oh nooo! The testing is getting an error

<img src="/assets/blog/25.angular-cypress/18.build-error.png" alt="Error" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

We need to add the Cypress record key on the environment variable at Github.

#### 6. Add Github Env Variable

On the repository project just click on tab settings

<img src="/assets/blog/25.angular-cypress/19.variable.png" alt="Tab-Variable" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Then go to secrets.

<img src="/assets/blog/25.angular-cypress/20.new-variable.png" alt="New-Variable" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Click create a new repository secret.

<img src="/assets/blog/25.angular-cypress/21.key-record.png" alt="Key-Record" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Add the name of the secret is CYPRESS_RECORD_KEY and paste the key record on the field value.

<img src="/assets/blog/25.angular-cypress/22.success-key-record.png" alt="Success-Key-Record" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Back in the tab Action and click on the build was failed.

<img src="/assets/blog/25.angular-cypress/23.rebuild.png" alt="Rebuild" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Click on the re-run all jobs at the top left.

Just waiting at the moment

<img src="/assets/blog/25.angular-cypress/24.wait-rebuild.png" alt="Wait-Rebuild" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap the testing has completed without error

<img src="/assets/blog/25.angular-cypress/25.success-rebuild.png" alt="Success-Rebuild" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

For your information, we can check the result of the test in dashboard.cypress.

<img src="/assets/blog/25.angular-cypress/26.monitoring.png" alt="Monitoring" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, the result of the test from GitHub action. So the integration is successful.

This is my project on GitHub :

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/angular-cypress" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/angular-cypress</div><div class="link-preview-widget-description">Contribute to afifalfiano/angular-cypress development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/angular-cypress" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/e9862433a8a0f37dd7eda0c56cedb887f2c900fa4ad8bfd556179391162d56a2/afifalfiano/angular-cypress');" target="_blank"></a></div></p>

I think that is enough for me and hopefully useful for all of you guys. Thank you.

#Tutorial #Angular #Cypress #E2E #Testing
