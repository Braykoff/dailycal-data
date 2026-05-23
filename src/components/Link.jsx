/* 
This allows links to other pages to be properly generated, even when the base configuration in
astro.config.mjs is not set to '/'.
*/

const EXTERNAL_OR_SPECIAL_REGEX =
  /^(?:[a-z][a-z\d+\-.]*:)?\/\/|^(#|mailto:|tel:)/i;

/**
 * Joins the provided path with the base path configured in astro.config.mjs.
 * 
 * Eg, if the path is configured to /test, and you pass in /xyz/123, the output will be /test/xyz/123.
 * @param {*} path The path to format.
 * @returns The formatted path
 */
export function joinWithBase(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  path = path.replace(/^\//, "");

  return `${base}/${path}`;
}

/**
 * Checks if a URL needs to be formatted with the base path configured in astro.config.mjs, and doing
 * so if it is. URLs which specify a protocol (http://, https://, //, etc), are special (mailto:, 
 * tel:, #) will remain the same.
 * @param {*} url The URL to format
 * @returns The formatted URL.
 */
export function formatURL(url) {
  // Ignore special links
  if (EXTERNAL_OR_SPECIAL_REGEX.test(url)) {
    return url;
  }

  // Remove leading /, add base
  return joinWithBase(url);
}

/**
 * A wrapper of the HTML <a> tag that formats paths to have the base specified in astro.config.mjs.
 * Relative paths will have that base appended to the beginning.
 * 
 * Specify the destination with href as you would in HTML, but other properties (such as className)
 * will have to use the React naming.
 * @param {*} props 
 * @returns 
 */
export function Link({ href, style, children, ...rest }) {
  const formattedHref = (typeof href === "string" && href.trim().length > 0) ? formatURL(href) : undefined;

  return (
    <a 
      href={formattedHref}
      style={style ?? { color: "var(--palette-dark-blue)" }}
      {...rest}
    >
      {children}
    </a>
  )
}