// .eleventy.js
const { DateTime } = require("luxon"); // Make sure Luxon is installed!

module.exports = function(eleventyConfig) {

  // filter definitions:
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "DDD");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Tell Eleventy to copy the 'css' directory to the output (_site)
  eleventyConfig.addPassthroughCopy("css"); 

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