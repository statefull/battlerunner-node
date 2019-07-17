var statusCodes = {};

statusCodes[exports.EMAIL_NOT_VALID = 1] = "EmailNotValid";
statusCodes[exports.EMAIL_MISSING = 2] = "EmailMissing";
statusCodes[exports.PASSWORD_LENGTH_ERROR = 3] = "PasswordLengthError";
statusCodes[exports.PASSWORD_MISSING = 4] = "PasswordMissing";
statusCodes[exports.USER_NOT_FOUND = 5] = "UserNotFound";
statusCodes[exports.EMAIL_ALREADY_EXISTS = 6] = "EmailAlreadyExists";
statusCodes[exports.SESSION_ALREADY_INITIATED = 7] = "SessionAlreadyInitiated";
statusCodes[exports.RUNNER_POSITION_NOT_UPDATED = 8] = "RunnerPositionNotUpdated";
statusCodes[exports.RUNNER_SESSION_NOT_VALID = 9] = "RunnerSessionNotValid";
statusCodes[exports.TOKEN_NOT_VALID = 10] = "TokenNotValid";
statusCodes[exports.INTEGRITY_PARAM_NOT_FOUND = 11] = "IntegrityParamNotFound";
statusCodes[exports.INTEGRITY_PARAM_NOT_VALID = 12] = "IntegrityParamNotValid";
statusCodes[exports.NICKNAME_MISSING = 13] = "NicknameMissing";
statusCodes[exports.NICKNAME_LENGTH_ERROR = 14] = "NicknameLengthError";
statusCodes[exports.NICKNAME_ALREADY_EXISTS = 15] = "NicknameAlreadyExists";
statusCodes[exports.LOGIN_ID_MISSING = 16] = "LoginIdMissing";
statusCodes[exports.LOGIN_ID_NOT_VALID = 17] = "LoginIdNotValid";
statusCodes[exports.AGE_MISSING = 18] = "AgeMissing";
statusCodes[exports.SEX_MISSING = 19] = "SexMissing";
statusCodes[exports.WEIGHT_MISSING = 20] = "WeightMissing";
statusCodes[exports.HEIGHT_MISSING = 21] = "HeightMissing";
statusCodes[exports.CURRENT_PASSWORD_MISSING = 22] = "CurrentPasswordMissing";
statusCodes[exports.CURRENT_PASSWORD_ERROR = 23] = "CurrentPasswordError";
statusCodes[exports.SESSION_NOT_FINISHED = 24] = "SessionNotFinished";
statusCodes[exports.SESSION_ALREADY_FINISHED = 25] = "SessionAlreadyFinished";
statusCodes[exports.SESSION_NOT_PAUSED = 26] = "SessionNotPaused";
statusCodes[exports.SESSION_ALREADY_PAUSED = 27] = "SessionAlreadyPaused";
statusCodes[exports.SESSION_NOT_INITIATED = 28] = "SessionNotInitiated";
statusCodes[exports.CHALLENGE_MAX_LIMIT_REACHED = 29] = "ChallengeMaxLimitReached";
statusCodes[exports.CHALLENGE_INIT_DATE_MISSING = 30] = "ChallengeInitDateMissing";
statusCodes[exports.CHALLENGE_FINISH_DATE_MISSING = 31] = "ChallengeFinishDateMissing";
statusCodes[exports.CHALLENGE_INFORMATION_MISSING = 32] = "ChallengeInformationMissing";
statusCodes[exports.CHALLENGE_ALL_PARAMS_MISSING = 33] = "ChallengeAllParamsMissing";
statusCodes[exports.CHALLENGE_NOT_FOUND = 34] = "ChallengeNotFound";
statusCodes[exports.CHALLENGE_ID_MISSING = 35] = "ChallengeIdMissing";
statusCodes[exports.DEVICE_INFORMATION_MISSING = 36] = "DeviceInformationMissing";
statusCodes[exports.DEVICE_NOT_FOUND = 37] = "DeviceNotFound";
statusCodes[exports.AREA_REQUIREMENT_FAIL = 38] = "AreaRequirementFail";
statusCodes[exports.AREA_FAIL = 39] = "AreaFail";




exports.getStatusText = function(statusCode) {
    if (statusCodes.hasOwnProperty(statusCode)) {
        return statusCodes[statusCode];
    } else {
        throw new Error("Status code does not exist: " + statusCode);
    }
};
