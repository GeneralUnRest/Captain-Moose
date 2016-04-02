Captain Buffalo
==========

a Deerkin rework written in Javascript

using:

./configs/irc_config.js
have it connect to your, network/channel/nick of your choice

./configs/db_config.js 
to make it not write to tmp

./configs/web_config.js
have it listen on different port

writing buffalos

	curl server.tld:port/buffalo/<buffalo-name> --data-binary @- < deer.example
	# --data-binary sends the newlines just fine 
	# anything from 0-F, terminate lines with \n

to see your new deer

	curl server.tld:port/buffalo/<buffalo-name>
