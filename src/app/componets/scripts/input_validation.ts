export function sanitizeInput(input: any) {
  if (typeof input !== 'string') {
    return input; 
  }

  return input.replace(/[\0\b\n\r\t\\'"%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      case "\\":
        return "\\\\";
      case "'":
        return "''"; // Escape single quotes by doubling them in SQL
      case '"':
        return '\\"'; // Escape double quotes with backslash
      case "%":
        return "\\%"; // Escape percent signs used in LIKE clauses
      default:
        return char;
    }
  });
}

export function inputTypeValidation(type: string[], value: any[]){
  for (let i in type) {
    if(type[i] == typeof value[i]){
      return false;
    }
  }
  return true;
}