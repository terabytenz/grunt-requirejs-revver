/*
 * grunt-requirejs-revver
 * https://github.com/patocallaghan/grunt-requirejs-revver
 *
 * Copyright (c) 2013 Pat O'Callaghan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function ( grunt ) {

	grunt.registerMultiTask( 'revver', 'Task to create a require.config containing all specified RequireJS modules to be mapped to md5 based filepaths.', function () {

		var content;
		var files = [];
		var revver = require( './lib/revver.js' ).init( grunt, this.data.options );

		// Iterate over all specified file groups.
		this.files.forEach( function ( f ) {

			// Generate hashes for files
			var src = f.src.filter( function ( filepath ) {
				
				// Warn on and remove invalid source files (if nonull was set).
				if ( !grunt.file.exists( filepath ) ) {
					grunt.log.warn( 'Source file "' + filepath + '" not found.' );
					return false;
				} else {
					return true;
				}

			} ).map( function ( filepath ) {

				revver.generateHashedMappings( files, filepath );

			} );
		} );

		content = revver.createMappingsContent( files );
		revver.writeToFile( content, this.data.files.dest, this.data.template );

	} );

};
