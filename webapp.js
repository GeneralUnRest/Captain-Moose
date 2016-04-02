//   Copyright 2016 prussian <generalunrest@airmail.cc>
//
//   Licensed under the Apache License, Version 2.0 (the "License")
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

module.exports = function (app, controllers, static_content, web_config) {

	// ROUTES
	// help does nothing right now
	app.get(web_config.ROOT+'/help', controllers.usage)

	// static dir
	app.use(web_config.ROOT, static_content)

	// fetch/set deers
	app.route(web_config.ROOT+'/buffalo/:deerid')
		.get(controllers.return_deer)
		.post([controllers.read_data, 
			   controllers.save_deer])

	// start listening on config'd port
	app.listen(web_config.port, web_config.address)
}
