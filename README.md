# actualize.me-api

[![Build Status](https://travis-ci.org/MikelSage/actualize.me-api.svg?branch=master)](https://travis-ci.org/MikelSage/actualize.me-api)

## Intro

Actualize API is the backend counterpart to [Actualize.me](https://github.com/MikelSage/actualize.me), a React App built as a platform to track student progress through their time at Turing.

## Installation

Clone down this repo and run:
```shell
  $ cd actualize-api
  $ npm install // install node packages
  $ knex migrate:latest // run migrations to set up database
  $ knex seed:run // seeds database
  $ npm start // spins up server
```
Visit `localhost:5000` to test endpoints

## Endpoints

There are a total of 6 Endpoints right now, they are as follows:

|Verb|Path|Body|Response|
|---|---|---|---|
|`POST`|`/api/v1/sessions`|`{username: 'username', password: 'password'}`|`{id: user_id, role: user_role}`|
|`POST`|`/api/v1/scores`|`{ sub_id: 'submission_id', area_id: 'area_id', score: 'number' }`|`{ score: 'number' }`|
|`GET`|`/api/v1/current_projects`||`[{"id": 1, "name": "Date Night", "description": "description", "spec_url": "link to spec", "module_id": 1, "created_at": "date", "updated_at": "date"}, {}, ...]`|
|`GET`|`/api/v1/projects`||`[{"id": 1, "name": "Date Night", "description": "description", "spec_url": "link to spec", "module_id": 1, "created_at": "date", "updated_at": "date"}, {}, ...]`|
|`GET`|`/api/v1/projects/:id`||`{"id": 1, "name": "Date Night", "description": "description", "spec_url": "link to spec", "module_id": 1, "created_at": "date", "updated_at": "date"}`|
|`GET`|`/api/v1/projects/:id/ungraded_subs`||`{"id": 2, "notes": null, "github_url": "http://www.github.com/nope/not_real", "user_id": 3, "project_id": 1, "created_at": "2017-11-06T12:19:22.970Z", "updated_at": "2017-11-06T12:19:22.970Z", "project_name": "Date Night", "user": { "id": 3, "first_name": "Katie", "last_name": "Keel", "created_at": "2017-11-06T05:19:22.953544-07:00", "updated_at": "2017-11-06T05:19:22.953544-07:00", "description": "Awesome Person", "role": "student", "username": "keel", "password": "$2a$10$O8DJ3SBdfnXcJjI75ITiaOBxBHYFV2bQWD6U5xKh6eB8omcPb1JMK"}, "scores": [null]}`|
|`GET`|`/api/v1/projects/:id/areas`||`[{"id": 1, "name": "Functionality", "description": "All base functionality is met"}]`|
|`GET`|`/api/v1/modules`||`[{inning: 1705, program: 'Backend', start_date: date, end_date: date}, ...]`|
|`POST`|`/api/v1/submissions`|`{{userId: 3, githubUrl: 'https://github.com/MikelS/fake-proj', projectId: 2}}`||
|`GET`|`/api/v1/areas`||`[{"id": 1, "name": "Functionality", "description": "All base functionality is met"}, ...]`|
|`GET`|`/api/v1/users/:id/average_scores`||`[{name: 'TDD', avg: 2.4}, {name: 'Functionality', avg: 3.0}]`|
