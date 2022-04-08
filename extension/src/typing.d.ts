// Allows loading of HTML from file with html-loader
declare module '*.html' {
  const content: string;

  export default content;
}
