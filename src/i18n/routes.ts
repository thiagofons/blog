/**
 * Route translations for different languages
 * Maps original route names to localized URLs
 * Example: "about" -> "o-projektu" for Slovenian
 * English routes use original names (not included here)
 */
export const routes: Record<string, Record<string, string>> = {
  pt: {
    about: "sobre",
    blog: "blog",
    pagination: "paginação",
    contact: "contato",
  },
};
