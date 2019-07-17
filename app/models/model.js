( function ( module, log ) {
	'use strict';

	var mongoose = undefined;
	var schemas = {};

	var schemasfields = {
		runner: {
			'joinDate': {
				type: Date,
				default: Date.now
			},
			'lastDate': {
				type: Date,
				default: Date.now
			},
			'email': {
				type: String,
				lowercase: true,
				index: true,
				unique: true,
				trim: true
			},
			'nickname': {
				type: String,
				lowercase: true,
				index: true,
				unique: true,
				trim: true
			},
			'password': String,
			'socialToken': String,
			'age': Number,
			'sex': String,
			'weight': Number,
			'height': Number,
			'friends': [ String ], //object runnen referenced in mongo
			'karma': {
				type: Number,
				min: 0,
				max: 100,
				default: 20
			},
			'level': {
				type: Number,
				min: 0,
				max: 100,
				default: 0
			},
			'challengesWon': [ Number ],
			'challengesDone': [ Number ],
			'loc': {
				type: [ Number ],
				index: '2d'
			},
			'registerComplete': {
				type: Boolean,
				default: false
			},
			'devices': [ {
				'hwId': {
					type: String,
					lowercase: true,
					index: true,
					trim: true
				}
			} ],
			'pwRecovery': {
				'token': String,
				'date': {
					type: Date,
					default: Date.now
				}
			}
		},

		session: {
			'status': String, //initiated, paused, finished
			'city': String,
			'isChallenge': {
				type: Boolean,
				default: false
			},
			'challenge': String, //id of the challenge selected
			'date': {
				type: Date,
				default: Date.now
			},
			'runner': String, //object runnen referenced in mongo
			'tracking': [ {
				'long': Number,
				'lat': Number,
				'timestamp': Number
			} ],
			'information': {
				'maxSpeed': Number, //speed max in km/h
				'km': Number, //km
				'averageSpeed': Number, //speed average in km/h
				'timePerKm': Number, // time per km in seconds
				'timeFastestKm': Number, //fastest km in seconds
				'totalTime': Number //total time of the session in seconds
			},
			'deleted': {
				type: Boolean,
				default: false
			}
		},

		challenge: {
			'initDate': {
				type: Date,
				default: Date.now
			},
			'finishDate': Date,
			'runners': [ String ], //object runner referenced in mongo
			'owner': String, //object runner referenced in mongo
			'status': String, //created, inProgress, finished
			'information': {
				'type': String, //challenge type: distance, time or both
				'distance': Number, //distance in km
				'time': Number, //time in seconds
			}
		}
	};

	module.exports.getSchema = function ( name ) {
		return schemasfields[ name ];
	};

	function schemaConstructor( name, mongoose, strict ) {
		if ( typeof schemas[ name ] !== 'undefined' ) {
			return schemas[ name ];
		}
		if ( typeof mongoose === 'undefined' ) {
			throw new Error( 'Debe inicializar el schema previamente a su uso.' );
		}
		var Schema = mongoose.Schema,
			fields = schemasfields[ name ] ? schemasfields[ name ] : {},
			cfg = {
				collection: name
			};
		if ( Object.keys( fields ).length === 0 || !strict ) {
			cfg.strict = false;
		}
		var objSchema = new Schema( fields, cfg );
		schemas[ name ] = mongoose.model( name, objSchema );

		if ( typeof schemasfields[ name ] === 'undefined' ) {
			log.error( __filename + ':' + schemasfields[ name ] );
		}

		return schemas[ name ];
	}
	module.exports.ObjectId = function ( o ) {
		return mongoose.Types.ObjectId( o );
	};
	module.exports.isObjectIdValid = function ( o ) {
		return mongoose.Types.ObjectId.isValid( o );
	};
	module.exports.init = function ( mongoos ) {
		mongoose = mongoos;
		var Schema = mongoose.Schema;

		for ( var name in schemasfields ) {
			exports[ name ]( mongoose );
		}
	};

	var mapconstructors = {};

	function constructorschema( name ) {
		return function ( mongoose ) {
			if ( mapconstructors[ name ] ) {
				return mapconstructors[ name ];
			}
			return mapconstructors[ name ] = schemaConstructor( name, mongoose, true );
		};
	}

	for ( var name in schemasfields ) {
		module.exports[ name ] = constructorschema( name );
	}

} )( module, console );
