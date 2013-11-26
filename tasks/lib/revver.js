'use strict';

exports.init = function ( grunt, options ) {

	var crypto = require( 'crypto' );
	var _ = require( 'lodash' );

	exports.generateHashedMappings = function ( files, filepath ) {
		var content = grunt.file.read( filepath );
		var hash = exports.encode( content );
		var extensionlessPath = filepath.replace( /.js$/, '' );
		var aliasedPaths = exports.setAliases( extensionlessPath, options.paths );

		files.push( {
			filepath: aliasedPaths,
			hash: hash,
			hashedFilepath: extensionlessPath + '.' + hash
		} );

	};

	exports.createMappingsContent = function ( files ) {
		var content = '';
		var length = files.length;
		files.forEach( function ( f, index ) {
			var processedFileUrl = exports.processUrl( f.filepath, options );
			var processedHashUrl = exports.processUrl( f.hashedFilepath, options, options.rootDir );
			content += '\n\t\t"' + processedFileUrl + '": "' + processedHashUrl + '"';
			if ( index < length - 1 ) {
				content += ',';
			}
		} );

		return content;
	};

	exports.writeToFile = function ( content, dest, template ) {
		var combinedContent = template.intro + content + template.outro;
		grunt.file.write( dest, combinedContent );
		grunt.log.writeln( 'File "' + dest + '" created' );
	};

	exports.encode = function ( content ) {
		return crypto.createHash( 'md5' ).update( content ).digest( 'hex' );
	};

	exports.processUrl = function ( url, options, rootDir ) {
		var appDir = options.appDir;
		var baseUrl = options.baseUrl;
		var paths = options.paths;
		rootDir = rootDir || '';

		if ( rootDir.length ) {
			var index = url.indexOf( rootDir ) + rootDir.length + 1;
			url = url.substring( index, url.length );
			return '/' + url;
		}

		url = exports.removePortion( url, appDir );
		return exports.removePortion( url, baseUrl );
	};

	exports.removePortion = function ( string, portion ) {
		var newString = string.replace( portion, '' );
		if ( newString.charAt( 0 ) === '/' ) {
			newString = newString.substring( 1 );
		}

		return newString;
	};

	exports.setAliases = function ( extensionlessPath, paths ) {
		_.forOwn( paths, function ( path, key ) {
			if ( new RegExp( path + '$' ).test( extensionlessPath ) ) {
				extensionlessPath = key;
				return false;
			}
		} );
		return extensionlessPath;
	};

	return exports;

};