const FILE_ICONS: { [key: string]: string } = {
  // Programming Languages
  ts: "/icons/typescript.svg",
  tsx: "/icons/typescript.svg",
  js: "/icons/javascript.svg",
  jsx: "/icons/javascript.svg",
  py: "/icons/python.svg",
  rb: "/icons/ruby.svg",
  go: "/icons/go.svg",
  rs: "/icons/rust.svg",
  java: "/icons/java.svg",
  cpp: "/icons/cpp.svg",
  c: "/icons/c.svg",
  cs: "/icons/csharp.svg",
  php: "/icons/php.svg",
  swift: "/icons/swift.svg",
  kt: "/icons/kotlin.svg",

  // Web
  html: "/icons/html.svg",
  css: "/icons/css.svg",
  scss: "/icons/sass.svg",
  sass: "/icons/sass.svg",
  less: "/icons/less.svg",
  svg: "/icons/svg.svg",

  // Config files
  json: "/icons/json.svg",
  yml: "/icons/yaml.svg",
  yaml: "/icons/yaml.svg",
  toml: "/icons/toml.svg",
  xml: "/icons/xml.svg",
  md: "/icons/markdown.svg",
  mdx: "/icons/mdx.svg",

  // Package managers
  "package.json": "/icons/npm.svg",
  "yarn.lock": "/icons/yarn.svg",
  "pnpm-lock.yaml": "/icons/pnpm.svg",

  // Config files (exact matches)
  ".env": "/icons/settings.svg",
  ".gitignore": "/icons/git.svg",
  dockerfile: "/icons/docker.svg",
  "docker-compose.yml": "/icons/docker.svg",
  "tsconfig.json": "/icons/tsconfig.svg",
};

const FOLDER_ICONS: { [key: string]: string } = {
  // Common folder names
  src: "/icons/folder-src.svg",
  docs: "/icons/folder-docs.svg",
  test: "/icons/folder-test.svg",
  tests: "/icons/folder-test.svg",
  config: "/icons/folder-config.svg",
  components: "/icons/folder-components.svg",
  assets: "/icons/folder-images.svg",
  public: "/icons/folder-public.svg",
  private: "/icons/folder-private.svg",
  api: "/icons/folder-api.svg",
  utils: "/icons/folder-utils.svg",
  lib: "/icons/folder-lib.svg",
  packages: "/icons/folder-packages.svg",
  node_modules: "/icons/folder-node.svg",
  dist: "/icons/folder-dist.svg",
  build: "/icons/folder-dist.svg",
  scripts: "/icons/folder-scripts.svg",
  hooks: "/icons/folder-hook.svg",
  types: "/icons/folder-typescript.svg",
  interfaces: "/icons/folder-interface.svg",
};

export function getFileIcon(
  filename: string,
  isDirectory: boolean = false
): string {
  if (isDirectory) {
    // Check for specific folder names (case insensitive)
    const folderName = filename.toLowerCase();
    if (folderName in FOLDER_ICONS) {
      return FOLDER_ICONS[folderName];
    }
    // Return default folder icon
    return "/icons/folder-blue.svg";
  }

  // First check for exact filename matches
  if (filename.toLowerCase() in FILE_ICONS) {
    return FILE_ICONS[filename.toLowerCase()];
  }

  // Then check file extension
  const extension = filename.split(".").pop()?.toLowerCase();
  if (extension && extension in FILE_ICONS) {
    return FILE_ICONS[extension];
  }

  // Default to generic file icon
  return "/icons/document.svg";
}
