/*jshint esversion: 6 */

/**
 * Functions for calling APIs thru ajaxFetch module
 * 
 */
var projectApi = (function() {

	var _currentAlbum;   

	/**
	 * 
	 */ 
	var init = function(){		
	};

	/**
	 * 
	 */ 
	var getCurrentProject = function(){	
		return _currentAlbum;	
	};	

	/**
	 * 
	 */ 
	var setCurrentProject = function(albumiId){
		_currentAlbum = albumiId;		
	};	

	/**
	 * Get list of albums from API
	 */ 
	var getProjectList = function() {
		ajaxFetch.getDataFromApi('http://attilac.se/js/json/projects.json', '', projectView.handleProjectListLoaded);
		//ajaxFetch.getDataFromApi('http://localhost:9000/js/json/projects.json', '', projectView.handleProjectListLoaded);		
	};	

	/**
	 * Get album from API 
	 */ 
	var getProjectItem = function(projectId) {
		ajaxFetch.getDataFromApi('http://attilac.se/js/json/projects.json', '', projectView.handleProjectItemLoaded);
		//ajaxFetch.getDataFromApi('http://localhost:9000/js/json/projects.json', '', projectView.handleProjectItemLoaded);		
	};			

	// Reveal public pointers to
    // private functions and properties
    return {
        init: init(),  
        getProjectList: getProjectList,
        getProjectItem: getProjectItem,
        getCurrentProject: getCurrentProject,
        setCurrentProject: setCurrentProject  
    };

})();  