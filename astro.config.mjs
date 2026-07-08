// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	redirects: {
		'/': '/handbook/why/',
	},
	integrations: [
		// Must come before starlight so mermaid code fences are transformed first.
		mermaid(),
		starlight({
			title: 'Planet Fitness',
			description:
				'The single source of truth for how Planet Fitness engineering works: how we are organized, what we build with, how we ship, and what to do when things break.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/planetfitness/handbook' },
			],
			editLink: {
				baseUrl: 'https://github.com/planetfitness/handbook/edit/main/',
			},
			lastUpdated: false,
			customCss: [
				'@fontsource/barlow/400.css',
				'@fontsource/barlow/600.css',
				'@fontsource/barlow/700.css',
				'@fontsource/barlow/800.css',
				'@fontsource/barlow/900.css',
				'./src/styles/custom.css',
			],
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				PageTitle: './src/components/PageTitle.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
			},
			sidebar: [
				{
					label: 'Why This Handbook Exists',
					items: [{ label: 'Why it exists', slug: 'handbook/why' }],
				},
				{
					label: "How We're Organized",
					items: [
						{ label: 'Team structure', slug: 'organization/teams' },
						{ label: 'Who owns what', slug: 'organization/ownership' },
					],
				},
				{
					label: 'How We Work',
					items: [
						{ label: 'Communication', slug: 'working/communication' },
						{ label: 'Planning', slug: 'working/planning' },
						{ label: 'Meetings', slug: 'working/meetings' },
					],
				},
				{
					label: 'What Is Our Tech Stack',
					items: [
						{ label: 'Frontend', slug: 'stack/frontend' },
						{ label: 'Backend', slug: 'stack/backend' },
						{ label: 'Data', slug: 'stack/data' },
						{ label: 'Infra', slug: 'stack/infra' },
						{ label: 'Observability', slug: 'stack/observability' },
						{ label: 'Marketing & experimentation', slug: 'stack/experiments' },
					],
				},
				{
					label: 'How We Ship',
					items: [
						{ label: 'Shipping code', slug: 'shipping/code' },
						{ label: 'Code review', slug: 'shipping/review' },
						{ label: 'Testing', slug: 'shipping/testing' },
						{ label: 'Delivery pipeline', slug: 'shipping/pipeline' },
					],
				},
				{
					label: 'How We Run Production',
					items: [
						{ label: 'Incidents', slug: 'production/incidents' },
						{ label: 'On-call', slug: 'production/oncall' },
					],
				},
				{
					label: 'Runbooks & How-Tos',
					items: [
						{ label: 'Roll back a deploy', slug: 'runbooks/rollback' },
						{ label: 'Rotate a secret', slug: 'runbooks/secrets' },
						{ label: 'Add a feature flag', slug: 'runbooks/feature-flags' },
					],
				},
				{
					label: 'Onboarding',
					items: [
						{ label: 'Your first week', slug: 'onboarding/first-week' },
						{ label: 'Dev environment', slug: 'onboarding/dev-environment' },
					],
				},
				{
					label: 'Engineering Culture & Values',
					items: [
						{ label: 'Guiding tenets', slug: 'culture/tenets' },
						{ label: 'Values', slug: 'culture/values' },
					],
				},
			],
		}),
	],
});
