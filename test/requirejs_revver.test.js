'use strict';

var testOptions = {
  file : {
    dest: 'test/tmp/test.js',
  },
  template: {
    intro: '{',
    outro: '}'
  },
  options: {
    rootDir: 'scripts',
    appDir: 'scripts/dist/',
    baseUrl: 'lib',
    paths: {
      jquery : 'scripts/dist/lib/jquery-1.9.1.min'
    }
  }
};
var grunt = require('grunt');
var crytpo = require('crypto');
var should = require('should');
var revver = require('../tasks/lib/revver.js').init( grunt, testOptions );

describe('Encoding', function(){

  it('should encode the contents of the file correctly', function(){
    var content = grunt.file.read('test/expected/encoding/result-encoding-content.txt');
    var testContent = grunt.file.read('test/fixtures/encoding/test-encoding-content.js');
    
    var encoding = revver.encode(testContent);

    encoding.should.equal(content);
  });

});

describe( 'Mappings', function(){

  it('should generate the correct mappings for a bunch of files', function(){
   
    var files = [];
    var url = 'test/fixtures/encoding/test-encoding-content';
    var hash = grunt.file.read('test/expected/encoding/result-encoding-content.txt');
    var testFiles = [{
      filepath: url,
      hash: hash,
      hashedFilepath: url + '.' + hash
    }];

    revver.generateHashedMappings( files, url + '.js' );

    files.should.eql(testFiles);

  });

});

describe('File', function(){

  beforeEach(function(){
    revver.writeToFile('test: test', testOptions.file.dest, testOptions.template);
  });

  afterEach(function() {
    grunt.file.delete(testOptions.file.dest);
  });

  it('should output a file', function(){

    (grunt.file.exists(testOptions.file.dest)).should.equal(true);

  });

  it('should output the correct content to a file', function(){

    var testContent = grunt.file.read('test/expected/file/result-file-create.txt');
    (grunt.file.read(testOptions.file.dest)).should.equal(testContent);

  });

});

describe('Urls', function(){

  it('should remove portions from the url', function(){

    var processedUrl = '';
    var url = 'scripts/dist/lib/jquery-1.9.1.min';
    var portion = 'scripts/dist/lib';
    var testResult = 'jquery-1.9.1.min';

    processedUrl = revver.removePortion( url, portion );

    processedUrl.should.equal( testResult );

  });

  it('should not remove any portion of a url if the portion does not match', function(){

    var processedUrl = '';
    var url = 'app/ui/test/test';
    var portion = 'scripts/dist/lib';
    var testResult = 'app/ui/test/test';

    processedUrl = revver.removePortion( url, portion );

    processedUrl.should.equal( testResult );

  });

  it('should return the correct url after being processed', function(){

      var url = 'scripts/dist/lib/test';

      var processedurl = revver.processUrl( url, testOptions.options );

      processedurl.should.equal('test');
  });

  it('should set the alias correctly for a JS file', function(){

    var processedUrl = '';
    var extensionlessPath = 'scripts/dist/lib/jquery-1.9.1.min';

    processedUrl = revver.setAliases( extensionlessPath, testOptions.options.paths);

    processedUrl.should.equal('jquery');

  });

  it('should set the alias correctly for a JS file in the baseUrl even if it does not have an alias set in paths', function(){

    var processedUrl = '';
    var extensionlessPath = 'scripts/dist/lib/windowsize';

    processedUrl = revver.setAliases( extensionlessPath, testOptions.options.paths);

    processedUrl.should.equal('windowsize');

  });

  it('should return the full url for a file which does not have a key', function(){

    var processedUrl = '';
    var extensionlessPath = 'scripts/dist/lib/jquery.colorbox.min';

    processedUrl = revver.setAliases( extensionlessPath, testOptions.options.paths);

    processedUrl.should.equal( extensionlessPath );

  });


});