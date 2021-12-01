import http from 'http';
import database from '../database/object_database';
import Hapi from "hapi";
import _ from "lodash";
import Joi, { valid } from 'joi';
import UserWorker from '../objects/UserWorker';
import GameWorker from '../objects/GameWorker';
import Game from '../objects/Game';

const init = async () => {
    const games = new GameWorker(database);
    const users = new UserWorker(database);
    const server = new Hapi.Server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/games',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return JSON.stringify(games.worker);
        }
    });

    server.route({
        method: 'GET',
        path: '/games/{id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return JSON.stringify(games.findOne(Number(request.params.id)));
        },
        
    });

    server.route({
        method: 'POST',
        path: '/games',
        options: {
            validate: {
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    ageRating: Joi.string().required(),
                    images: Joi.array().items(Joi.string().optional()).required(),
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const payload = (request.payload);
            let game: Omit<Game, 'id'> =  payload as unknown as Omit<Game, 'id'>
            return JSON.stringify(games.create(game));
        },
    });

    server.route({
        method: 'PUT',
        path: '/games/{id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                },
                payload: {
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    ageRating: Joi.string().required(),
                    images: Joi.array().items(Joi.string().optional()).required(),
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const payload = (request.payload);
            let game: Game =  payload as unknown as Game
            return JSON.stringify(games.update(game));
        },
        
    });

    server.route({
        method: 'DELETE',
        path: '/games/{id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            users.deleteGameFromAllUsers(id);
            return JSON.stringify(games.delete(id));
        },
    });
    
    server.route({
        method: 'GET',
        path: '/users/{id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            return JSON.stringify(users.find(id));
        },
    });

    server.route({
        method: 'POST',
        path: '/users',
        options: {
            validate: {
                payload: {
                    username: Joi.string().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const username = request.payload as unknown as { username: string };
            return JSON.stringify(users.create(username.username));
        },
    });

    server.route({
        method: 'POST',
        path: '/users',
        options: {
            validate: {
                payload: {
                    username: Joi.string().required()
                },
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const username = request.payload as unknown as { username: string };
            const id = request.params.id as unknown as number;
            return JSON.stringify(users.updateUsername(id, username.username));
        },
    });

    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            return JSON.stringify(users.delete(id));
        },
    });

    server.route({
        method: 'GET',
        path: '/users/{id}/games',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            return JSON.stringify(users.findUserGames(id));
        },
    });
    
    server.route({
        method: 'POST',
        path: '/users/{u_id}/games',
        options: {
            validate: {
                payload: {
                    id: Joi.number().required().integer().positive().required()
                },
                params: {
                    u_id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const u_id = request.params.u_id as unknown as number;
            const game_id = request.payload as unknown as { id: number};
            return JSON.stringify(users.addGame(u_id, games.findOne(game_id.id)));
        },
    });

    server.route({
        method: 'GET',
        path: '/users/{id}/games',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            return JSON.stringify(users.findUserGames(id));
        },
    });
    
    server.route({
        method: 'POST',
        path: '/users/{id}/games/{game_id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required(),
                    game_id: Joi.number().required().integer().positive().required()
                },
                payload: {
                    play_time: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            const game_id = request.params.game_id as unknown as number;
            const play_time = request.payload as unknown as { play_time: number };
            return JSON.stringify(users.addGamePlayTime(id, game_id, play_time.play_time));
        },
    });

    server.route({
        method: 'DELETE',
        path: '/users/{id}/games/{game_id}',
        options: {
            validate: {
                params: {
                    id: Joi.number().required().integer().positive().required(),
                    game_id: Joi.number().required().integer().positive().required()
                },
                payload: {
                    play_time: Joi.number().required().integer().positive().required()
                }
            }
        },
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = request.params.id as unknown as number;
            const game_id = request.params.game_id as unknown as number;
            return JSON.stringify(users.deleteGame(id, game_id));
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();