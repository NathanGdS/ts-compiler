import { isLetter, isNumber } from "../helpers/char.helpers";
import { createToken } from "../helpers/create-token.helper";
import { InternalWords, TokenType } from "./constants";
import { Token } from "./types";

export class Tokenizer {
  private readPosition: number = 0;
  private position: number = 0;
  private ch!: string;

  constructor(private input: string) {
    this.readChar();
  }

  public nextToken(): Token {
    this.skipWhitespace();

    let token: Token | undefined = this.readOperators();

    if (isLetter(this.ch)) {
      const ident = this.readIdent();

      const internalWords = InternalWords[ident as keyof typeof InternalWords];

      if (internalWords) {
        return internalWords;
      } else {
        return createToken(TokenType.Ident, ident);
      }
    } else if (isNumber(this.ch)) {
      return createToken(TokenType.Number, this.readInt());
    } else if (!token) {
      const illegalChar = this.ch;
      this.readChar();
      return createToken(TokenType.Illegal, illegalChar);
    }

    this.readChar();
    return token as Token;
  }

  private readOperators(): Token | undefined {
    switch (this.ch) {
      case "\0":
        return createToken(TokenType.Eof, "eof");

      case "=":
        if (this.peek() === "=") {
          this.readChar();
          return createToken(TokenType.Equal, "==");
        }
        return createToken(TokenType.Assign, this.ch);

      case ";":
        return createToken(TokenType.Semicolon, this.ch);

      case "(":
        return createToken(TokenType.OpenParenthesis, this.ch);

      case ")":
        return createToken(TokenType.CloseParenthesis, this.ch);

      case "{":
        return createToken(TokenType.OpenBrace, this.ch);

      case "}":
        return createToken(TokenType.CloseBrace, this.ch);

      case "[":
        return createToken(TokenType.OpenBracket, this.ch);

      case "]":
        return createToken(TokenType.CloseBracket, this.ch);

      case ",":
        return createToken(TokenType.Comma, this.ch);

      case "+":
        return createToken(TokenType.Plus, this.ch);

      case "-":
        return createToken(TokenType.Dash, this.ch);

      case "*":
        return createToken(TokenType.Asterisk, this.ch);

      case "/":
        return createToken(TokenType.Slash, this.ch);

      case "<":
        if (this.peek() === "=") {
          this.readChar();
          return createToken(TokenType.LessThanEqual, "<=");
        }
        return createToken(TokenType.LessThan, this.ch);

      case ">":
        if (this.peek() === "=") {
          this.readChar();
          return createToken(TokenType.GreaterThanEqual, ">=");
        }
        return createToken(TokenType.GreaterThan, this.ch);

      case "!":
        return createToken(TokenType.Bang, this.ch);

      case ":":
        return createToken(TokenType.Colon, this.ch);

      case "&":
        if (this.peek() === "&") {
          this.readChar();
          return createToken(TokenType.And, "&&");
        }
        break;

      case "|":
        if (this.peek() === "|") {
          this.readChar();
          return createToken(TokenType.Or, "||");
        }
        break;

      default:
        return;
    }
  }

  private skipWhitespace(): void {
    while (
      this.ch === " " ||
      this.ch === "\t" ||
      this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }

  private readChar(): void {
    if (this.ch === "\0") {
      return;
    }
    if (this.readPosition >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  private readIdent(): string {
    const position = this.position;

    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private readInt(): string {
    const position = this.position;

    while (isNumber(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private peek(): string {
    if (this.readPosition >= this.input.length) {
      return "\0";
    } else {
      return this.input[this.readPosition];
    }
  }
}
