# Purpose
Do React javascript tutorial

# References

## tic-tac-toe game
https://reactjs.org/tutorial/tutorial.html

## A re-introduction to JavaScript
https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript

## README-react.md

# Results

## npm start
To start app in terminal run

    npm start

terminal output:
Compiled successfully!

You can now view tic-tac-toe in the browser.
  Local:            http://localhost:3000/
  On Your Network:  http://10.0.0.4:3000/

To stop app in terminal run ctrl-c

## Visual Studio Code to debug and set breakpoints
To start VS Code

    cd <project directory>
    code .

See also Appendix Visual Studio Code Attaching to Node.js

### set breakpoints
In javascript files set breakpoints.

### npm start
Can do this within VS Code terminal or from iTerm

### run vs code configuration
Tap green triangle, configuration "Launch Chrome against localhost"

### debug
In VS Code on left column tap debug icon.
Use app. Execution pauses at breakpoint.

# Appendix- create-react-app
Used this to generate a new project.

In terminal ran
    create-react-app tic-tac-toe

Success! Created tic-tac-toe at /Users/stevebaker/Documents/projects/javascriptProjects/react-projects/tic-tac-toe
Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd tic-tac-toe
  yarn start

# Appendix Visual Studio Code Attaching to Node.js
https://code.visualstudio.com/docs/nodejs/nodejs-debugging

If you want to attach the VS Code debugger to a Node.js program, launch Node.js in VS Code's integrated terminal as follows:

    node --inspect program.js

or if the program should not start running but must wait for the debugger to attach:

    node --inspect-brk program.js

Now you have three options for attaching the debugger to your program:...
