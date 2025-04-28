// .eleventy.js
const fs = require("node:fs");
const path = require("node:path");
const { DateTime } = require("luxon"); // Make sure Luxon is installed!

module.exports = function(eleventyConfig) {

  // filter definitions:
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "DDD");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Tell Eleventy to copy the 'css' and 'images' directories to the output (_site)
  eleventyConfig.addPassthroughCopy("css"); 
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("admin");

  // Add the SVG shortcode
  eleventyConfig.addShortcode("svgIcon", function(filename) {
    // Construct the full path relative to the project root
    // Make sure '_includes/svgs' matches where you put your files
    const svgPath = path.join(__dirname, "_includes", "svgs", filename); 

    try {
      // Read the SVG file content
      const data = fs.readFileSync(svgPath, "utf8");
      // Return the raw SVG content
      return data;
    } catch (err) {
      console.error(`Error reading SVG file: ${svgPath}`, err);
      // Return an error message in the HTML if file not found or unreadable
      return ``;
    }
  });

  // configuration (return statement with dir, etc.)
  return {
    dir: {
      input: ".", 
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};