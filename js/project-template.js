/*jshint esversion: 6 */

/**
 * ------------------------------------------------------------------------
 *  	Revealing Module Pattern
 *      functions and variables that begins with _ are private    
 * ------------------------------------------------------------------------
*/

/**
 * Templates for projects
 * 
 */
var projectTemplate = (function() {

	/**
	 * Parent template for project listing. Takes an object and passes properties with arrow functions.
	 * @param {Object} json - a JSON object with projects
	 * @return 
	 */   
	var list = (json) => {
		//console.log(json);
		return `
			<div class="project-list row">
			 ${json.map(projectItem => listItem({
			  projectItem,
			  thumb: listImage(projectItem),
			  shortDescription: listHeader(projectItem)
			})).join('')}  
			</div>
		`;
	};	

	/**
	 * Template
	 * @param {Object} projectItem - object with project
	 * @param {String} thumb - HTML with project thumb 
	 * @param {String} shortDescription - HTML with project shortDescription 
	 * @return 
	 */
	var listItem = ({ projectItem, thumb, shortDescription}) => {
  		return `
		 	<div class="project-list-item col-sm-6 col-lg-4 mb-4 d-flex" data-id="${projectItem.id}" data-title="${projectItem.title}"> 
		 		<a class="project-detail-link d-flex w-100" href="#showcase" aria-expanded="false" aria-controls="showcase" title="${projectItem.title}">
			 		<div class="card card-box-shadow w-100">
							${thumb}
							${shortDescription}			 	  	
			 	  	</div>
				</a>		 	  	
			</div>
		`;
	};

	/**
	 * Template
	 * @param {String} thumb - property from project object
	 * @return 
	 */
	var listImage = ({thumb}) => {
		thumbnail = thumb !== '' ? '<img class="img-fluid card-img-top " alt="" src="images/' + thumb + '"/>' : ''; 
		return `
		<div class="px-2 pt-2">
			<div class="project-image embed-responsive embed-responsive-16by9">
				<div class="project-image-inner text-center embed-responsive-item bg-faded">
	 	  			${thumbnail}	
	  			</div>
	 	  	</div>	
	 	</div>  	
		`;      
	};	

	/**
	 * Template
	 * @param {String} title - property from project object
	 * @param {String} year - property from project object
	 * @return 
	 */
	var listHeader = ({title, date, shortDescription}) => {
		return `
		<div class="card-block">	
	  		<h3 class="project-title card-title heading-sm mb-0">${title}</h3>
		  		<p class="card-text text-muted mb-0">
		  			${shortDescription}
		  		</p>
		</div>  		
		`;      
	};	

	/**
	 * Parent template for project detail view
	 * @param {Object} projectData - object with project data
	 * @return 
	 */   
	var projectItem = (projectData) => {
		console.log(projectData);
		return `
	        <div class="showcase bg-white py-4 mb-5" id="showCaseContainer" data-id="${projectData.id}">
	          <button type="button" class="close" aria-label="Close">
	          <span aria-hidden="true">x</span>
	          </button>
	          <div class="container fade">
	            <div class="row">
	          		<div class="col-md-7 mb-md-0 mb-3">
						${projectImage(projectData.images)}		 	  	
		 	  		</div>	
		 	  		 <div class="col-md-5">
						${projectItemHeader(projectData)}	
						${techList(projectData.tech)}
						${projectLinks(projectData)}  							 
		 	  		 </div>			
				</div>
			</div>
		`;
	};	

	/**
	 * 
	 * @param 
	 * @return 
	 */ 
	var projectImage = (images) => {
		//console.log(images);
		image = images !== '' ? `<img class="img-fluid" alt="" src="images/${images}"/>` : '';
		return `
	        <div class="project-image embed-responsive embed-responsive-4by3 image-box-shadow">
          		<div class="project-image-inner text-center embed-responsive-item bg-faded">
	             	${image}
            	</div>
	        </div>    
        `;
	};

	/**
	 * Template for project detail header
	 * @param {String} title - property from project object
	 * @param {String} year - property from project object
	 * @param {String} label - property from project object
	 * @return 
	 */
	var projectItemHeader = ({title, description}) => {
		return `
        	<h3 class="showcase-title text-primary font-weight-thin line-height-md mb-4">${title}</h3>
        	<div class="showcase-description"><p>${description}</p></div>	 
		`;      
	};	

	/**
	 * Parent template for project 
	 * @param {Object}
	 * @return 
	 */
	var techList = (tech) => {
		console.log(tech);
		return `
			<h5 class="tech text-primary font-weight-thin line-height-md mb-2">Använda teknologier</h5>
			 <ul class="tech-list">
				 ${tech.map((tech) => techListItem({
				  tech
				})).join('')}  			
			</ul>
		`;
	};

	/**
	 * Template with track items
	 * @param {String} track - property from project object
	 * @param {Number} index - track index
	 * @return 
	 */
	var techListItem = ({tech}) => {
  		return `
          <li class="tech-list-item">${tech}</li>
		`;
	};	

	/**
	 * Template 
	 * @param {} 
	 * @param {}
	 * @return 
	 */
	var projectLinks = ({liveUrl, repoUrl}) => {
		liveLink = liveUrl !== '' ? `<a class="btn btn-primary btn-flat-shadow text-uppercase btn-lg mr-2" href="${liveUrl}" data-id="1" data-target="" >Besök Sidan</a>` : '';
		repoLink = repoUrl !== '' ? `<a class="btn btn-outline-secondary btn-circle icon-link" href="${repoUrl}"><i class="fa fa-github"></i></a>`: '';
		return `
            <div class="control">
            	${liveLink}
            	${repoLink}
            </div>	
		`;
	};			

	// Reveal public pointers to
    // private functions and properties
    return {
        list: list,
        projectItem: projectItem,
        techList: techList,
    };	
})();	