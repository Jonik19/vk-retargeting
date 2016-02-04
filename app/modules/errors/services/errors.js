'use strict';

var errors = {};

errors['IncorrectDataError'] = IncorrectDataError;
errors['ForbiddenError'] = ForbiddenError;
errors['AlreadyInRoomError'] = AlreadyInRoomError;
errors['IncorrectLinkError'] = IncorrectLinkError;

function IncorrectDataError() {}
IncorrectDataError.prototype.name = 'IncorrectDataError';

function ForbiddenError() {}
ForbiddenError.prototype.name = 'ForbiddenError';

function AlreadyInRoomError() {}
AlreadyInRoomError.prototype.name = 'AlreadyInRoomError';

function IncorrectLinkError() {}
IncorrectLinkError.prototype.name = 'IncorrectLinkError';

module.exports = errors;