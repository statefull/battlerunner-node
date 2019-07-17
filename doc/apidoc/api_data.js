define({ "api": [
  {
    "type": "put",
    "url": "/api/:versionId/secure/challenge/create",
    "title": "Create",
    "description": "<p>Creates a new challenge</p>",
    "version": "1.0.0",
    "name": "Challenge_create",
    "group": "Challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "initDate",
            "description": "<p>The initial timestamp. When the challenge is going to start.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "finishDate",
            "description": "<p>The finish timestamp. When the challenge is going to finish.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "information",
            "description": "<p>Contains the challenge information.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "information.distance",
            "description": "<p>Optional Indicates the distance in KM the runner must run to achieve the challenge. It could be combined with information.time param.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "information.time",
            "description": "<p>Optional Indicates the time in SECONDS the runner must be running to achieve the challenge. It could be combined with information.distance param.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"initDate\": 1460198079,\n \"finishDate\": 1460238079,\n \"information\": {\n                  \"distance\": 20,\n                  \"time\": 3600\n                }\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challengeId",
            "description": "<p>Challenge id of the created challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n \"challengeId\": \"56e42b5d0f64a5051c9cee7c\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "ChallengeMaxLimitReached",
            "description": "<p>The max number of challenges allowed to be created has been reached</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "ChallengeAllParamsMissing",
            "description": "<p>No params for challenge has been provided.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "ChallengeInitDateMissing",
            "description": "<p>The initial date for the challenge is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "ChallengeFinishDateMissing",
            "description": "<p>The finish date for the challenge is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "ChallengeInformationMissing",
            "description": "<p>The information for the challenge is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-ChallengeMaxLimitReached:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"ChallengeMaxLimitReached\"\n}",
          "type": "json"
        },
        {
          "title": "Error-ChallengeAllParamsMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ChallengeAllParamsMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-ChallengeInitDateMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ChallengeInitDateMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-ChallengeFinishDateMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ChallengeFinishDateMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-ChallengeInformationMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ChallengeInformationMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Challenge"
  },
  {
    "type": "get",
    "url": "/api/:versionId/secure/challenge/get/information/:challengeId",
    "title": "Get challenge",
    "description": "<p>get the challenge information</p>",
    "version": "1.0.0",
    "name": "Challenge_get",
    "group": "Challenge",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": ":challengeId",
            "description": "<p>Challenge id of the desired challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"challengeId\": \"56e42b5d0f64a5051c9cee7d\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challenge",
            "description": "<p>The information of the retreived challenge</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED\n{\n \"challenge\": {\n                'initDate': 1460198079,\n                'finishDate': 1460188079,\n                'runners': [String],\n                'owner': \"56e42b5d0f64a5051c9cee7d\",\n                'status': \"created\"\n                'information': {\n                    'type': \"both\"\n                    'distance': 30\n                    'time': 7000\n                }\n              }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "ChallengeIdMissing",
            "description": "<p>The challenge id is missing</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "ChallengeInitDateMissing",
            "description": "<p>The initial date for the challenge is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The requested challenge is not found</p>"
          }
        ],
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-ChallengeIdMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ChallengeIdMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-ChallengeInitDateMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"ChallengeInitDateMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-ChallengeNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ChallengeNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Challenge"
  },
  {
    "type": "get",
    "url": "/api/:versionId/secure/runner/people/area/:range",
    "title": "Runners inside an area",
    "version": "1.0.0",
    "name": "Area",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": ":range",
            "defaultValue": "5",
            "description": "<p>The radio in kilometers from the actual postion of the runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"range\": 5\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "runners",
            "description": "<p>list of the runners inside the specified range.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of the runner inside the range specified.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "loc",
            "description": "<p>indicates the last position tracked of the runner inside the specified range.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Runner ID associated to the runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"runners\": [\n       {\n         \"_id\": \"571b9a13ed916eac0e2d2bd1\",\n         \"nickname\": \"mynickname\",\n         \"loc\": [\n           1.3323,\n           0.1432\n         ]\n       }\n     ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "AreaFail",
            "description": "<p>Failing getting runners in range.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "AreaRequirementFail",
            "description": "<p>invalid session or invalid runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-AreaFail:",
          "content": "HTTP/1.1 420 Method Failure\n{\n  \"error\": \"AreaFail\"\n}",
          "type": "json"
        },
        {
          "title": "Error-AreaRequirementFail:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"AreaRequirementFail\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "post",
    "url": "/api/:versionId/runner/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "Login",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loginId",
            "description": "<p>email or nickname of the runner.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "6..",
            "optional": false,
            "field": "password",
            "description": "<p>Password associated to the runner login.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"loginId\": \"test@example.com\",\n    \"password\": \"th1sIs4ExamplePassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Session token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "random",
            "description": "<p>Random number to be used for integrity operations.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the logged user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of the logged user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "completion",
            "description": "<p>Indicates whether registration is completed.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runnerId",
            "description": "<p>Runner ID associated to the runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"random\": 382982881,\n  \"email\": \"test@example.com\",\n  \"nickname\": \"mynickname\",\n  \"completion\": true,\n  \"runnerId\" : \"56e405d843dd5b1e112b531a\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not in database.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailNotValid",
            "description": "<p>The email is not a valid email.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailMissing",
            "description": "<p>The email is not present in the request.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "PasswordMissing",
            "description": "<p>The password is not present in the request.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "PasswordLengthError",
            "description": "<p>The password length is not correct.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-PasswordMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"PasswordMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-PasswordLengthError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"PasswordLengthError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "post",
    "url": "/api/:versionId/runner/recover/password",
    "title": "Password Recovery",
    "version": "1.0.0",
    "name": "Password_Recovery",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loginId",
            "description": "<p>email or nickname of the runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"loginId\": \"test@example.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not in database.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailNotValid",
            "description": "<p>The email is not a valid email.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailMissing",
            "description": "<p>The email is not present in the request.</p>"
          }
        ],
        "Error 304": [
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerPasswordTokenNotUpdated",
            "description": "<p>The runner's password token not updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-RunnerPasswordTokenNotUpdated:",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "get",
    "url": "/api/:versionId/runner/generate/new/password/:token",
    "title": "Password Recovery Generate new Password",
    "version": "1.0.0",
    "name": "Password_Recovery_Generate_new_Password",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>the token that identies the new password request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"token\": \"ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not in database.</p>"
          }
        ],
        "Error 304": [
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerNewPasswordNotUpdated",
            "description": "<p>The runner's password is not updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-RunnerNewPasswordNotUpdated:",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "put",
    "url": "/api/:versionId/runner/register",
    "title": "Registration",
    "version": "1.0.0",
    "name": "Register",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the runner which will be its login id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..",
            "optional": false,
            "field": "password",
            "description": "<p>Password associated to the runner login.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "4..10",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of the runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"email\": \"test@example.com\",\n    \"password\": \"th1sIs4ExamplePassword\",\n    \"nickname\": \"mynickname\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "EmailAlreadyExists",
            "description": "<p>The email already exists.</p>"
          },
          {
            "group": "Error 409",
            "optional": false,
            "field": "NicknameAlreadyExists",
            "description": "<p>The nickname already exists.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailNotValid",
            "description": "<p>The email is not a valid email.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailMissing",
            "description": "<p>The email is not present in the request.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "PasswordMissing",
            "description": "<p>The password is not present in the request.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "PasswordLengthError",
            "description": "<p>The password length is not correct.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "NicknameMissing",
            "description": "<p>The nickname is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "NicknameLengthError",
            "description": "<p>The nickname is length is not correct.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-EmailAlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"EmailAlreadyExists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-NicknameAlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"NicknameAlreadyExists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-PasswordMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"PasswordMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-PasswordLengthError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"PasswordLengthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-NicknameMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"NicknameMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-NicknameLengthError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"NicknameLengthError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "put",
    "url": "/api/:versionId/secure/runner/register/completion",
    "title": "Complete registration",
    "description": "<p>Complete the registration data. Optional fields.</p>",
    "version": "1.0.0",
    "name": "Register_completion",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>The age of the runner.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"m,f\""
            ],
            "optional": false,
            "field": "sex",
            "description": "<p>The sex of the runner: m = male f = female.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>The runner's weight.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>The runner's height.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"age\": 24,\n \"sex\": \"m\",\n \"weight\": 89,\n \"height\": 188\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "AgeMissing",
            "description": "<p>Age missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "SexMissing",
            "description": "<p>Sex missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "WeightMissing",
            "description": "<p>Weight missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "HeightMissing",
            "description": "<p>Height missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 304": [
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerInformationNotModified",
            "description": "<p>The runner's information is not updated.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-AgeMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AgeMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-SexMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"SexMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-WeightMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"WeightMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-HeightMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"HeightMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-RunnerInformationNotModified:",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/runner/update/information",
    "title": "Update runner information",
    "description": "<p>Used to update the data of the runner.</p>",
    "version": "1.0.0",
    "name": "Runner_update_information",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>The age of the runner.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"m,f\""
            ],
            "optional": false,
            "field": "sex",
            "description": "<p>The sex of the runner: m = male f = female.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>The runner's weight.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>The runner's height.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the runner which will be its login id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "4..10",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname of the runner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"age\": 24,\n \"sex\": \"m\",\n \"weight\": 89,\n \"height\": 188,\n \"email\": \"test@example.com\",\n \"nickname\": \"mynickname\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "AgeMissing",
            "description": "<p>Age missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "SexMissing",
            "description": "<p>Sex missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "WeightMissing",
            "description": "<p>Weight missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "HeightMissing",
            "description": "<p>Height missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailNotValid",
            "description": "<p>The email is not a valid email.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "EmailMissing",
            "description": "<p>The email is not present in the request.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "NicknameMissing",
            "description": "<p>The nickname is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "NicknameLengthError",
            "description": "<p>The nickname is length is not correct.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "EmailAlreadyExists",
            "description": "<p>The email already exists.</p>"
          },
          {
            "group": "Error 409",
            "optional": false,
            "field": "NicknameAlreadyExists",
            "description": "<p>The nickname already exists.</p>"
          }
        ],
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 304": [
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerInformationNotModified",
            "description": "<p>The runner's information is not updated.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-AgeMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AgeMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-SexMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"SexMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-WeightMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"WeightMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-HeightMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"HeightMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailAlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"EmailAlreadyExists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-NicknameAlreadyExists:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"NicknameAlreadyExists\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-EmailMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"EmailMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-NicknameMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"NicknameMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-NicknameLengthError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"NicknameLengthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-RunnerInformationNotModified:",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/runner/update/password",
    "title": "Update runner password",
    "description": "<p>Updates the current runner's password by the desired one.</p>",
    "version": "1.0.0",
    "name": "Runner_update_password",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..",
            "optional": false,
            "field": "currentPassword",
            "description": "<p>Current runner's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New runner's password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"currentPassword\": \"myActualPassword\",\n \"newPassword\": \"myNewPassword\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 CREATED",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "CurrentPasswordMissing",
            "description": "<p>Current Password missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "PasswordMissing",
            "description": "<p>New password missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "PasswordLengthError",
            "description": "<p>New password length error.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "CurrentPasswordError",
            "description": "<p>Not authorized to perform the action.</p>"
          },
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ],
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 304": [
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerPasswordNotModified",
            "description": "<p>The runner's password is not updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-CurrentPasswordMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"CurrentPasswordMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-PasswordMissing:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"PasswordMissing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-PasswordLengthError:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"PasswordLengthError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-CurrentPasswordError:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"CurrentPasswordError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-RunnerPasswordNotModified:",
          "content": "HTTP/1.1 304 Not Modified",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/runner/friend/information",
    "title": "Get friend information",
    "description": "<p>Return the runner information of a friend</p>",
    "version": "1.0.0",
    "name": "runner_friend_information",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "friend",
            "optional": false,
            "field": "friend",
            "description": "<p>The runner id/email/nickname.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTI0MTgxIiwicnVubmVySWQiOiI1NmRhZDY0ZWUzZDc3YzUyMGE4NmMxYTkiLCJpYXQiOjE0NTcyODA3NjcsImV4cCI6MTQ1NzI4NDM2N30.vZsAUqlgc7kzv2q7SSH71FsDsyRApfSB2xJlHq47Lks\",\n \"friend\": \"yourFriendIdentificator\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>_id which identifies internally the runner.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email the friend's runner email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname the friend's runner nickname.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "challengesDone",
            "description": "<p>The finished challenges where the friend's runner has take place.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "challengesWon",
            "description": "<p>The finished challenges where the friend's runner is the winner.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>The friend's runner level.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "karma",
            "description": "<p>The friend's runner karma.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "friends",
            "description": "<p>The friend's runner friend list.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastDate",
            "description": "<p>The last date the friend's runner was logged in.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "joinDate",
            "description": "<p>The date the friend's runner get registered.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"_id\": \"56e42b5d0f64a5051c9cee7c\",\n  \"email\": \"test@test.es\",\n  \"nickname\": \"mynickname\",\n  \"challengesDone\": [],\n  \"challengesWon\": [],\n  \"level\": 0,\n  \"karma\": 20,\n  \"friends\": [],\n  \"lastDate\": \"2016-03-12T19:09:53.435Z\",\n  \"joinDate\": \"2016-03-12T14:44:45.735Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "LoginIdMissing",
            "description": "<p>The login id is missing.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "LoginIdNotValid",
            "description": "<p>The login id is invalid.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not in database.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-LoginIdMissing:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-LoginIdNotValid:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "get or post",
    "url": "/api/:versionId/secure/runner/own/information",
    "title": "Get runner information",
    "description": "<p>Return the runner information</p>",
    "version": "1.0.0",
    "name": "runner_own_information",
    "group": "Runner",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTI0MTgxIiwicnVubmVySWQiOiI1NmRhZDY0ZWUzZDc3YzUyMGE4NmMxYTkiLCJpYXQiOjE0NTcyODA3NjcsImV4cCI6MTQ1NzI4NDM2N30.vZsAUqlgc7kzv2q7SSH71FsDsyRApfSB2xJlHq47Lks\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>_id which identifies internally the runner.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email the friend's runner email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>Nickname the friend's runner nickname.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "challengesDone",
            "description": "<p>The finished challenges where the friend's runner has take place.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "challengesWon",
            "description": "<p>The finished challenges where the friend's runner is the winner.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>The friend's runner level.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "karma",
            "description": "<p>The friend's runner karma.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "friends",
            "description": "<p>The friend's runner friend list.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastDate",
            "description": "<p>The last date the friend's runner was logged in.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "joinDate",
            "description": "<p>The date the friend's runner get registered.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"_id\": \"56e42b5d0f64a5051c9cee7c\",\n  \"email\": \"test@test.es\",\n  \"nickname\": \"mynickname\",\n  \"challengesDone\": [],\n  \"challengesWon\": [],\n  \"level\": 0,\n  \"karma\": 20,\n  \"friends\": [],\n  \"lastDate\": \"2016-03-12T19:09:53.435Z\",\n  \"joinDate\": \"2016-03-12T14:44:45.735Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User is not in database.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Runner"
  },
  {
    "type": "put",
    "url": "/api/:versionId/secure/session/create",
    "title": "Create",
    "version": "1.0.0",
    "name": "Create",
    "group": "Session",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>The name of the city where the session is taking place.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "challengeId",
            "description": "<p>Optional The Id of the challenge a session is refer to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date",
            "description": "<p>Optional The timestamp when the session is/was initiated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"city\": \"New york\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>Session id which identifies the running session.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"sessionId\": \"56dae8968921d2e30e8848bf\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "SessionAlreadyInitiated",
            "description": "<p>There is a session already initiated.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingParams",
            "description": "<p>The request is not fully completed.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "ChallengeNotFound",
            "description": "<p>The requested challenge id has been not found.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-SessionAlreadyInitiated:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"SessionAlreadyInitiated\"\n}",
          "type": "json"
        },
        {
          "title": "Error-MissingParams:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-ChallengeNotFound:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Session"
  },
  {
    "type": "put",
    "url": "/api/:versionId/secure/session/offline/create",
    "title": "Offline create",
    "description": "<p>Creates a complete session when the runner saves its session without connectivity</p>",
    "version": "1.0.0",
    "name": "Offline_create",
    "group": "Session",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"finished\""
            ],
            "optional": false,
            "field": "Status",
            "description": "<p>The status of the session.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>The name of the city where the session is taking place.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isChallenge",
            "description": "<p>If the session is attached to a challenge.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "challenge",
            "description": "<p>The challenge id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date",
            "description": "<p>The date when the session started. If not provided the current date will be set.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "runner",
            "description": "<p>The runner id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tracking",
            "description": "<p>The tracking positions.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTI0MTgxIiwicnVubmVySWQiOiI1NmRhZDY0ZWUzZDc3YzUyMGE4NmMxYTkiLCJpYXQiOjE0NTcyODA3NjcsImV4cCI6MTQ1NzI4NDM2N30.vZsAUqlgc7kzv2q7SSH71FsDsyRApfSB2xJlHq47Lks\",\n \"city\": \"New york\",\n \"status\": \"finished\",\n \"runner\": \"4654654565456\",\n \"Date\": \"Sun, 06 Mar 2016 16:47:07 GMT\"\n \"tracking\": [\n              {\n               \"long\": -1.2323232,\n               \"lat\": -21.343433,\n               \"timestamp\": 11111\n              },\n              {\n               \"long\": -1.2323232,\n               \"lat\": -21.343433,\n               \"timestamp\": 22222\n              },\n              {\n               \"long\": 44.44,\n               \"lat\": 44.44,\n               \"timestamp\": 333333\n              }\n           ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>Session id which identifies the running session.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"sessionId\": \"56dae8968921d2e30e8848bf\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "InternalError",
            "description": "<p>An error in the database reported.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingParams",
            "description": "<p>The request is not fully completed.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-InternalError:",
          "content": "HTTP/1.1 420 Method Failure",
          "type": "json"
        },
        {
          "title": "Error-MissingParams:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/session/tracking",
    "title": "Update tracking information",
    "description": "<p>Tracks the runner positions in the sessions and updates the last runner position for geolocalization purposes.</p>",
    "version": "1.0.0",
    "name": "Tracking",
    "group": "Session",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>The session id which identifies a initiared session.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "position",
            "description": "<p>The tracking information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"sessionId\": \"56dae8968921d2e30e8848bf\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"position\": [\n                 {\n                     long: 1.2323,\n                     lat: 0.3432,\n                     timestamp: 1289371932\n                 },\n                 {\n                     long: 1.3323,\n                     lat: 0.1432,\n                     timestamp: 1289372914\n                 }\n             ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 304": [
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerPositionNotUpdated",
            "description": "<p>The location of the runner is not updated.</p>"
          },
          {
            "group": "Error 304",
            "optional": false,
            "field": "RunnerSessionNotValid",
            "description": "<p>The session is not valid.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingParams",
            "description": "<p>The request is not fully completed.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 304 Not Modified\n{\n  \"error\": \"RunnerPositionNotUpdated\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 304 Not Modified\n{\n  \"error\": \"RunnerSessionNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-MissingParams:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/session/finish",
    "title": "Finish",
    "description": "<p>finish a session setting the information data</p>",
    "version": "1.0.0",
    "name": "finish",
    "group": "Session",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>The session id which identifies a initiared session.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "information",
            "description": "<p>The information related to the session.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"sessionId\": \"56dae8968921d2e30e8848bf\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"information\":\n               {\n                   \"maxSpeed\": 19,\n                   \"km\": 20,\n                   \"averageSpeed\": 12,\n                   \"timePerKm\": 300,\n                   \"timeFastestKm\": 200,\n                   \"totalTime\": 3600\n               }\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "SessionNotFinished",
            "description": "<p>The current session is not finished</p>"
          }
        ],
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "SessionAlreadyFinished",
            "description": "<p>The current session is finished</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingParams",
            "description": "<p>The request is not fully completed.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-SessionNotFinished:",
          "content": "HTTP/1.1 420 Method Failure\n{\n  \"error\": \"SessionNotFinished\"\n}",
          "type": "json"
        },
        {
          "title": "Error-SessionAlreadyFinished:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"SessionAlreadyFinished\"\n}",
          "type": "json"
        },
        {
          "title": "Error-MissingParams:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/session/pause",
    "title": "Pause",
    "description": "<p>Pause a session</p>",
    "version": "1.0.0",
    "name": "pause",
    "group": "Session",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>The session id which identifies a initiared session.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"sessionId\": \"56dae8968921d2e30e8848bf\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "SessionNotPaused",
            "description": "<p>The current session is not paused.</p>"
          }
        ],
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "SessionAlreadyPaused",
            "description": "<p>The current session is already paused or in a invalid state to be paused</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingParams",
            "description": "<p>The request is not fully completed.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-SessionNotPaused:",
          "content": "HTTP/1.1 420 Method Failure\n{\n  \"error\": \"SessionNotPaused\"\n}",
          "type": "json"
        },
        {
          "title": "Error-SessionAlreadyPaused:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"SessionAlreadyPaused\"\n}",
          "type": "json"
        },
        {
          "title": "Error-MissingParams:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Session"
  },
  {
    "type": "post",
    "url": "/api/:versionId/secure/session/restart",
    "title": "Restart",
    "description": "<p>Restart a session currently paused.</p>",
    "version": "1.0.0",
    "name": "restart",
    "group": "Session",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"v1\""
            ],
            "optional": false,
            "field": ":versionId",
            "description": "<p>Version of the API call.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Optional Authentication token. If not set in the header.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sessionId",
            "description": "<p>The session id which identifies a initiared session.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"sessionId\": \"56dae8968921d2e30e8848bf\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-hash-req",
            "description": "<p>Integrity token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"x-access-token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZlcm5hbmRvZUBnbWFpbC5jb20iLCJoYXNoS2V5IjoiZmVybmFuZG9lQGdtYWlsLmNvbTE2ODk2MSIsInJ1bm5lcklkIjoiNTZkYWQ2NGVlM2Q3N2M1MjBhODZjMWE5IiwiaWF0IjoxNDU3Mjc4OTA5LCJleHAiOjE0NTcyODI1MDl9.h_Gc6FNF6xZr92Gj_On0l69z5KevwMuy7-08wirWqQk\",\n  \"x-hash-req\": \"5FD924625F6AB16A19CC9807C7C506AE1813490E4BA675F843D5A10E0BAACDB8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 420": [
          {
            "group": "Error 420",
            "optional": false,
            "field": "SessionNotInitiated",
            "description": "<p>The current session is not initiated.</p>"
          }
        ],
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "SessionAlreadyInitiated",
            "description": "<p>The current session is already initiated.</p>"
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "MissingParams",
            "description": "<p>The request is not fully completed.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotFound",
            "description": "<p>Integrity parameter not found.</p>"
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "IntegrityParamNotValid",
            "description": "<p>Integrity check failed.</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-SessionNotInitiated:",
          "content": "HTTP/1.1 420 Method Failure\n{\n  \"error\": \"SessionNotInitiated\"\n}",
          "type": "json"
        },
        {
          "title": "Error-SessionAlreadyInitiated:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"SessionAlreadyInitiated\"\n}",
          "type": "json"
        },
        {
          "title": "Error-MissingParams:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-TokenNotValid:",
          "content": "HTTP/1.1 401 Unathorized\n{\n  \"error\": \"TokenNotValid\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotFound:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-IntegrityParamNotValid:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"IntegrityParamNotValid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./apiDoc.js",
    "groupTitle": "Session"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "_media_sf_battlerunner_wendoling_doc_apidoc_main_js",
    "groupTitle": "_media_sf_battlerunner_wendoling_doc_apidoc_main_js",
    "name": ""
  }
] });
