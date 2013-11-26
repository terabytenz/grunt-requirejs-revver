define( ['jquery', 'app/ui/tradegallery/imageselection', 'app/ui/tradegallery/imagelibrary', 'app/ui/infinitescroll/infinitescroll', 'app/ui/page/listing'], function ( $, ImageLibrarySelection, ImageLibrary, InfiniteScroll) {

	'use strict';
	
	InfiniteScroll.init();
	ImageLibrary.init();
	ImageLibrarySelection.init();

} );