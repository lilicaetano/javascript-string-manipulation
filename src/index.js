
function createTemplateTagCRLFConverter(lineEnding) {
  return (strings, ...values) => {
    let string = '';

    for (let i=0; i<strings.length; i++) {
      string += transformLineEnding(strings[i], lineEnding);
      if (values[i] !== undefined && values[i] !== null) {
        if (Object.getOwnPropertySymbols(values[i]).includes(disableConverter)) {
          string += values[i];
        } else {
          string += transformLineEnding(values[i], lineEnding); 
        }
      }
    }

    return string;
  };
}

const LineEndings = {
  CR: Symbol("CR"),
  LF: Symbol("LF"),
  CRLF: Symbol("CRLF")
};

// Create a tagged template lf`...` that formats text using LF line endings.
const lf = createTemplateTagCRLFConverter(LineEndings.LF);

// Create a tagged template cr`...` that formats text using CR line endings.
const cr = createTemplateTagCRLFConverter(LineEndings.CR);

// Create a tagged template crlf`...` that formats text using CRLF line endings.
const crlf = createTemplateTagCRLFConverter(LineEndings.CRLF);

const transformLineEnding = (string, lineEnding) => {
  const { replaceCRLF, replaceCR, replaceLF} = LineEndingReplacements;
  
  string = (string != null ? string.toString() : "");

  if (lineEnding === LineEndings.CR) {
    string = replaceCRLF(string, "\r");
    string = replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = replaceCRLF(string, "\n");
    string = replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = replaceCR(string, "\r\n");
    string = replaceLF(string, "\r\n");
  }
  return string;
};

const disableConverter = Symbol.for("crlf-converter-disable");

const LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
  lf,
  cr,
  crlf,
  LineEndings,
  transformLineEnding,
  disableConverter
};
