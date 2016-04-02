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

var db
var client
var irc_config

var c = require('./colors')

var	print_irc = function (value, client, to) {

	var print_line = ''
	lines = value.split('\n')
	lines.forEach(function (line) {
		line.substring(0,26)
			.split('')
			.forEach(function (chr) {
				print_line += c[chr]	
			})

		client.say(to, print_line)
		print_line = ''
	})
}

var on_msg = function (from, to, text) {

	if (/^[.!]bots/.test(text)) {
		
		client.say(to, 
			'CaptBuffalo [NodeJS], '+ 
			'a deerkin clone written in node.js'
		)
		return
	}

	thedeer = text.match(
		RegExp(irc_config.nick+'.? (.*)'))

	if (thedeer) {
		db.get(thedeer[1], function(err,value) {
	
			if (err) {
				console.err(err.stack)
				return
			}
			
			print_irc(value,client,to)
		})
	}
}

var on_invite = function(channel, from, message) {

	client.join(channel)
}

module.exports = function (client_, db_, config) {

	db = db_
	client = client_
	irc_config = config

	client.addListener('message#', on_msg)
	client.addListener('invite', on_invite)
}
