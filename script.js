$(document).ready(function () {
  // Global Variables
  var cardCount = 0;
  var MAX_CARDS = 6;
  var cardToReplace = 0;

  // array of searched names to create pokemon cards to try and only allow 6 cards to show on the page
  var pokemonCardArray = [];
  // create the pokemon cards each time the pokeball is clicked
  function renderPokemonCards() {
    $("#pokemon-view").empty();
    for (var i = 0; i < pokemonCardArray.length; i++) {
      var response = pokemonCardArray[i];
      var pokemonCol = $("<div>");
      pokemonCol.addClass("col-xs-3 m-2");
      // add the row to HTML
      $("#pokemon-view").prepend(pokemonCol);
      // create the whole div to append the different card classes too
      var pokemonDiv = $("<div>");
      pokemonDiv.addClass("card border-dark").attr("style", "width:18rem");
      // pokemonDiv.addClass("card border-dark").attr("style", "height:28.6rem");
      // create the img tag to hold the pokemon
      var imgPokemon = $("<img>");
      imgPokemon.addClass(
        "card-img-top img-thumbnail shadow-sm border-bottom-secondary"
      );
      imgPokemon.attr("src", response.sprites.front_default);
      pokemonDiv.append(imgPokemon);
      // create the card body to hold the contents
      var pokemonBodyDiv = $("<div>");
      pokemonBodyDiv.addClass("card-body");
      pokemonBodyDiv.attr("style", "height:17rem");
      pokemonDiv.append(pokemonBodyDiv);
      // create the title where we use the var name to show for each card
      var pokemonBodyTitle = $("<h4>");
      pokemonBodyTitle.addClass("card-title text-center");
      pokemonBodyTitle.text(response.name);
      pokemonBodyDiv.append(pokemonBodyTitle);
      // create the p tag to hold pokedex index
      var pokedexIndex = $("<p>");
      pokedexIndex.addClass("card-text m-0");
      pokedexIndex.text("pokedex index: " + response.id);
      pokemonBodyDiv.append(pokedexIndex);
      // create the p tag to hold the type(s) we take from our ajax call (response)
      var pokemonBodyTextType = $("<p>");
      pokemonBodyTextType.addClass("card-text mb-0");
      var type = response.types.map((type) => type.type.name).join(", ");
      pokemonBodyTextType.text("type: " + type);
      pokemonBodyDiv.append(pokemonBodyTextType);
      // create the p tag to hold the ablitlies
      var pokemonBodyTextAbilities = $("<p>");
      pokemonBodyTextAbilities.addClass("card-text");
      var ability = response.abilities
        .map((ability) => ability.ability.name)
        .join(" & ");
      pokemonBodyTextAbilities.text("abilities: " + ability);
      pokemonBodyDiv.append(pokemonBodyTextAbilities);
      // create the table element to put base stats in
      var pokemonBodyStatsTable = $("<table>");
      pokemonBodyStatsTable.addClass("table-sm text-center");
      pokemonBodyDiv.append(pokemonBodyStatsTable);
      // create table head elemnt for base stats
      var pokemonBodyStatsTableHead = $("<thead>");
      pokemonBodyStatsTable.append(pokemonBodyStatsTableHead);
      // create the row for the head
      var pokemonBodyStatsTableTR = $("<tr>");
      pokemonBodyStatsTableTR.addClass("mb-3");
      pokemonBodyStatsTableHead.append(pokemonBodyStatsTableTR);
      // create the th for the base stat hp
      var pokemonBodyStatsTableThHP = $("<th>");
      pokemonBodyStatsTableThHP.attr("scope", "col");
      pokemonBodyStatsTableThHP.text("hp"); //hp
      pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThHP);
      //create the th for the base stat attack
      var pokemonBodyStatsTableThAttack = $("<th>");
      pokemonBodyStatsTableThAttack.attr("scope", "col");
      pokemonBodyStatsTableThAttack.text("att"); //attack
      pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThAttack);
      //create th for defense
      var pokemonBodyStatsTableThDefense = $("<th>");
      pokemonBodyStatsTableThDefense.attr("scope", "col");
      pokemonBodyStatsTableThDefense.text("def"); //defense
      pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThDefense);
      //create th for sp-attack
      var pokemonBodyStatsTableThSpAttack = $("<th>");
      pokemonBodyStatsTableThSpAttack.attr("scope", "col");
      pokemonBodyStatsTableThSpAttack.text("s.att"); //sp-attack
      pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThSpAttack);
      // create th for sp-defense
      var pokemonBodyStatsTableThSpDefense = $("<th>");
      pokemonBodyStatsTableThSpDefense.attr("scope", "col");
      pokemonBodyStatsTableThSpDefense.text("s.def"); //sp-defense
      pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThSpDefense);
      // create th for speed
      var pokemonBodyStatsTableThSpeed = $("<th>");
      pokemonBodyStatsTableThSpeed.attr("scope", "col");
      pokemonBodyStatsTableThSpeed.text("spd"); //speed
      pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThSpeed);
      // create tbody for the stat #
      var pokemonTBody = $("<tbody>");
      pokemonBodyStatsTable.append(pokemonTBody);
      // create another <tr>
      var pokemonTBodyTR = $("<tr>");
      pokemonTBody.append(pokemonTBodyTR);
      // create <td> with the correct stats for the created <thead>
      var pokemonTBodyStatsHp = $("<td>");
      pokemonTBodyStatsHp.text(response.stats[0].base_stat); //hp stat
      pokemonTBodyTR.append(pokemonTBodyStatsHp);
      // create <td> with the correct stats for the created <thead>
      var pokemonTBodyStatsAttack = $("<td>");
      pokemonTBodyStatsAttack.text(response.stats[1].base_stat); //attack stat
      pokemonTBodyTR.append(pokemonTBodyStatsAttack);
      // create <td> with the correct stats for the created <thead>
      var pokemonTBodyStatsDefense = $("<td>");
      pokemonTBodyStatsDefense.text(response.stats[2].base_stat); //defense stat
      pokemonTBodyTR.append(pokemonTBodyStatsDefense);
      // create the <td> for related stats
      var pokemonTBodyStatsSpA = $("<td>");
      pokemonTBodyStatsSpA.text(response.stats[3].base_stat); //s.att stat
      pokemonTBodyTR.append(pokemonTBodyStatsSpA);
      // create the <td> for related stats
      var pokemonTBodyStatsSpD = $("<td>");
      pokemonTBodyStatsSpD.text(response.stats[4].base_stat); //s.def stat
      pokemonTBodyTR.append(pokemonTBodyStatsSpD);
      // create the <td> for related stats
      var pokemonTBodyStatsSpd = $("<td>");
      pokemonTBodyStatsSpd.text(response.stats[5].base_stat); //spd stat
      pokemonTBodyTR.append(pokemonTBodyStatsSpd);
      // create the <p> for the game indicies
      var gameIndices = $("<p>");
      gameIndices.addClass("card-text text-center mt-1");
      gameIndices.text(
        "first appeared in Pokemon: " +
          response.game_indices[0].version.name.toUpperCase() +
          " & " +
          response.game_indices[1].version.name.toUpperCase()
      );
      pokemonBodyDiv.append(gameIndices);

      // add a clear button to remove the card
      var clearBTN = $("<button>");
      clearBTN.addClass("close fa fa-window-close float-right");
      clearBTN.attr("type", "button");
      clearBTN.attr("id", "closer");
      clearBTN.attr("data-value", i);
      pokemonBodyDiv.append(clearBTN);
      // Append everything to the row we created that has been added to HTML
      pokemonCol.append(pokemonDiv);
    }
  }

  $("#find-pokemon").on("click", function (event) {
    event.preventDefault();
    console.log("======================");
    // to change the color of the search field back to black
    $("#errorText").hide();
    // name of the pokemon that will be searched in search field
    var name = $("#pokemon-input").val().trim().toLowerCase();
    console.log("This is the name of pokemon: ", name);

    var queryURL = "https://pokeapi.co/api/v2/pokemon/" + name;
    console.log("this is queryURL", queryURL);

    console.log("This is the number for cardCount: ", cardCount);

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        // logic to only allow 6 cards to be displayed on page at once
        console.log("This is the pokemon: " + name, response);
        cardCount++;
        console.log("This is the number for cardCount: ", cardCount);
        if (cardCount > MAX_CARDS) {
          if (cardToReplace >= MAX_CARDS) {
            cardToReplace = 0;
          }
          pokemonCardArray.splice(cardToReplace, 1, response);
          console.log("pokemonCardArry length: ", pokemonCardArray.length);
          renderPokemonCards();
          cardToReplace++;
          return;
        } else if (cardCount <= MAX_CARDS) {
          console.log("This is cardCount: ", cardCount);
          pokemonCardArray.push(response);
          console.log("This is our pokemonCardArray: ", response);
          renderPokemonCards();
        }
      })
      .catch(function (error) {
        console.log("Spelled the Pokemon name wrong, cmon now: ", error);
        // changes the text color to red if error and displays this message underneath pokeball
        $("#errorText").text(
          "Error: pokedex does not include Sword & Shield - check spelling"
        );
        $("#errorText").attr("style", "color:red");
      });

    // logic for Youtube API to show a related video on pokemon searched
    var youtubeKey = "AIzaSyAAjv4XhySAJQNWxgqskqqk9bBRj6DEXj4";
    var ytQueryURL = "https://www.googleapis.com/youtube/v3/search";
    var youtubeVideos = [];
    // searching by value that was entered in search field
    youtubeVideos.push(name);
    console.log("this is youtubeVideos: ", youtubeVideos);

    $.ajax({
      url: ytQueryURL,
      method: "GET",
      data: {
        key: youtubeKey,
        q: youtubeVideos[0],
        part: "snippet",
        maxResults: 1,
        type: "video",
        videoEmbeddable: true,
        videoSyndiacted: true,
      },
    }).then(function (response) {
      // clg the related youtube search
      console.log(response);
      $(".youtube-player").attr(
        "src",
        "https://youtube.com/embed/" + response.items[0].id.videoId
      );
      // create function to render youtube videos based on the youtube videos array that will be emptied after each search so that only the most recent pokemon name will search youtube
      function renderYoutubeVideos() {
        $("#youtubeVideoRow").empty();
        // creating the
        for (var i = 0; i < youtubeVideos.length; i++) {
          var youtubeCol = $("<div>");
          youtubeCol.addClass("col-md-6");
          $("#youtubeVideoRow").append(youtubeCol);
          // create the iframe to hold the youtube video
          var youtubeIframe = $("<iframe>");
          youtubeIframe.addClass("youtube-player youtube-vids mb-3");
          youtubeIframe.attr("type", "text/html");
          youtubeIframe.attr("width", "640");
          youtubeIframe.attr("height", "385");
          youtubeIframe.attr(
            "src",
            "https://youtube.com/embed/" + response.items[0].id.videoId
          );
          youtubeCol.append(youtubeIframe);
        }
      }
      // call the renderYoutubeVideos to only show the last searched name
      renderYoutubeVideos();
    });
  });
  // function on click to remove the card when "x" is clicked
  $(document).on("click", "#closer", function () {
    event.preventDefault();
    var dataValue = $(this).attr("data-value");
    console.log("this is the dataValue: ", dataValue);
    pokemonCardArray.splice(dataValue, 1);
    cardCount--;
    renderPokemonCards();
  });
});
