import type { APIRoute } from "astro";
import experiences from "../collections/experiences.json";
import menus from "../collections/menu.json";
import projects from "../collections/projects.json";

export const prerender = true;

const talks = [
	{
		title: "Angular Whitelabel Architecture",
		description:
			"How to architect a white-label Angular platform with dynamic config, enabling faster multi-client deployment with cleaner, maintainable UI across clients.",
		url: "https://drive.google.com/file/d/10ToGYiPF_3CFKKgmCNfG5Q0YZoq4bSGW/view",
	},
	{
		title: "Web Accessibility",
		description:
			"Designing web content that is accessible to everyone, including people with disabilities.",
		url: "https://speakerdeck.com/afifalfiano/web-accessibility",
	},
	{
		title: "Tutorial Menggunakan Cypress di Angular",
		description:
			"A hands-on guide to setting up and using Cypress for E2E testing in Angular.",
		url: "https://github.com/afifalfiano/research-cypress",
	},
	{
		title: "Testing on Frontend",
		description:
			"A general overview of frontend testing — unit, integration, and E2E.",
		url: "https://speakerdeck.com/afifalfiano/testing-on-frontend",
	},
	{
		title: "Angular CLI with Bazel",
		description:
			"How Bazel can speed up your build process in both development and production using its first-cache strategy.",
		url: "https://speakerdeck.com/afifalfiano/angular-cli-with-bazel",
	},
	{
		title: "BSI CoffeeTalk #7 Curiosity, menantang diri sendiri",
		description:
			"A casual talk with Mas Sigit about our journey into becoming developers.",
		url: "/talks",
	},
];

const pageDescriptions: Record<string, string> = {
	"/": "Home page — overview of my work, featured projects and latest posts.",
	"/posts": "All blog posts — articles on frontend engineering, Angular, React, and more.",
	"/projects": "Projects — open-source and professional projects I've built.",
	"/talks": "Talks — conference and community presentations I've given.",
	"/about-me": "About me — my background, work experience, and CV.",
};

export const GET: APIRoute = async () => {
	const index = [
		...menus.map((m) => ({
			id: `page-${m.url}`,
			type: "page",
			title: m.name,
			description: pageDescriptions[m.url] ?? "",
			url: m.url,
			tags: [] as string[],
			meta: "",
		})),
		...projects.map((p) => ({
			id: `project-${p.name}`,
			type: "project",
			title: p.name,
			description: p.description,
			url: p.url,
			tags: p.tags,
			meta: p.tags.join(" "),
		})),
		...talks.map((t) => ({
			id: `talk-${t.title}`,
			type: "talk",
			title: t.title,
			description: t.description,
			url: t.url,
			tags: [] as string[],
			meta: "",
		})),
		...experiences.map((e) => ({
			id: `exp-${e.company}`,
			type: "experience",
			title: `${e.role} at ${e.company}`,
			description: Array.isArray(e.description)
				? e.description.join(" ")
				: e.description,
			url: e.company_link,
			tags: [] as string[],
			meta: `${e.company} ${e.techstacks?.join(" ") ?? ""}`,
		})),
	];

	return new Response(JSON.stringify(index), {
		headers: { "Content-Type": "application/json" },
	});
};
