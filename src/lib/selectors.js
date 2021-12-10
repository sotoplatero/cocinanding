function getSelectors (site) {
	return {
		allrecipes: {
	        selDescription: '',
	        selInstructions: 'li.instructions-section-item .section-body p'		
		},
		Food52: {
	        selInstructions: 'li.recipe__list-step'		
		},
		Epicurious: { 
			selInstructions: 'li.preparation-step' 
		},
		"Martha Stewart": { 
			selDescription: '.recipe-summary',
			selInstructions: 'li.instructions-section-item .section-body',
		},
		Saveur: {
			selInstructions: 'li.instruction',
		},
		Chowhound: {
			selInstructions: '.fr_instruction_rec li',
		},
		"Food Republic": {
			selInstructions: '.directions li',
		},
		"LA Times": {
			selInstructions: '.recipe-step-body'
		},
		"My Recipes": {
			selInstructions: '.instructions-section-item .paragraph'
		},
		"Self": {
			selInstructions: '.step-description'
		},
		"Serious Eats": {
			selInstructions: '.structured-project__steps OL LI'
		},
		"PBS Food": {
			selInstructions: '.directions li'
		},
		"Delish": {
			selInstructions: '.direction-lists li'
		},
		"Food & Wine": {
			selInstructions: '.instructions-section-item .paragraph'
		},
		"EatingWell": {
			selInstructions: '.instructions-section-item'
		},
		"Men's Health": {
			selInstructions: '.direction-lists li'
		},
		"Good Housekeeping": {
			selInstructions: '.direction-lists li'
		},
		"Cookstr": {
			selInstructions: '.stepByStepInstructionsDiv .articleAttrSection'
		},
		"The Daily Meal": {
			selInstructions: '.recipe-preparation p'
		},
		"Goop": {
			selInstructions: '.recipes__instructions p'
		},
		"ethnicfoodsrus.com": {
			selInstructions: '.pf-content ol li'
		},
		"Food & Style": {
			selInstructions: '.instructions ol li'
		},
		"Smitten Kitchen": {
			selInstructions: '.entry-content > p'
		},
		"adishofdailylife.com": {
			selInstructions: '#mpprecipe-instructions-list li'
		},
		"Food Network": {
			selInstructions: '.o-Method__m-Body li'
		},
		"San Francisco Gate": {
			selInstructions: ''
		},
		"Tasting Table": {
			selInstructions: '.recipe-directions li'
		},
		"Rachael Ray": {
			selInstructions: '.recipe-article__directions p'
		},
		"BBC": {
			selInstructions: '.recipe-method__list li'
		},
		"Real Simple": {
			selInstructions: '.instructions-section li'
		},
		"BBC Good Food": {
			selInstructions: '.grouped-list__list li'
		},
		"Honest Cooking": {
			selInstructions: 'li.instruction'
		},
		"BigOven": {
			selInstructions: '.instructions p'
		},
		"Closet Cooking": {
			selInstructions: '.instructions  li'
		},
		// "blue-kitchen.com": {
		// 	selInstructions: ''
		// },
		// "In Jennie's Kitchen": {
		// 	selInstructions: '.recipe-content p:last-child'
		// },
		"Lottie + Doof": {
			selInstructions: ''
		},
		"In Jennie's Kitchen": {
			selInstructions: '#directions li'
		},
		"spoonsfulloflove.blogspot.com": {
			selInstructions: '#directions li'
		},
		"spanishsabores.com": {
			selInstructions: '.wprm-recipe-instructions li'
		},
		"recipes.sparkpeople.com": {
			selInstructions: '#directions_w'
		},
		"mllenoelle.wordpress.com": {
			selInstructions: ''
		},
		"junedarville.com": {
			selInstructions: '.wprm-recipe-instructions li '
		},
		"food.com": {
			selInstructions: '.recipe-directions__steps li'
		},
		"recipezaar.com": {
			selInstructions: '.recipe-directions__steps li'
		},
		"mind-over-batter.com": {
			selInstructions: '.wprm-recipe-instructions-container .wprm-recipe-instruction-group'
		},
		"Chubby Hubby": {
			selInstructions: ''
		},
		"Chez Us": {
			selInstructions: ''
		},
		"source: What's Gaby Cooking?, url: http://whatsgabycooking.com/carne-asada-fries/": {
			selInstructions: '.wprm-recipe-instruction-group'
		},
		"What's Gaby Cooking?": {
			selInstructions: '.wprm-recipe-instruction-text'
		},
		"No Recipes": {
			selInstructions: '.wprm-recipe-instruction-text'
		},
		"Jamie Oliver": {
			selInstructions: '.recipeSteps li'
		},
		"Rick Bayless": {
			selInstructions: '.recipe-main p'
		},
		"Pioneer Woman": {
			selInstructions: '.direction-lists direction-lists'
		},
		"recipezazz.com": {
			selInstructions: '.wprm-recipe-instruction'
		},
		"justapinch.com": {
			selInstructions: '.direction-text'
		},
		"Simply Recipes": {
			selInstructions: '.structured-project__steps ol li'
		},
		"mylatinatable.com": {
			selInstructions: '.wprm-recipe-instruction-text'
		},
	}[site] || {}
}

export default getSelectors


// Need to pull manually
// - Blue Kitchen
// - mllenoelle.wordpress.com"
// - Chubby Hubby



// Remove from list
// - https://www.lottieanddoof.com/