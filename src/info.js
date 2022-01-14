const usage = "Usage: crlf-convert [CR|LF|CRLF]";

const help = `Usage: crlf-convert [CR|LF|CRLF]\n\nConverts text between newline (\\n)
         carriage return (\\r)
         and combined\n"(\\r\\n) line endings.\n\nOptions:\n\n[CR|LF|CRLF]: Desired line ending\n\n    CR is a carriage return character \\r (rare)\n    LF is a line feed character \\n (common on Unix and macOS)\n    CRLF is a combined ending \\r\\n (common on Windows)\nExample:\n\n    cat in.txt | crlf-convert LF > out.txt`;

module.exports = {
  help,
  usage
};
