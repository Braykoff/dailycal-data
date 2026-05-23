# Daily Californian Data

Investigative stories, data analysis and graphics by The Daily Californian's Data Team.

## Project Structure

The following directory structure is used for this project:

TODO

## Creating an Article

TODO

Article .mdx files expect the following frontmatter:

| Key | Type | Description | Required |
| :-- | :-- | :-- | :-- |
| date | Date | The publish date of the article | ✔ |
| title | String | The title of the article | ✔ |
| byline | String[] | An array of the names of authors on the byline | ✔ |
| featuredImage | Image | The featured (hero) image for the article | ✔ |
| imageAttribution | String | An attribution (contribution line) for the featured image | ✔ |
| description | String | A short description that can be used for SEO description properties | |
| template | Astro File | The template .astro file to render your article into. If blank, the [default](./src/layouts/templates/DefaultTemplate.astro) will be used. | |

The following frontmatter is also allowed for the default template, but optional:

| Key | Type | Description |
| :-- | :-- | :-- |
| subhead | String | A short subheading that can appear under the title |
| hideHeroImage | Boolean | If true, the featured image will not appear in the article |
| imageCaption | String | Text that can appear as a caption for the featured image  |
| aboutStory | String | Text that can appear at the bottom of the story, in the "About Story" container |
| jointDept | String | If present, the article footer will contain information designating the article as a joint-department article |

## Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :-- | :-- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run lint` | Runs ESLint and Prettier to check formatting and style |
| `npm run lint:fix` | Fixes ESLint and Prettier styling errors |

## Contact
The Data Department can be contacted at [projects@dailycal.org](mailto:projects@dailycal.org)
