<<<<<<< HEAD
# att-lmt #

Local Marketing Tool for AT&T Sales Support.

This web based software is a helpful tool for AT&T employees. It's to be used while interacting with the customer. It's purpose is to easily show the options available to a customer and to quickly and accurately generate price quotes.

## Project Structure ##
All of the behaviors and logic for LMT are handled in the /js folder. You can see this by looking at /index.html. There's nothing inside. The files in /js are written with the MVC pattern in mind. This highly organized code structure is meant to help developers on the project write easily maintainable code.

- /js/libs -- These contain the base libraries for the software.

- /js/models -- All of the app data is stored and manipulated via these models.

- /js/templates -- These compiled templates are generated markup from the html files in /templates.

- /js/views -- The view logic and behaviors.

- /routes.js -- This important file manages application state and routing.

## Front-End Technologies ##
The LMT tool uses advanced front-end technologies to optimize its experience for tablets. Its codebase is highly organized in order to help any developer who may work on it. If you are working on the code in this project please try to place things in the correct place.

### Dust Templates with HTML5 ###
All of the HTML in the LMT experience is written and included via the <a href="http://akdubya.github.com/dustjs/">dust.js</a> templating system. Dust was <a href="http://engineering.linkedin.com/frontend/leaving-jsps-dust-moving-linkedin-dustjs-client-side-templates">popularized by LinkedIn</a>, and it has several advantages over other templating systems, principly speed. Learn more about how to write dust templates by reading <a href="https://github.com/linkedin/dustjs/wiki/Dust-Tutorial">this tutorial written by LinkedIn</a>.

Work on your templates in the /templates folder. Do not work on your templates in the /js/templates folder. To increase the speed of the app all templates must be compiled from html to javascript. The /templates folder contains the precompiled html files, and the /js/templates folder contains the compiled javascript templates used by backbone.js to display markup.

While working on this project you will need to compile your dust templates anytime you make a change. For this reason we've written a watch script which will monitor /templates for new files and file changes and compile those templates to /js/templates. The watch script is written in node.js. If you do not have node.js you will need to install it on your machine. Otherwise simply navigate to the /build folder and run the following command:

	node dust-watcher.js

### Styles with SASS ###
The css styles for LMT take advantage of <a href="http://sass-lang.com/">Syntactically Awesome StyleSheets</a> (SASS). More specifically they are written using the .scss file format. This format allows for a number of easy optimizations. Even if you don't know SASS you'll easily be able to pick it up as it looks very similar to regular css.

While working on app styles you'll need to run another watch script for SASS. SASS and the watch script are written in Ruby and included with Rails. That means if you're running a Mac you already have SASS installed. Windows users can get it via the <a href="http://rubyinstaller.org/downloads/">RubyInstaller for Windows</a>.

To watch the /sass folder for new files, changes, or deletions run the following command from the root of the project:

	sass --watch sass/styles.scss:css/styles.min.css --style compressed

### Using backbone.js with require.js ###
NEED: Write description of backbone setup
=======
att-lmt
=======

App for AT&amp;T
>>>>>>> 7321c5e8bc314aebe5ee37d2a3ed7786300632b6
