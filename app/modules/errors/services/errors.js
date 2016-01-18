'use strict';

var errors = {};

errors['IncorrectDataError'] = IncorrectDataError;
errors['ForbiddenError'] = ForbiddenError;

function IncorrectDataError() {}
IncorrectDataError.prototype.name = 'IncorrectDataError';

function ForbiddenError() {}
ForbiddenError.prototype.name = 'ForbiddenError';

module.exports = errors;