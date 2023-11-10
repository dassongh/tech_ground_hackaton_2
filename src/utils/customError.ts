import { EntityNotFoundError } from 'typeorm';

export type Error = CustomError | DBError | ValidationError | NotFoundError;

export class CustomError extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
}

export class DBError extends CustomError {
  private static DUPLICATE_UNIQUE_KEY_ERROR = 23505;
  private static FOREIGN_KEY_CONSTRAINT_ERROR = 23503;
  private static RELATION_KEY_NOT_EXIST = 23502;

  constructor(error) {
    console.error('DBError: ', error);
    const errorEntity = DBError.getErrorEntity(error);
    super(errorEntity.statusCode, errorEntity.message);
  }

  private static getErrorEntity(error) {
    if (error instanceof EntityNotFoundError) {
      return { statusCode: 404, message: 'Not Found' };
    }

    const entity = {
      [DBError.DUPLICATE_UNIQUE_KEY_ERROR]: { statusCode: 400, message: 'Duplicate value' },
      [DBError.FOREIGN_KEY_CONSTRAINT_ERROR]: { statusCode: 400, message: 'Foreign key constraint' },
      [DBError.RELATION_KEY_NOT_EXIST]: { statusCode: 400, message: 'Relation key not exist' },
      default: { statusCode: 500, message: 'Internal Server Error' },
    };

    return entity[Number(error.code)] || entity.default;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation error') {
    super(400, message);
  }
}
