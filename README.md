# git-permissions-auditor

*A tool to allow easy checking of permissions groups used in Atlassian Bitbucket Server*

## Motivation

When we first setup Bitbucket Server at my company, we hadn't established how we wanted to do role based 
access control. This led to a lot of permissions being set up that didn't follow the 
conventions we established later. Also, even when creating new permissions, system administrators
sometimes make mistakes. This tool allows you to easily find (and outside of the tool correct) these 
mistakes.

The tool was developed with specific hard-coded security group naming rules described below. As such, it 
won't be useful to the broader community without modification, but by posting it publicly on 
git-hub it may serve as a useful example of:

* An electron application using react and redux that calls into a REST API.
* An example of how to call the Bitbucket Server APIs - and handle paged Atlassian APIs - in React and Redux
* A bit of functional programming in ES6 JavaScript 

*Caveat:* This is my first electron/react/redux app - and the first web application I've implemented from the ground up (relying on many excellent books, articles and examples of course). When I started, I'd barely touched JavaScript, and I'd also never done any functional programming. I used this project as a learning opportunity for all of these.

## Usage

### Setup
1. Clone the repo 
2. Download and install [Node.js|https://nodejs.org/en/] if not already installed
3. In `Git Bash`:
   1. run `npm install` in the root directory of your cloned repo. This will install all of the other dependencies
   2. run `npm run bundle` to bundle the application
   3. run `npm start` to start the application

### Using the app
Start the application using `npm start` and enter your *system administrator* credentials.
The tool will fetch all of the permissions groups used on the git server and display the ones
that are invalid - meaning that they do not conform to the following expected
patterns:

1. System permissions: `TOOL_Git_System Admins` or `TOOL_Git_Users` 
1. Project permissons: `TOOL_Git_${projectKey}_[Admin|Write|Read]` 
1. Repo permissions: `TOOL_Git_${projectKey}_[${repoSlug}|*|#]_[Admin|Write|Read]` 
1. Branch permissions: `TOOL_Git_${projectKey}_[${repoSlug}|*|#]_${branchOrPattern}_[Read|Write]` 

`${projectKey}`, `${repoSlug}`, and `${branchOrPattern}` are expected to have been normalized as follows:

* underscore characters _must_ be replaced by `^`
* forward slash characters _may_ be replaced by `%`
* star characters _may_ be replaced by `#`

The tool does not check:

* that the groups actually exist in the directory
* that the branch patterns specified actually make sense
* any inidividual user permissions 

## Development 

### Test 
* `npm run test` - runs the unit tests
* `npm run test-watch` - automatically re-runs all unit tests every time you change some code or tests

### Lint
* `npm run lint` at the command line, or configure your editor or IDE to use eslint.

### Bundle
* `npm run bundle` - builds the application
* `npm run bundle-watch` - can be used during development to automatically rebuild the application on file changes

### Run
* `npm start` runs the electron application. 

## References

I wanted to mention a few books that were very helpful: 
* Learning React by Alex Banks, Eve Porcello 
* Functional Programming in JavaScript by Luis Atencio
* Developing an Electron Edge by Adam Lynch, Troy Mott, Max Gfeller

Also, for those of you curious about Role Based Access Control using Active Directory - I recommend the following book:
* Windows Administration Resource Kit: Productivity Solutions for IT Professionals by Dan Holme

## Possible future work

### Static web app
I wanted to be able to deploy this as an S3 static web application instead of an electron app, but unfortunately, when the application is run from a browser, CORS becomes an issue. There is currently no way to configure Bitbucket Server to whitelist my S3 bucket URL as a safe origin for cross-origin requests. 

I did find this information that looked promising from [Adaptavist ScriptRunner](https://scriptrunner.adaptavist.com/latest/bitbucket/rest-endpoints.html#_allow_cross_domain_requests), but when I entered the example code (adding the required import statements) the console showed a number of errors.

If Bitbucket server adds whitelisting support in the future, or if you want to start proxying requests, then turning this into an S3-hosted web app is easy. You'll need to upload the files referenced in index.html (or use files from CDNs where appropriate) and modify index.html to take into account any directory structure changes you want to make. 

You'll probably also want to add a favicon with a line something like this in the `head` section of your index.html file:

    <link rel="icon" type="image/png" href="./dist/images/favicon.png">


### Package and Install

I also spent a bit of time working on packaging the electron app, but ran into some errors and concluded it wasn't worth the effort. It's very easy to run the application using the method described above, and the electron-packager was hanging and not completing so I just put it aside. If you are interested in picking up this work, you can find a good article here:

* [Electron packager tutorial](https://www.christianengvall.se/electron-packager-tutorial/)

### Avoid logging in production 

The application is just an internal utility, so I didn't bother with different modes for development and production. Console logging is all localized to a single place using redux-logger, so it's easy to remove or comment out if desired.

### Improve performance

When you run the application you'll notice that the progress indicator doesn't run smoothly. I think this is due to not throttling API requests. I spent some time looking into throttling, and experimented with a few methods but wasn't successful. Other than the UI not being smooth while loading, it doesn't seem to cause problems.
