This sample project is designed to help developers get started with JET 
using TypeScript as the primary language.

Follow these steps to setup and run the project.

1) Make sure you have the current version of the JET Command Line Interface(CLI) installed

ojet --version (should be 6.0.0 or higher)

If you have a version of the CLI that is older that v6.0.0 or it is not installed at all, run:

<sudo>npm -g install @oracle/ojet-cli

2) Make sure you have TypeScript installed as a global package.

<sudo>npm -g list typescript

3) From the root of the starter template project, run:

ojet restore

4) Once this is completed, open a second command window and from the root of the project run:

tsc -w

5) Return to the first command window and run:

ojet serve


By using the two command windows, the TypeScript compiler will watch for any changes to .ts files in the project.  
The JET CLI will watch for any changes to .js/.html/.css files and update the browser when it sees those changes.

[[IMPORTANT]]  Only make changes to files that are located in the /src folder.  
All files located in the /web folder will be overwritten at build time.

If you add new files to your project, you will need to stop (Ctrl-C) the ojet serve 
command and restart to pick up the new files.



 