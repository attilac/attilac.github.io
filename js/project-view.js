/*jshint esversion: 6 */
console.log('---Album View');

/**
 * View for Project
 * Revealing Module Pattern
 * 
 */
var projectView = (function() {
		
	/**
	 * Handler for project on loaded. Appends template and assigns event handlers
	 * {Object} json - object with album data
	 */ 
	var handleProjectListLoaded = function(json){
		console.log(utils.sortObjectsByKey(json.projects, 'date', 'DESC'));
		document.getElementById('portfolioContainer').innerHTML = projectTemplate.list(utils.sortObjectsByKey(json.projects, 'date', 'DESC'));
		
		Array.prototype.slice.call(document.querySelectorAll('.project-detail-link'))
		.forEach(function(link){
			link.addEventListener('click', projectItemOnClick, false);
		});

		document.getElementsByClassName('close')[0].addEventListener('click', projectCloseOnClick, false);
	};

	/**
	 * Click handler for project. Trigger getProjectItem from projectApi
	 * {Event} e - the event
	 */
	var projectItemOnClick = function(e){
		e.preventDefault();
		projectApi.setCurrentProject(this.parentNode.dataset.id);
		//console.log(this.parentNode.dataset.title);
		projectApi.getProjectItem(this.parentNode.dataset.id);
		//console.log(this.parentNode.dataset.id);
	};

	/**
	 * Click handler for project. Trigger getAlbumItem from projectApi
	 * {Event} e - the event
	 */
	var projectCloseOnClick = function(e){
		e.preventDefault();
		$('#showcase').collapse('toggle');			
	};

	/**
	 * Handler for album detail on loaded. Appends template and triggers getAlbumTracks from albumApi
	 * {Object} response - object with album data
	 */ 
	var handleProjectItemLoaded = function(response){	
		//console.log(projectApi.getCurrentProject());
		console.log(response.projects[projectApi.getCurrentProject()]);	
		
		document.getElementById('showcase').innerHTML = '';
		document.getElementById('showcase').innerHTML = projectTemplate.projectItem(response.projects[projectApi.getCurrentProject()]);	

		$('#showcase').collapse('show');
		zenscroll.to(document.querySelector('#showcase'), 500);				
	};	


    // Reveal public pointers to
    // private functions and properties
    return {
		handleProjectListLoaded: handleProjectListLoaded,
		handleProjectItemLoaded: handleProjectItemLoaded
    };	
})();	 