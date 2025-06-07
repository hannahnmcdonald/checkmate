export class DuplicateUsernameError extends Error {
    constructor() {
      super('Username already in use');
      this.name = 'DuplicateUsernameError';
      Object.setPrototypeOf(this, DuplicateUsernameError.prototype);
    }
}

export class DuplicateEmailError extends Error {
    constructor() {
      super('Email already in use');
      this.name = 'DuplicateEmailError';
      Object.setPrototypeOf(this, DuplicateEmailError.prototype);
    }
}