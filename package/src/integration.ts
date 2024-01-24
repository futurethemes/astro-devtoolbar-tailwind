import { z } from 'astro/zod'
import {
	defineIntegration,
	createResolver,
	watchIntegration
} from 'astro-integration-kit'

export default defineIntegration({
	name: 'astro-devtoolbar-tailwind',
	options: z.object({}).default({}),
	setup() {
		const { resolve } = createResolver(import.meta.url)

		return {
			"astro:config:setup": async ({
				addDevToolbarApp
			}) => {
				await watchIntegration(resolve())

				addDevToolbarApp(resolve('./app.js'))
			}
		}
	}
})
