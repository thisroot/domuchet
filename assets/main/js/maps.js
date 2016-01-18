/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    
     $('#advert-address').val('');

    function onGeoSuccess(location) {
        
         var savedAddress = Cookies.get('location');
         if (savedAddress) {
             $('#advert-address').val(savedAddress).focus();       
        $('#advert-address').focusout(function(){ $('#input-address').text($('#advert-address').val());});        
        $('#input-address').text($('#advert-address').val());
        explode();
        
         }
         
         else {

                    
        var formatedAddress = location.address.city + ' ' + location.address.street + ' д. ' + location.address.streetNumber;
      
        
        $('#advert-address').val(formatedAddress).focus();      
        $('#advert-address').focusout(function(){ $('#input-address').text($('#advert-address').val());});       
        $('#input-address').text($('#advert-address').val());
        explode();
        
         }
    }

    function onGeoError(error) {
        console.log(error);
        var savedAddress = Cookies.get('location');
        
        $('#advert-address').val(savedAddress).focus();       
        $('#advert-address').focusout(function(){ $('#input-address').text($('#advert-address').val());});        
        $('#input-address').text($('#advert-address').val());
        explode();
        
        
    }
    
    $('.btn-find-location').on('click', function(){
        
       var savedAddress =  $('#advert-address').val();        
        Cookies.set('location',savedAddress);
    });
    

 //   geolocator.locateByIP(onGeoSuccess, onGeoError, 2);
    geolocator.locate(onGeoSuccess, onGeoError, true);


    var geocoder;
    var map;
    var marker;
    var markers = [];

    function explode() {

        function initialize(latitude, longitude) {


            var styles = [{"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"visibility": "off"}]}, {"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{"color": "#ced6e9"}]}, {"featureType": "landscape.man_made", "elementType": "labels.text", "stylers": [{"visibility": "on"}, {"color": "#0f0b0b"}]}, {"featureType": "landscape.man_made", "elementType": "labels.text.stroke", "stylers": [{"visibility": "on"}]}, {"featureType": "landscape.man_made", "elementType": "labels.icon", "stylers": [{"visibility": "on"}]}, {"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#1f5b85"}]}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#d064a4"}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 100}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"visibility": "on"}, {"lightness": 700}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#6bb1e1"}]}];

            // Create a new StyledMapType object, passing it the array of styles,
            // as well as the name to be displayed on the map type control.
            var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

            var latlng = new google.maps.LatLng(latitude, longitude);

            var options = {
                zoom: 10,
                center: latlng,
                scrollwheel: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };

            map = new google.maps.Map(document.getElementById('map_canvas'), options);
            geocoder = new google.maps.Geocoder();

            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
        }

        function DeleteMarkers() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        function findLocation(val) {

            geocoder.geocode({'address': val}, function (results, status) {

                var location = results[0].geometry.location;
                map.setCenter(location);
                map.setZoom(15);
                DeleteMarkers();

                $('#advert-location').val(location);

                marker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    position: location
                });

                google.maps.event.addListener(marker, 'dragend', function ()
                {
                    $('#advert-location').val(marker.getPosition());
                });

                markers.push(marker);

            });
        }
        
       

        $(document).ready(function () {

            initialize();

            if ($('#advert-address').val()) {
                _location = $('#advert-address').val();
                findLocation(_location);
            }

            $('#advert-address').bind('blur keyup', function () {
                _location = $('#advert-address').val();
                findLocation(_location);
            });
        });
        
        
        
        
    };   
});

