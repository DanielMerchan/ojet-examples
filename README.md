# Oracle JET : JET Examples

## ojet-interationalization

Contains the Logic for changing and managing the current Language.

### Files
- ```\js\utils\Languages.js```  -> Factory with the Oracle JET Supported Languages and useful Operations
- ```\js\appController.js``` -> Contains the Logic using Language module for setting up the default Language and chaging it.
- ```\js\index.html``` -> Added a Select One for chaging the language.

### Notes and Enhancements coming
- This will be moved to a Web Component called ```html <coj-lang-selector>```
- Note it displays 15 by default as ComboxBox and SelectOne limits the max-results, type for searching for the other Languages
- It is intended to render the flags in the options. A custom Renderer will be added for this capability.
Include the JET Composite as part of you View Model JavaScript file
