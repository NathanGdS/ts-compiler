export const TokenType = {
  Illegal: "ILLEGAL",
  Eof: "EOF",
  Ident: "IDENT",
  Assign: "=",
  Number: "NUMBER",
  Let: "LET",
  Const: "CONST",
  Function: "FUNC",
  OpenParenthesis: "(",
  CloseParenthesis: ")",
  OpenBrace: "{",
  CloseBrace: "}",
  OpenBracket: "[",
  CloseBracket: "]",
  Comma: ",",
  DoubleQuotes: "DQ",
  Semicolon: ";",
  Colon: ":",
  Dash: "-",
  Bang: "!",
  Asterisk: "*",
  Slash: "/",
  Plus: "+",
  LessThan: "<",
  GreaterThan: ">",
  Equal: "==",
  LessThanEqual: "<=",
  GreaterThanEqual: ">=",
  If: "IF",
  Else: "ELSE",
  RETURN: "RETURN",
  True: "TRUE",
  False: "FALSE",
  //TYPES
  INT: "INT",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  STRING: "STRING",
  Array: "ARRAY",
  // LOGICAL OPERATORS
  And: "&&",
  Or: "||",
  NOT: "NOT",
} as const;
