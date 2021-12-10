import { Octokit } from "@octokit/rest";

export default async (recipe) => {

	const octokit = new Octokit({
		auth: import.meta.env.GITHUB_TOKEN,
	});

  	const {data} = await octokit.repos.getContent(options)
  
  	let content = Buffer.from( data.content, 'base64' ).toString('utf8');
  	let recipes = JSON.parse(content);
  
	if (  recipes.some(el => el.url === recipe.url ) ) {
		return true;
	}

	recipes = [...recipes, recipe ];
	var fileContent = Buffer.from( JSON.stringify(recipes), 'utf8' ).toString('base64') 
	await octokit.repos.createOrUpdateFileContents({ 
		owner: 'cocinanding',
		repo: 'cocinanding',
		path: 'recipes.json',
		message: '+',
		content: fileContent,
		sha: data.sha 
	})

}
