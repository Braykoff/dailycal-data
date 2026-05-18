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
| aboutStory | String | Text that appears at the bottom of the story, in the "About Story" container | |
| description | String | A short description that can be used for SEO description properties | |
| template | Astro File | The template .astro file to render your article into. If blank, the [default](./src/layouts/templates/default.astro) will be used. | |

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Contact
The Data Department can be contacted at [projects@dailycal.org](mailto:projects@dailycal.org)
