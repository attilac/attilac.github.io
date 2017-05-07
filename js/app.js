/*jshint esversion: 6 */
console.log('---View');

/**
 * The main view. Functions for pages
 * Revealing Module Pattern
 * 
 */
var view = (function() {

	var _currentPage;

	/**
	 * Init function
	 */ 
	var init = function(){
		_addPageLinkHandlers();
		zenscroll.setup(null, 12);
		//delayFadeInContent('#home');
	};

	/**
	 * Set the current page
	 */ 
	var setCurrentPage = function(index){
		_currentPage = Number(index);
	};	

	/**
	 * Get the current page
	 */ 
	var getCurrentPage = function(){
		return _currentPage;
	};		

	/**
	 * Add event handlers to links
	 */ 
	var _addPageLinkHandlers = function(){
		Array.prototype.slice.call(document.querySelectorAll('.section-link'))
		.forEach(function(link){
			link.addEventListener('click', pageLinkOnClick, false);
		});
	};

	/**
	 * Handler for page links on click
	 * {Event} event - the event that was triggered
	 */ 
	var pageLinkOnClick = function(event){
		event.preventDefault();
		setCurrentPage(this.dataset.id);
		//console.log(this.dataset.id);
		//document.querySelector(this.dataset.target).classList.remove('hidden');
		_scrollToSection(this.dataset.target);

	    Array.prototype.slice.call(document.querySelectorAll('.section-link'))
	    .forEach(function(item) {
	    	if(getCurrentPage() === Number(item.dataset.id)){
	    		//item.parentNode.classList.add('active'); 
	    	}else{
	    		//item.parentNode.classList.remove('active'); 
	    		//document.querySelector(item.dataset.target).classList.add('hidden');
	    	}
	    }); 

	    //closeErrorAlert();
	};

	/**
	 * Show error alert box
	 */
	var showErrorAlert = function(error){
		document.querySelector('.ajax-error-container').classList.remove('hidden');
		document.querySelector('.ajax-error-container .container').innerHTML = alertBox(`<strong>Oh snap!</strong> There was an error when fetching the content. Please try again later. <small><em>${error}</em></small>`);
	};	

	/**
	 * Hide error alert box
	 */
	var closeErrorAlert = function(){
		document.querySelector('.ajax-error-container').classList.add('hidden');
		if(document.querySelector('.ajax-error-container .alert-warning') || ''){
			document.querySelector('.ajax-error-container .alert-warning').alert('close');
		}
	};		

	/**
	 * Show spinner icon
	 */
	var showLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.remove('hidden');
	};

	/**
	 * Hide spinner icon
	 */
	var hideLoadingSpinner = function(){
		document.querySelector('.ajax-load-indicator-container').classList.add('hidden');
	};	

	/**
	 * Template for alertbox
	 * {String} message - the alert message
	 * {String} alertClass - classname of the alert
	 */
	var alertBox = (message, alertClass="alert-warning") =>{
		return `
		  <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
		    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		      <span aria-hidden="true">&times;</span>
		    </button>      
		    <div class="alert-message">${message}</div>
		  </div> 
		`;
	};	

	/**
	 * Delays the fadeInContent function
	 * {String} className - className to element to fade
	 */
	var delayFadeInContent = function(className) {
	  	//window.setTimeout(FadeInAlbums, 200);
		window.setTimeout(function() {
		    fadeInContent(className);
		}, 200);	  
	};

	/**
	 * Fade in element by adding show class. 
	 * {String} className - className to element to fade
	 */	
	 var fadeInContent = function(className){
		Array.prototype.slice.call(document.querySelectorAll(className))
		.forEach(function(album){
			album.classList.add('show');
		});	
	};	

	/**
	 * Scroll to section
	 */ 
	var _scrollToSection = function(sectionId) {
		zenscroll.to(document.querySelector(sectionId), 500);
	};	


    // Reveal public pointers to
    // private functions and properties
    return {
		init: init(),
		getCurrentPage: getCurrentPage,
		setCurrentPage: getCurrentPage,
		showErrorAlert: showErrorAlert,
		closeErrorAlert: closeErrorAlert,
		alertBox: alertBox,
		showLoadingSpinner: showLoadingSpinner,
		hideLoadingSpinner: hideLoadingSpinner,
		delayFadeInContent: delayFadeInContent,
		fadeInContent: fadeInContent
    };	
})();

projectApi.getProjectList();
