// Decides whether this build may be indexed by Google.
// Cloudflare Pages sets CF_PAGES=1 and CF_PAGES_BRANCH during its builds.
// Only the production branch is indexable; every preview build is noindex.
const PRODUCTION_BRANCH = process.env.PRODUCTION_BRANCH || "main";

export const isIndexable =
  process.env.CF_PAGES === "1"
    ? process.env.CF_PAGES_BRANCH === PRODUCTION_BRANCH
    : process.env.NODE_ENV === "production";