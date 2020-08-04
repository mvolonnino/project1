$(document).ready(function () {
  $("#find-pokemon").on("click", function () {
    console.log("Clicking the Pokemon Search: ", this);
    event.preventDefault();

    var name = $("#pokemon-input").val().trim().toLowerCase();
    console.log("This is the name of pokemon: ", name);

    var queryURL = "https://pokeapi.co/api/v2/pokemon/" + name;
    console.log("this is queryURL", queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log("This is the pokemon: " + name, response);
      // create a row to add pokemon cards too
      var pokemonCol = $("<div>");
      pokemonCol.addClass("col-xs-3 m-1");
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
      pokemonBodyDiv.attr("style", "height:15rem");
      pokemonDiv.append(pokemonBodyDiv);
      // create the title where we use the var name to show for each card
      var pokemonBodyTitle = $("<h4>");
      pokemonBodyTitle.addClass("card-title text-center");
      pokemonBodyTitle.text(name);
      pokemonBodyDiv.append(pokemonBodyTitle);
      // create the p tag to hold the type(s) we take from our ajax call (response)
      var pokemonBodyTextType = $("<p>");
      pokemonBodyTextType.addClass("card-text text-center mb-0");
      var type = response.types.map((type) => type.type.name).join(", ");
      pokemonBodyTextType.text("type: " + type);
      pokemonBodyDiv.append(pokemonBodyTextType);
      // create the p tag to hold the ablitlies
      var pokemonBodyTextAbilities = $("<p>");
      pokemonBodyTextAbilities.addClass("card-text text-center");
      var ability = response.abilities
        .map((ability) => ability.ability.name)
        .join(" & ");
      pokemonBodyTextAbilities.text("abilities: " + ability);
      pokemonBodyDiv.append(pokemonBodyTextAbilities);
      // create the table element to put base stats in
      var pokemonBodyStatsTable = $("<table>");
      pokemonBodyStatsTable.addClass("table text-center");
      pokemonBodyDiv.append(pokemonBodyStatsTable);
      // create table head elemnt for base stats
      var pokemonBodyStatsTableHead = $("<thead>");
      pokemonBodyStatsTable.append(pokemonBodyStatsTableHead);
      // create the row for the head
      var pokemonBodyStatsTableTR = $("<tr>");
      pokemonBodyStatsTableHead.append(pokemonBodyStatsTableTR);
      // create the th for the label stat
      // var tableHeadStat = $("<th>");
      // tableHeadStat.attr("scope", "col");
      // pokemonBodyStatsTableTR.append(tableHeadStat);
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
      // var pokemonBodyStatsTableThSpAttack = $("<th>");
      // pokemonBodyStatsTableThSpAttack.attr("scope", "col");
      // pokemonBodyStatsTableThSpAttack.text(response.stats[3].stat.name); //sp-attack
      // pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThSpAttack);
      // // create th for sp-defense
      // var pokemonBodyStatsTableThSpDefense = $("<th>");
      // pokemonBodyStatsTableThSpDefense.attr("scope", "col");
      // pokemonBodyStatsTableThSpDefense.text(response.stats[4].stat.name); //sp-defense
      // pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThSpDefense);
      // // create th for speed
      // var pokemonBodyStatsTableThSpeed = $("<th>");
      // pokemonBodyStatsTableThSpeed.attr("scope", "col");
      // pokemonBodyStatsTableThSpeed.text(response.stats[5].stat.name); //speed
      // pokemonBodyStatsTableTR.append(pokemonBodyStatsTableThSpeed);

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

      // add a clear button to remove the card
      var clearBTN = $("<button>");
      clearBTN.addClass("close fa fa-window-close float-right");
      clearBTN.attr("type", "button");
      clearBTN.attr("id", "closer");
      pokemonBodyDiv.append(clearBTN);
      // Append everything to the row we created that has been added to HTML
      pokemonCol.append(pokemonDiv);
    });
  });
  // function on click to remove the card when "x" is clicked
  $(document).on("click", "#closer", function () {
    event.preventDefault();
    console.log("this is what we click: ", this);
    $(this).parent().parent().parent().hide();
  });
});
