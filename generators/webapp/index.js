'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log('Welcome to the dafobe\'s webapp generator!');

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the project name',
      default: this.appname
    }];

    this.prompt(prompts, function (props) {
	    this.props = props;
	    // To access props later use this.props.someOption;
	    this.log(props.name)
	    done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
	//Copy the configuration files
    config: function() {
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
		this.fs.copyTpl(
			this.templatePath('css/styles.css'),
			this.destinationPath('css/styles.css'), {
				name: this.props.name
			}
		);
	}
  },

  install: function () {
    this.installDependencies();
  }
});
