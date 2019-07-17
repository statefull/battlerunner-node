/**
 * @api {put} /api/:versionId/runner/register Registration
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Runner
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} email Email of the runner which will be its login id.
 * @apiParam {String{6..}} password Password associated to the runner login.
 * @apiParam {String{4..10}} nickname Nickname of the runner.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "email": "test@example.com",
 *      "password": "th1sIs4ExamplePassword",
 *      "nickname": "mynickname"
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *
 * @apiError (Error 409) EmailAlreadyExists The email already exists.
 *
 * @apiErrorExample Error-EmailAlreadyExists:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "EmailAlreadyExists"
 *     }
 *
 * @apiError (Error 409) NicknameAlreadyExists The nickname already exists.
 *
 * @apiErrorExample Error-NicknameAlreadyExists:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "NicknameAlreadyExists"
 *     }
 *
 * @apiError (Error 400) EmailNotValid The email is not a valid email.
 *
 * @apiErrorExample Error-EmailNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailNotValid"
 *     }
 *
 * @apiError (Error 400) EmailMissing The email is not present in the request.
 *
 * @apiErrorExample Error-EmailMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailMissing"
 *     }
 *
 * @apiError (Error 400) PasswordMissing The password is not present in the request.
 *
 * @apiErrorExample Error-PasswordMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "PasswordMissing"
 *     }
 *
 * @apiError (Error 400) PasswordLengthError The password length is not correct.
 *
 * @apiErrorExample Error-PasswordLengthError:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "PasswordLengthError"
 *     }
 *
 * @apiError (Error 400) NicknameMissing The nickname is missing.
 *
 * @apiErrorExample Error-NicknameMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "NicknameMissing"
 *     }
 *
 * @apiError (Error 400) NicknameLengthError The nickname is length is not correct.
 *
 * @apiErrorExample Error-NicknameLengthError:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "NicknameLengthError"
 *     }
 */

/**
 * @api {put} /api/:versionId/secure/runner/register/completion Complete registration
 * @apiDescription Complete the registration data. Optional fields.
 * @apiVersion 1.0.0
 * @apiName Register completion
 * @apiGroup Runner
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {Number} age The age of the runner.
 * @apiParam {String="m,f"} sex The sex of the runner: m = male f = female.
 * @apiParam {Number} weight The runner's weight.
 * @apiParam {Number} height The runner's height.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "age": 24,
 *      "sex": "m",
 *      "weight": 89,
 *      "height": 188
 *     }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *
 * @apiError (Error 400) AgeMissing Age missing.
 *
 * @apiErrorExample Error-AgeMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AgeMissing"
 *     }
 *
 * @apiError (Error 400) SexMissing Sex missing.
 *
 * @apiErrorExample Error-SexMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "SexMissing"
 *     }
 *
 * @apiError (Error 400) WeightMissing  Weight missing.
 *
 * @apiErrorExample Error-WeightMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "WeightMissing"
 *     }
 *
 * @apiError (Error 400) HeightMissing Height missing.
 *
 * @apiErrorExample Error-HeightMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "HeightMissing"
 *     }
 *
 * @apiError (Error 304) RunnerInformationNotModified The runner's information is not updated.
 *
 * @apiErrorExample Error-RunnerInformationNotModified:
 *     HTTP/1.1 304 Not Modified
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/runner/login Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Runner
 *
 * @apiParam {string="v1"} :versionId Version of the API call.
 * @apiParam {string} loginId email or nickname of the runner.
 * @apiParam {string{6..}} password Password associated to the runner login.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "loginId": "test@example.com",
 *      "password": "th1sIs4ExamplePassword"
 *  }
 *
 *  @apiSuccess {String} token Session token.
 *  @apiSuccess {Number} random Random number to be used for integrity operations.
 *  @apiSuccess {String} email Email of the logged user.
 *  @apiSuccess {String} nickname Nickname of the logged user.
 *  @apiSuccess {Boolean} completion Indicates whether registration is completed.
 *  @apiSuccess {String} runnerId Runner ID associated to the runner.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "random": 382982881,
 *       "email": "test@example.com",
 *       "nickname": "mynickname",
 *       "completion": true,
 *       "runnerId" : "56e405d843dd5b1e112b531a"
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 404) UserNotFound User is not in database.
 *
 * @apiErrorExample Error-UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 * @apiError (Error 400) EmailNotValid The email is not a valid email.
 *
 * @apiErrorExample Error-EmailNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailNotValid"
 *     }
 *
 * @apiError (Error 400) EmailMissing The email is not present in the request.
 *
 * @apiErrorExample Error-EmailMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailMissing"
 *     }
 *
 * @apiError (Error 400) PasswordMissing The password is not present in the request.
 *
 * @apiErrorExample Error-PasswordMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "PasswordMissing"
 *     }
 *
 * @apiError (Error 400) PasswordLengthError The password length is not correct.
 *
 * @apiErrorExample Error-PasswordLengthError:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "PasswordLengthError"
 *     }
 */

