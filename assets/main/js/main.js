/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var windowHeight = $(window).height();


$('#map_canvas').css('height', windowHeight / 2 + 100);
$('.over-map').css('top', windowHeight / 2);
$('#intro').css('height', windowHeight / 2 - 100);
$('#chat-body').css('height', windowHeight / 2 + 10);




$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors:[
            'home',
            'about',
            'products',
            'contact'],
        menu: 'menu'
    });
});
	
