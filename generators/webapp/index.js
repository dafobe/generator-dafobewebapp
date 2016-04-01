'use strict';
var yeoman = require('yeoman-generator');
var inquirer = require('inquirer');

module.exports = yeoman.generators.Base.extend({
  //Retrieving customizable parameters
  prompting: function () {
    var done = this.async();
    var vanillaJS = 'vanilla',
        reactJS = 'react',
        angular = 'angular';

    // Have Yeoman greet the user.
    this.log('Welcome to the dafobe\'s webapp generator!');

    var prompts = [
                   {
                     type: 'input',
                     name: 'name',
                     message: 'Enter the project\'s name',
                     default: this.appname
                   },
                   {
                     type: 'list',
                     name: 'coreType',
                     message: 'Please select type of JS project',
                     choices: ['Vanilla', 'React', 'Angular'],
                     filter: function(val){
                       return val.toLowerCase();
                   }
                   },
                   {
                     type: 'checkbox',
                     message: 'Select other configurations',
                     name: 'toppings',
                     choices: [
                       new inquirer.Separator(' = ---- App Architecture ---- = '),
                       {name: 'MVC (Model View Controller)', value: 'mvc', checked: true},
                       {name: 'Flux', value: 'flux'},
                       new inquirer.Separator(' = ---- App life cycle ---- = '),
                       {name: 'Redux', value: 'redux'},
                       new inquirer.Separator(' = ---- ES6 ---- = '),
                       {name: 'Babel', checked: true},
                       new inquirer.Separator(' = ---- Linting ---- = '),
                       {name: 'ESLint'},
                       new inquirer.Separator(' = ---- Build Tools ='),
                       {name: 'Webpack'},
                       {name: 'RequireJS'},
                       {name: 'Browserify'},
                       new inquirer.Separator(' = ---- Task Tools ='),
                       {name: 'Gulp'},
                       {name: 'Grunt'},
                       new inquirer.Separator(' = ---- Testing ---- = '),
                       {name: 'Jasmine'},
                       {name: 'Mocha'},
                       new inquirer.Separator(' = ---- Utility library ---- = '),
                       {name: 'Lodash'},
                       {name: 'Ramda'},
                       new inquirer.Separator(' = ---- Styles ---- = '),
                       {name: 'Less'},
                       {name: 'Sass'},
                       {name: 'PostCSS'},
                       {name: 'Autoprefixer'},
                       {name: 'Google Material'},
                       {name: 'Bootstrap'},
                       new inquirer.Separator(' = ---- WebServer ---- = '),
                       {name: 'Express'},
                       new inquirer.Separator(' = ---- Database ---- = '),
                       {name: 'Mongodb'},
                     ],
                     filter: function(val){
                       return val.toLowerCase();
                     }    
                   }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.log('Application\'s Name: ' + props.name);
      props.addDemo && this.log('Added Demo Files');
      done();
    }.bind(this));
  },
  writing: {
    //### -------------------------- ###
    //#  Copy the configuration files  #
    //### -------------------------- ###
    config: function() {
      console.log('--- Destination Folder ---', this.destinationRoot());
      this.destinationRoot(this.props.name.replace(' ',''));
      console.log('--- new Destination Folder ---', this.destinationRoot());
      
      console.log('--- Answers ---', this.answers);
      this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'), {
            name: this.props.name
          }
      );
      this.fs.copyTpl(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json'), {
            name: this.props.name
          }
      );
      this.fs.copy(
          this.templatePath('bowerrc'),
          this.destinationPath('.bowerrc')
      );
    },
    //### --------------------- ###
    //#  Copy application files  #
    //### -------------------- ###
    app: function() {
      //Styles
      this.fs.copyTpl(
          this.templatePath('css/styles.css'),
          this.destinationPath('css/styles.css'), {
            name: this.props.name
          }
      );
      //Application Business logic
      this.fs.copyTpl(
          this.templatePath('js'),
          this.destinationPath('js'), {
            name: this.props.name
          }
      );
    }
  },
  //### ------------------ ###
  //#  Install Dependencies  #
  //### ------------------ ###
  install: function () {
    this.installDependencies();
  }
});
