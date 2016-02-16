'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  //Retrieving customizable parameters
  prompting: function () {
    var done = this.async();

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
                       type: 'confirm',
                       name: 'addDemo',
                       message: 'Would you like to generate a demo files?',
                       default: true
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
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      console.log('--- Destination Folder ---', this.destinationRoot());
      this.destinationRoot(this.props.name.replace(' ',''));
      console.log('--- new Destination Folder ---', this.destinationRoot());
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
    //Copy application files
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
  install: function () {
    this.installDependencies();
  }
});
