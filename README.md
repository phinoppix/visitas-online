I started this project to help my volunteer friends helping the deaf community.

This application is basically an address book of individuals that the volunteers are helping.

Since volunteers cover a vast area, the region they visit are split into territories.  A map will be added later to define the boundaries of those territories.


## Technology stack
Frontend: Svelte

Backend: Node.js + Typescript + Apollo Graphql

Database: SqlServer Express 2019

ID Provider: Okta

### Deployment

Admins are most likely to run the app in silos because of internet access and cost related issues.
They are just volunteers after all so I have to keep the cost of running and maintaining the app close to zero for the admins.

Currently, there are 2 confirmed deployment scenarios:
- a home server running on Windows and IIS
- laptop as a stand-alone app

As a web app, the deployment scripts are ready and being tested.  As a stand-alone app, I will be exploring `pkg` next.
