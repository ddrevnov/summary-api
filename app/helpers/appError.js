export default function AppError({ status, msg, errors, name }) {
  Error.call(this);
  Error.captureStackTrace(this);

  this.message = msg;
  this.status = status;
  this.errors = errors;
  this.name = name;
}
