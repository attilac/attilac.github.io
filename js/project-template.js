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
		 	<div class="project-list-item col-sm-6 col-lg-4 mb-4" data-id="${projectItem.id}" data-title="${projectItem.title}"> 
		 		<a class="project-detail-link" href="#showcase" aria-expanded="false" aria-controls="showcase" title="${projectItem.title}">
			 		<div class="card card-box-shadow">
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
		//console.log(projectData);
		return `
			<div class="project-detail row fade" data-id="${projectData.id}">
				<div class="col-sm-10 push-sm-1 col-lg-8 push-lg-2 mb-5">
			 		<div class="card">
							${listImage(projectData)}
							${projectItemHeader(projectData)}			 	  	
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
	var projectItemHeader = ({title, year, label}) => {
		return `
		<div class="card-block py-5">	
	  		<h3 class="project-title card-title mb-0">${title}</h3>
		  		<p class="card-text">
		  		<small>
		  			<span class="project-year">${year}</span>
		  			<span class="label">${label}</span>
		  		</small>	
		  		</p>	
		</div>  	
		<div class="tracks-container"></div>	
		`;      
	};	

	/**
	 * Parent template for project tracks
	 * @param {Object} trackData - object of track data
	 * @return 
	 */
	var trackList = (trackData) => {
		//console.log(trackData);
		return `
			<ul class="track-list list-group">
				 ${trackData.map((track, index) => trackListItem({
				  track, index
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
	var trackListItem = ({ track, index }) => {
		let duration = track.duration > 0 || '' ? utils.secondsToMinutes(track.duration): '';
  		return `
		 	<li class="track-list-item list-group-item d-flex justify-content-start"> 	
		 		<div class="track-num">${index+1}</div> 	
	 			<div class="track-title">${track.name}</div>	
	 			<div class="duration ml-auto">${duration}</div>		
			</li>
		`;
	};	

	/**
	 * Parent template for project buy-links. 
	 * {Object} project - object with project data
	 * @return 
	 */
	var purchaseModalContent = (project) => {
		//console.log(project);
		return `
	      <div class="modal-content">
	        <div class="modal-header">
	          <h5 class="modal-title project-title h5">
				 ${project.title} 
				<small class="year">${project.label} ${project.year}</small>
	          </h5>
	          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	            <span aria-hidden="true">&times;</span>
	          </button>
	        </div>
	        <div class="modal-body">
				<div class="purchase-container">
					<div class="row">
						<div class="col-8 push-2 pb-3">
						${listImage(project)}
						</div>	
					</div>	
				 	${purchaseList(project.purchase)}
				</div>        
	        </div>
	      </div>		
		`;
	};			

	/**
	 * Template for list of project buy-links
	 * {Object} purchase - array of objects with buy-links
	 * @return 
	 */
	var purchaseList = (purchase) => {
		return `
			<ul class="purchase-list list-group">
				 ${purchase.map((item) => purchaseItem({
				  item
				})).join('')}  			
			</ul>
		`;
	};

	/**
	 * Template for list-items of project buy-links
	 * @param {Object} item - object with buy-link
	 * @return 
	 */
	var purchaseItem = ({item}) => {
  		return `
		 	<a class="purchase-list-item list-group-item" href="${item.url}" target="_blank">
		 		<i class="fa fa-cloud-download mr-3"></i> 
		 		${item.name}
		 	</a>
		`;
	};	

	/**
	 * Parent template for project buy-links. 
	 * {Object} project - object with project data
	 * @return 
	 */
	var purchaseLinks = (project) => {
		//console.log(project);
		return `
			<div id="purchaseLinks" class="purchase-container">
			 	${purchaseList(project.purchase)}
			</div>        	
		`;
	};		

	// Reveal public pointers to
    // private functions and properties
    return {
        list: list,
        projectItem: projectItem,
        trackList: trackList,
        purchaseList: purchaseList,
        purchaseModalContent: purchaseModalContent,
        purchaseLinks: purchaseLinks	
    };	
})();	