/**
 * @api {get} /api/:versionId/secure/runner/people/area/:range Runners inside an area
 * @apiVersion 1.0.0
 * @apiName Area
 * @apiGroup Runner
 *
 * @apiParam {string="v1"} :versionId Version of the API call.
 * @apiParam {Number} [:range=5] The radio in kilometers from the actual postion of the runner.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "range": 5
 *  }
 *  @apiSuccess {Object[]} runners list of the runners inside the specified range.
 *  @apiSuccess {String} nickname Nickname of the runner inside the range specified.
 *  @apiSuccess {Object[]} loc indicates the last position tracked of the runner inside the specified range.
 *  @apiSuccess {String} _id Runner ID associated to the runner.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
         "runners": [
           {
             "_id": "571b9a13ed916eac0e2d2bd1",
             "nickname": "mynickname",
             "loc": [
               1.3323,
               0.1432
             ]
           }
         ]
       }
 *
 * @apiError (Error 420) AreaFail Failing getting runners in range.
 * @apiErrorExample Error-AreaFail:
 *     HTTP/1.1 420 Method Failure
 *     {
 *       "error": "AreaFail"
 *     }
 *
 * @apiError (Error 404) AreaRequirementFail invalid session or invalid runner.
 *
 * @apiErrorExample Error-AreaRequirementFail:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "AreaRequirementFail"
 *     }
 */

