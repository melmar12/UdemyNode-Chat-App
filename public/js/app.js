var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

$('.room-title').append(room);

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
	console.log('Connected to socket.io server!');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');

	console.log('New message: ' + message.text);
	
	$message.append('<li class="list-group-item"><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + ': </strong></br>' + message.text + '</li>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});