export class InfoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InfoException";
  }
}
