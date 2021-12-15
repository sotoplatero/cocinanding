import { SITES, Q } from '$lib/config'
import '$lib/random'

export async function get({ query }) {
	const q = query.get('q') || Q.random()

    const site = SITES['*'].random()

    const res = await fetch(`/recipes/${site}.json?q=${q}`);

    if (!res.ok) {
        return {
            error: new Error(`Could not load`)
        };
    }

    return {
        body: { 
            sites: SITES,
            recipes: await res.json(),
        }
    };


}