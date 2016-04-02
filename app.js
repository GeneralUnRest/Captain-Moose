// Copyright 2016 prussian <generalunrest@airmail.cc>
//
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// db stuff
var db_config = require('./configs/db_config')
  , level = require('level')
  , db = level(db_config.db_path)

// express stuff
var web_config = require('./configs/web_config')
  , controllers = require('./controllers')(db)
  , init_web = require('./webapp')
  , express = require('express')
  , static_content = express.static(__dirname+'/resource')
  , app = express()


// irc client stuff
var irc_config = require('./configs/irc_config')
  , init_irc = require('./irc-client')
  , irc = require('irc')
  , client = new irc.Client(
	  irc_config.server,
	  irc_config.nick,
	  irc_config.options
  )

init_web(app, controllers, static_content, web_config)
init_irc(client, db, irc_config)