/**
 * @api {put} /api/:versionId/secure/session/create Create
 * @apiVersion 1.0.0
 * @apiName Create
 * @apiGroup Session
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {String} city The name of the city where the session is taking place.
 * @apiParam {Boolean} [challengeId] Optional The Id of the challenge a session is refer to.
 * @apiParam {Date} [date] Optional The timestamp when the session is/was initiated.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "city": "New york",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccess {String} sessionId Session id which identifies the running session.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "sessionId": "56dae8968921d2e30e8848bf",
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 409) SessionAlreadyInitiated There is a session already initiated.
 *
 * @apiErrorExample Error-SessionAlreadyInitiated:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "SessionAlreadyInitiated"
 *     }
 *
 * @apiError (Error 400) MissingParams The request is not fully completed.
 *
 * @apiErrorExample Error-MissingParams:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 404) ChallengeNotFound The requested challenge id has been not found.
 *
 * @apiErrorExample Error-ChallengeNotFound:
 *     HTTP/1.1 404 Not Found
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/secure/session/tracking Update tracking information
 * @apiDescription Tracks the runner positions in the sessions and updates the last runner position for geolocalization purposes.
 * @apiVersion 1.0.0
 * @apiName Tracking
 * @apiGroup Session
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {String} sessionId The session id which identifies a initiared session.
 * @apiParam {Object[]} position  The tracking information.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "sessionId": "56dae8968921d2e30e8848bf",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *      "position": [
                    {
                        long: 1.2323,
                        lat: 0.3432,
                        timestamp: 1289371932
                    },
                    {
                        long: 1.3323,
                        lat: 0.1432,
                        timestamp: 1289372914
                    }
                ]
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *
 *
 * @apiError (Error 304) RunnerPositionNotUpdated The location of the runner is not updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 304 Not Modified
 *     {
 *       "error": "RunnerPositionNotUpdated"
 *     }
 *
 * @apiError (Error 304) RunnerSessionNotValid The session is not valid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 304 Not Modified
 *     {
 *       "error": "RunnerSessionNotValid"
 *     }
 *
 * @apiError (Error 400) MissingParams The request is not fully completed.
 *
 * @apiErrorExample Error-MissingParams:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {put} /api/:versionId/secure/session/offline/create Offline create
 * @apiDescription Creates a complete session when the runner saves its session without connectivity
 * @apiVersion 1.0.0
 * @apiName Offline create
 * @apiGroup Session
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {String="finished"} Status The status of the session.
 * @apiParam {String} city The name of the city where the session is taking place.
 * @apiParam {Boolean} [isChallenge] If the session is attached to a challenge.
 * @apiParam {String} [challenge]  The challenge id.
 * @apiParam {Date} [date]  The date when the session started. If not provided the current date will be set.
 * @apiParam {String} runner The runner id.
 * @apiParam {Object[]} tracking The tracking positions.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTI0MTgxIiwicnVubmVySWQiOiI1NmRhZDY0ZWUzZDc3YzUyMGE4NmMxYTkiLCJpYXQiOjE0NTcyODA3NjcsImV4cCI6MTQ1NzI4NDM2N30.vZsAUqlgc7kzv2q7SSH71FsDsyRApfSB2xJlHq47Lks",
 *     "city": "New york",
 *     "status": "finished",
 *     "runner": "4654654565456",
 *     "Date": "Sun, 06 Mar 2016 16:47:07 GMT"
 *     "tracking": [
 *                  {
 *                   "long": -1.2323232,
 *                   "lat": -21.343433,
 *                   "timestamp": 11111
 *                  },
 *                  {
 *                   "long": -1.2323232,
 *                   "lat": -21.343433,
 *                   "timestamp": 22222
 *                  },
 *                  {
 *                   "long": 44.44,
 *                   "lat": 44.44,
 *                   "timestamp": 333333
 *                  }
 *               ]
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccess {String} sessionId Session id which identifies the running session.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "sessionId": "56dae8968921d2e30e8848bf",
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 *
 * @apiError (Error 400) MissingParams The request is not fully completed.
 *
 * @apiErrorExample Error-MissingParams:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/secure/session/finish Finish
 * @apiDescription finish a session setting the information data
 * @apiVersion 1.0.0
 * @apiName finish
 * @apiGroup Session
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {String} sessionId The session id which identifies a initiared session.
 * @apiParam {Object} information The information related to the session.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "sessionId": "56dae8968921d2e30e8848bf",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *      "information":
 *                   {
 *                       "maxSpeed": 19,
 *                       "km": 20,
 *                       "averageSpeed": 12,
 *                       "timePerKm": 300,
 *                       "timeFastestKm": 200,
 *                       "totalTime": 3600
 *                   }
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 *
 * @apiError (Error 420) SessionNotFinished The current session is not finished
 *
 * @apiErrorExample Error-SessionNotFinished:
 *     HTTP/1.1 420 Method Failure
 *     {
 *       "error": "SessionNotFinished"
 *     }
 *
 * @apiError (Error 409) SessionAlreadyFinished The current session is finished
 *
 * @apiErrorExample Error-SessionAlreadyFinished:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "SessionAlreadyFinished"
 *     }
 *
 *
 * @apiError (Error 400) MissingParams The request is not fully completed.
 *
 * @apiErrorExample Error-MissingParams:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/secure/session/pause Pause
 * @apiDescription Pause a session
 * @apiVersion 1.0.0
 * @apiName pause
 * @apiGroup Session
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {String} sessionId The session id which identifies a initiared session.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "sessionId": "56dae8968921d2e30e8848bf",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 *
 * @apiError (Error 420) SessionNotPaused The current session is not paused.
 *
 * @apiErrorExample Error-SessionNotPaused:
 *     HTTP/1.1 420 Method Failure
 *     {
 *       "error": "SessionNotPaused"
 *     }
 *
 * @apiError (Error 409) SessionAlreadyPaused The current session is already paused or in a invalid state to be paused
 *
 * @apiErrorExample Error-SessionAlreadyPaused:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "SessionAlreadyPaused"
 *     }
 *
 *
 * @apiError (Error 400) MissingParams The request is not fully completed.
 *
 * @apiErrorExample Error-MissingParams:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/secure/session/restart Restart
 * @apiDescription Restart a session currently paused.
 * @apiVersion 1.0.0
 * @apiName restart
 * @apiGroup Session
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {String} sessionId The session id which identifies a initiared session.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "sessionId": "56dae8968921d2e30e8848bf",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 *
 * @apiError (Error 420) SessionNotInitiated The current session is not initiated.
 *
 * @apiErrorExample Error-SessionNotInitiated:
 *     HTTP/1.1 420 Method Failure
 *     {
 *       "error": "SessionNotInitiated"
 *     }
 *
 * @apiError (Error 409) SessionAlreadyInitiated The current session is already initiated.
 *
 * @apiErrorExample Error-SessionAlreadyInitiated:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "SessionAlreadyInitiated"
 *     }
 *
 *
 * @apiError (Error 400) MissingParams The request is not fully completed.
 *
 * @apiErrorExample Error-MissingParams:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */


