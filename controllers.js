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

module.exports = function (db) {
	
	return {
	read_data : function(req, res, next) {
		
		var data = ''
		req.setEncoding('utf8')

		req.on('data', function(chunk) { 
			data += chunk
			// over 10000 chars
			if (data.length > 10e3) {
				req.connection.destroy()
			}
		})

		req.on('end', function() {
			req.body = data
			next()
		})
	},
	return_deer : function (req,res, next) {

		db.get(req.params.deerid, function (err,value) {
			
			if (err) {
				
				res.status(404)
				res.send({
					status: 'error', 
					msg: 'DEER NOT FOUND'
				})
				return
			}
			
			res.send(value)
		})
	},
	save_deer : function (req,res,next) {

		db.get(req.params.deerid, function (err, value) {

			if (!err) {
			
				res.status(401)
				res.send({
					status: 'error',
					msg: 'DEER ALREADY EXISTS'
				})
				return
			}
			
			if (req.body.match(/[^0-9a-fA-F\n]/)) {

				res.status(500)
				res.send({
					status: 'error',
					msg: 'DEER MUST NOT MATCH '+
						 '/[^0-9a-fA-F\\n]/'
				})
				return
			}

			db.put(req.params.deerid, req.body)
			res.send({
				status: 'ok', 
				msg: 'DEER SAVED'
			})
		})
	},
	usage : function (req,res) {

		res.send({
			status: 'error',
			msg: 'not impl'
		})
	}}
}
