/*
 * Cloudflare Worker: serves https://cornerlabs.in/sasya/ from GitHub Pages,
 * leaving the rest of cornerlabs.in (Hostinger) untouched.
 *
 * Setup (Cloudflare dashboard):
 *   Workers & Pages -> Create -> Worker -> paste this file -> Deploy
 *   Worker -> Settings -> Domains & Routes -> Add route:
 *       cornerlabs.in/sasya*        zone cornerlabs.in
 *       www.cornerlabs.in/sasya*    (optional)
 *
 * Set GITHUB_USER below to your GitHub username.
 */
const GITHUB_USER = "YOUR_GITHUB_USERNAME";
const REPO = "sasya";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // "/sasya" -> "/sasya/" so relative paths resolve
    if (url.pathname === "/" + REPO) {
      return Response.redirect(url.origin + "/" + REPO + "/" + url.search, 301);
    }

    const target = `https://${GITHUB_USER}.github.io${url.pathname}${url.search}`;
    const upstream = await fetch(target, {
      method: request.method,
      headers: { "User-Agent": request.headers.get("User-Agent") || "cf-worker" },
      redirect: "follow",
    });

    const response = new Response(upstream.body, upstream);
    response.headers.set("Cache-Control", "public, max-age=300");
    return response;
  },
};
