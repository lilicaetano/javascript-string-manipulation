/* eslint-disable no-unused-vars */
const { expect } = require("chai");
const { describe, it } = require("mocha");
const { lf } = global.lf || require("index.js");

describe("CRLF Converter", () => {
  describe("lf", () => {
    it("should replace CRLF at the beginning of a string", () => {
      const result = lf`\r\nHello there.`;

      expect(result.startsWith('\nHello')).to.be.true; 
    });

    it("should replace CRLF at the end of a string", () => {
      const result = lf`Hello there.\r\n`;

      expect(result.endsWith('there.\n')).to.be.true;
    });

    it("should replace CRLF in the middle of a string", () => {
      const result = lf`Hello \r\n\r\nthere.`;

      expect(result.includes('\n\nthere')).to.be.true;
    });
  });
});
