class InvalidInput extends CustomError {
  constructor(message) {
    super(419, message);
  }
}

class Unauthorised extends CustomError {
  constructor(message) {
    super(401, message);
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(400, message);
  }
}

class Forbidden extends CustomErrro {
  constructor(message) {
    super(403, message);
  }
}

class NotFound extends CustomError {
  constructor(message) {
    super(404, message || "Not Found");
  }
}

class Conflict extends CustomError {
  constructor(message) {
    super(409, message);
  }
}

class InternalServer extends CustomError {
  constructor(message) {
    super(500, message);
  }
}

module.exports = {
  InvalidInput,
  Unauthorised,
  BadRequest,
  Forbidden,
  NotFound,
  Conflict,
  InternalServer,
};
