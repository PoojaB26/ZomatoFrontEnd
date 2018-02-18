$(document).ready(function () {
    $('#submit-query').click(function () {


        /*Stage 4*/
        $('#cuisines').empty();
        $('#cuisine_box').css('visibility', 'hidden');
        $('#restaurant_container').empty();
        /*Stage 4*/

        var locationInput = document.getElementById('loc').value;
        console.log(locationInput);

        call_LocationAPI(locationInput);
    })


/*Functions*/

    function call_LocationAPI(location){
        $.ajax({
                headers: {
                    "user-key": "6fe5fa83837e6e8338f88bf64fd863e3",
                    "Accept": "application/json"
                },
            url: "https://developers.zomato.com/api/v2.1/locations?query="+location,
            success: function (result) {
                console.log(result);
                var entity_id = result.location_suggestions[0].entity_id;
                console.log(entity_id);

                var entity_type = result.location_suggestions[0].entity_type;
                console.log(entity_type);

                getLocationDetails(entity_id, entity_type);

            }
            }
        )
    }


    function getLocationDetails(entity_id, entity_type){
        $.ajax(
            {
                headers:{
                    "user-key": "6fe5fa83837e6e8338f88bf64fd863e3",
                    "Accept": "application/json"
                },
                url: "https://developers.zomato.com/api/v2.1/location_details?entity_id="+entity_id+"&entity_type="+entity_type,
                success: function (result) {
                    displayData(result);
                }
            }
        )
    }


    function displayData(result){
        console.log(result);
        var cuisines = result.top_cuisines;
        var cuisine_length = cuisines.length;

        /*Fetching cuisines*/

        $('#cuisine_box').css('visibility', 'visible');
        for(var i=0; i<cuisine_length; i++){
            console.log(cuisines[i]);
            $('#cuisines').append(cuisines[i]+"<br>");
        }

        /*Fetching restaurants*/

        var restaurants = result.best_rated_restaurant;
        var rest_length = restaurants.length;

        for(var i=0; i<rest_length; i++){
            console.log(restaurants[i].restaurant.name);
            $('#restaurant_container').append(
            '<div class="card text-left">'+
                '<div class="card-header">'+
                restaurants[i].restaurant.name +
           ' </div> <div class="card-body">'+
               ' Cost for two :' + restaurants[i].restaurant.average_cost_for_two+'<br>'+
            'Cuisine: '+ restaurants[i].restaurant.cuisines+ '<br> </div> </div>'
            )

        }
    }



})