/**
 * @api {post} /api/:versionId/secure/runner/friend/information Get friend information
 * @apiDescription Return the runner information of a friend
 * @apiVersion 1.0.0
 * @apiName runner/friend/information
 * @apiGroup Runner
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 * @apiParam {friend} friend The runner id/email/nickname.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTI0MTgxIiwicnVubmVySWQiOiI1NmRhZDY0ZWUzZDc3YzUyMGE4NmMxYTkiLCJpYXQiOjE0NTcyODA3NjcsImV4cCI6MTQ1NzI4NDM2N30.vZsAUqlgc7kzv2q7SSH71FsDsyRApfSB2xJlHq47Lks",
 *     "friend": "yourFriendIdentificator"
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccess {ObjectId} _id _id which identifies internally the runner.
 * @apiSuccess {String} email Email the friend's runner email.
 * @apiSuccess {String} nickname Nickname the friend's runner nickname.
 * @apiSuccess {ObjectId[]} challengesDone The finished challenges where the friend's runner has take place.
 * @apiSuccess {ObjectId[]} challengesWon The finished challenges where the friend's runner is the winner.
 * @apiSuccess {Number} level The friend's runner level.
 * @apiSuccess {Number} karma The friend's runner karma.
 * @apiSuccess {ObjectId[]} friends The friend's runner friend list.
 * @apiSuccess {Date} lastDate The last date the friend's runner was logged in.
 * @apiSuccess {Date} joinDate The date the friend's runner get registered.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "_id": "56e42b5d0f64a5051c9cee7c",
 *      "email": "test@test.es",
 *      "nickname": "mynickname",
 *      "challengesDone": [],
 *      "challengesWon": [],
 *      "level": 0,
 *      "karma": 20,
 *      "friends": [],
 *      "lastDate": "2016-03-12T19:09:53.435Z",
 *      "joinDate": "2016-03-12T14:44:45.735Z"
 *    }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 *
 * @apiError (Error 400) LoginIdMissing The login id is missing.
 *
 * @apiErrorExample Error-LoginIdMissing:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 400) LoginIdNotValid The login id is invalid.
 *
 * @apiErrorExample Error-LoginIdNotValid:
 *     HTTP/1.1 400 Bad Request
 *
 * @apiError (Error 404) UserNotFound User is not in database.
 *
 * @apiErrorExample Error-UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {get or post} /api/:versionId/secure/runner/own/information Get runner information
 * @apiDescription Return the runner information
 * @apiVersion 1.0.0
 * @apiName runner/own/information
 * @apiGroup Runner
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String} [token] Optional Authentication token. If not set in the header.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTI0MTgxIiwicnVubmVySWQiOiI1NmRhZDY0ZWUzZDc3YzUyMGE4NmMxYTkiLCJpYXQiOjE0NTcyODA3NjcsImV4cCI6MTQ1NzI4NDM2N30.vZsAUqlgc7kzv2q7SSH71FsDsyRApfSB2xJlHq47Lks"
 *    }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccess {ObjectId} _id _id which identifies internally the runner.
 * @apiSuccess {String} email Email the friend's runner email.
 * @apiSuccess {String} nickname Nickname the friend's runner nickname.
 * @apiSuccess {ObjectId[]} challengesDone The finished challenges where the friend's runner has take place.
 * @apiSuccess {ObjectId[]} challengesWon The finished challenges where the friend's runner is the winner.
 * @apiSuccess {Number} level The friend's runner level.
 * @apiSuccess {Number} karma The friend's runner karma.
 * @apiSuccess {ObjectId[]} friends The friend's runner friend list.
 * @apiSuccess {Date} lastDate The last date the friend's runner was logged in.
 * @apiSuccess {Date} joinDate The date the friend's runner get registered.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "_id": "56e42b5d0f64a5051c9cee7c",
 *      "email": "test@test.es",
 *      "nickname": "mynickname",
 *      "challengesDone": [],
 *      "challengesWon": [],
 *      "level": 0,
 *      "karma": 20,
 *      "friends": [],
 *      "lastDate": "2016-03-12T19:09:53.435Z",
 *      "joinDate": "2016-03-12T14:44:45.735Z"
 *    }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 404) UserNotFound User is not in database.
 *
 * @apiErrorExample Error-UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/secure/runner/update/information Update runner information
 * @apiDescription Used to update the data of the runner.
 * @apiVersion 1.0.0
 * @apiName Runner update information
 * @apiGroup Runner
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {Number} age The age of the runner.
 * @apiParam {String="m,f"} sex The sex of the runner: m = male f = female.
 * @apiParam {Number} weight The runner's weight.
 * @apiParam {Number} height The runner's height.
 * @apiParam {String} email Email of the runner which will be its login id.
 * @apiParam {String{4..10}} nickname Nickname of the runner.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "age": 24,
 *      "sex": "m",
 *      "weight": 89,
 *      "height": 188,
 *      "email": "test@example.com",
 *      "nickname": "mynickname"
 *     }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *
 * @apiError (Error 400) AgeMissing Age missing.
 *
 * @apiErrorExample Error-AgeMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AgeMissing"
 *     }
 *
 * @apiError (Error 400) SexMissing Sex missing.
 *
 * @apiErrorExample Error-SexMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "SexMissing"
 *     }
 *
 * @apiError (Error 400) WeightMissing  Weight missing.
 *
 * @apiErrorExample Error-WeightMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "WeightMissing"
 *     }
 *
 * @apiError (Error 400) HeightMissing Height missing.
 *
 * @apiErrorExample Error-HeightMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "HeightMissing"
 *     }
 *
 * @apiError (Error 409) EmailAlreadyExists The email already exists.
 *
 * @apiErrorExample Error-EmailAlreadyExists:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "EmailAlreadyExists"
 *     }
 *
 * @apiError (Error 409) NicknameAlreadyExists The nickname already exists.
 *
 * @apiErrorExample Error-NicknameAlreadyExists:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "NicknameAlreadyExists"
 *     }
 *
 * @apiError (Error 400) EmailNotValid The email is not a valid email.
 *
 * @apiErrorExample Error-EmailNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailNotValid"
 *     }
 *
 * @apiError (Error 400) EmailMissing The email is not present in the request.
 *
 * @apiErrorExample Error-EmailMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailMissing"
 *     }
 *
 * @apiError (Error 400) NicknameMissing The nickname is missing.
 *
 * @apiErrorExample Error-NicknameMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "NicknameMissing"
 *     }
 *
 * @apiError (Error 400) NicknameLengthError The nickname is length is not correct.
 *
 * @apiErrorExample Error-NicknameLengthError:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "NicknameLengthError"
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 304) RunnerInformationNotModified The runner's information is not updated.
 *
 * @apiErrorExample Error-RunnerInformationNotModified:
 *     HTTP/1.1 304 Not Modified
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/secure/runner/update/password Update runner password
 * @apiDescription Updates the current runner's password by the desired one.
 * @apiVersion 1.0.0
 * @apiName Runner update password
 * @apiGroup Runner
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {String{6..}} currentPassword Current runner's password.
 * @apiParam {String{6..}} newPassword New runner's password.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "currentPassword": "myActualPassword",
 *      "newPassword": "myNewPassword"
 *     }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *
 * @apiError (Error 400) CurrentPasswordMissing Current Password missing.
 *
 * @apiErrorExample Error-CurrentPasswordMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "CurrentPasswordMissing"
 *     }
 *
 * @apiError (Error 400) PasswordMissing New password missing.
 *
 * @apiErrorExample Error-PasswordMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "PasswordMissing"
 *     }
 *
 * @apiError (Error 400) PasswordLengthError  New password length error.
 *
 * @apiErrorExample Error-PasswordLengthError:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "PasswordLengthError"
 *     }
 *
 * @apiError (Error 401) CurrentPasswordError Not authorized to perform the action.
 *
 * @apiErrorExample Error-CurrentPasswordError:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "CurrentPasswordError"
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 304) RunnerPasswordNotModified The runner's password is not updated.
 *
 * @apiErrorExample Error-RunnerPasswordNotModified:
 *     HTTP/1.1 304 Not Modified
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {put} /api/:versionId/secure/challenge/create Create
 * @apiDescription Creates a new challenge
 * @apiVersion 1.0.0
 * @apiName Challenge create
 * @apiGroup Challenge
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {Date} initDate The initial timestamp. When the challenge is going to start.
 * @apiParam {Date} finishDate The finish timestamp. When the challenge is going to finish.
 * @apiParam {Object} information Contains the challenge information.
 * @apiParam {Number} [information.distance] Optional Indicates the distance in KM the runner must run to achieve the challenge. It could be combined with information.time param.
 * @apiParam {Number} [information.time] Optional Indicates the time in SECONDS the runner must be running to achieve the challenge. It could be combined with information.distance param.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "initDate": 1460198079,
 *      "finishDate": 1460238079,
 *      "information": {
 *                       "distance": 20,
 *                       "time": 3600
 *                     }
 *     }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccess {String} challengeId Challenge id of the created challenge
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *      "challengeId": "56e42b5d0f64a5051c9cee7c"
 *     }
 *
 * @apiError (Error 409) ChallengeMaxLimitReached The max number of challenges allowed to be created has been reached
 *
 * @apiErrorExample Error-ChallengeMaxLimitReached:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "ChallengeMaxLimitReached"
 *     }
 *
 * @apiError (Error 400) ChallengeAllParamsMissing No params for challenge has been provided.
 *
 * @apiErrorExample Error-ChallengeAllParamsMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChallengeAllParamsMissing"
 *     }
 *
 * @apiError (Error 400) ChallengeInitDateMissing  The initial date for the challenge is missing.
 *
 * @apiErrorExample Error-ChallengeInitDateMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChallengeInitDateMissing"
 *     }
 *
 * @apiError (Error 400) ChallengeFinishDateMissing  The finish date for the challenge is missing.
 *
 * @apiErrorExample Error-ChallengeFinishDateMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChallengeFinishDateMissing"
 *     }
 *
 * @apiError (Error 400) ChallengeInformationMissing  The information for the challenge is missing.
 *
 * @apiErrorExample Error-ChallengeInformationMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChallengeInformationMissing"
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {get} /api/:versionId/secure/challenge/get/information/:challengeId Get challenge
 * @apiDescription  get the challenge information
 * @apiVersion 1.0.0
 * @apiName Challenge get
 * @apiGroup Challenge
 *
 * @apiParam {String="v1"} :versionId Version of the API call.
 * @apiParam {Number}  :challengeId Challenge id of the desired challenge
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *      "challengeId": "56e42b5d0f64a5051c9cee7d"
 *     }
 *
 * @apiHeader  {String} x-access-token Authentication token.
 * @apiHeader  {String} x-hash-req Integrity token.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk",
 *       "x-hash-req": "5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8"
 *     }
 *
 * @apiSuccess {Object} challenge The information of the retreived challenge
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *      "challenge": {
 *                     'initDate': 1460198079,
 *                     'finishDate': 1460188079,
 *                     'runners': [String],
 *                     'owner': "56e42b5d0f64a5051c9cee7d",
 *                     'status': "created"
 *                     'information': {
 *                         'type': "both"
 *                         'distance': 30
 *                         'time': 7000
 *                     }
 *                   }
 *     }
 *
 *
 * @apiError (Error 400) ChallengeIdMissing The challenge id is missing
 *
 * @apiErrorExample Error-ChallengeIdMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChallengeIdMissing"
 *     }
 *
 * @apiError (Error 400) ChallengeInitDateMissing  The initial date for the challenge is missing.
 *
 * @apiErrorExample Error-ChallengeInitDateMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChallengeInitDateMissing"
 *     }
 *
 * @apiError (Error 404) ChallengeNotFound  The requested challenge is not found
 *
 * @apiErrorExample Error-ChallengeNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ChallengeNotFound"
 *     }
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 401) TokenNotValid Invalid token.
 *
 * @apiErrorExample Error-TokenNotValid:
 *     HTTP/1.1 401 Unathorized
 *     {
 *       "error": "TokenNotValid"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotFound Integrity parameter not found.
 *
 * @apiErrorExample Error-IntegrityParamNotFound:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotFound"
 *     }
 *
 * @apiError (Error 400) IntegrityParamNotValid Integrity check failed.
 *
 * @apiErrorExample Error-IntegrityParamNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "IntegrityParamNotValid"
 *     }
 */

