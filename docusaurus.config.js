// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docs.io/docs/api/docs-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docs/types').Config} */
const config = {
    title: "ACME Sky",
    tagline: "A project for SOA-ENG course at Unibo.it",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://acme-sky.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "acme-sky", // Usually your GitHub org/user name.
    projectName: "acme-sky.github.io", // Usually your repo name.
    trailingSlash: false,
    deploymentBranch: "gh-pages",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docs/preset-classic').Options} */
            ({
                docs: {
                    // sidebarPath: "./sidebars.js",
                    // // Please change this to your repo.
                    // // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     "https://github.com/acme-sky/docs/tree/main/packages/create-docs/templates/shared/",
                    routeBasePath: "/",
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docs/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/docs-social-card.jpg",
            navbar: {
                title: "ACME Sky",
                logo: {
                    alt: "My Site Logo",
                    src: "img/logo.png",
                },
                items: [
                    {
                        href: "https://github.com/acme-sky/docs",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [],
                copyright: `Built with Docusaurus`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
