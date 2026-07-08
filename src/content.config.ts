import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Page owner, e.g. "Dan Lourenço". Every page has one. */
				owner: z.string().optional(),
				/** Owner initials shown in the avatar chip, e.g. "MT". */
				initials: z.string().optional(),
				/** Avatar chip background color. */
				avatarColor: z.string().default('#470A68'),
				/** Human-readable last-updated date, e.g. "Jun 30, 2026". */
				updated: z.string().optional(),
				/** Estimated read time, e.g. "3 min read". */
				readTime: z.string().optional(),
				/** Outlined-but-not-yet-written pages show a stub banner. */
				stub: z.boolean().default(false),
				/** "At a glance" key/value facts rendered after the body. */
				facts: z
					.array(z.object({ label: z.string(), value: z.string() }))
					.optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