/**
 * @api {post} /api/:versionId/runner/recover/password Password Recovery
 * @apiVersion 1.0.0
 * @apiName Password Recovery
 * @apiGroup Runner
 *
 * @apiParam {string} loginId email or nickname of the runner.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "loginId": "test@example.com"
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 202 Accepted
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 404) UserNotFound User is not in database.
 *
 * @apiErrorExample Error-UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 * @apiError (Error 400) EmailNotValid The email is not a valid email.
 *
 * @apiErrorExample Error-EmailNotValid:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailNotValid"
 *     }
 *
 * @apiError (Error 400) EmailMissing The email is not present in the request.
 *
 * @apiErrorExample Error-EmailMissing:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "EmailMissing"
 *     }
 *
 * @apiError (Error 304) RunnerPasswordTokenNotUpdated The runner's password token not updated.
 *
 * @apiErrorExample Error-RunnerPasswordTokenNotUpdated:
 *     HTTP/1.1 304 Not Modified
 *
 */

/**
 * @api {get} /api/:versionId/runner/generate/new/password/:token Password Recovery Generate new Password
 * @apiVersion 1.0.0
 * @apiName Password Recovery Generate new Password
 * @apiGroup Runner
 *
 * @apiParam {string} token the token that identies the new password request.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "token": "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *
 * @apiError (Error 420) InternalError An error in the database reported.
 *
 * @apiErrorExample Error-InternalError:
 *     HTTP/1.1 420 Method Failure
 *
 * @apiError (Error 404) UserNotFound User is not in database.
 *
 * @apiErrorExample Error-UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 * @apiError (Error 304) RunnerNewPasswordNotUpdated The runner's password is not updated.
 *
 * @apiErrorExample Error-RunnerNewPasswordNotUpdated:
 *     HTTP/1.1 304 Not Modified
 *
 */
