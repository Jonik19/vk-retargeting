'use strict';

var errors = {};

errors['IncorrectDataError'] = IncorrectDataError;
errors['ForbiddenError'] = ForbiddenError;
errors['AlreadyInRoomError'] = AlreadyInRoomError;

function IncorrectDataError() {}
IncorrectDataError.prototype.name = 'IncorrectDataError';

function ForbiddenError() {}
ForbiddenError.prototype.name = 'ForbiddenError';

function AlreadyInRoomError() {}
AlreadyInRoomError.prototype.name = 'AlreadyInRoomError';

module.exports = errors;