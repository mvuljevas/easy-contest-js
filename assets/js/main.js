//Contest vars
var winner;
var pnt_winner;
var walkers    = [];
var walker_id  = 1;

//Randomize the winner
$(".randomize").click(function() {
  if ( $.isEmptyObject(walkers) != true) {
    var random_pick = Math.floor(Math.random() * walkers.length);

    winner      = walkers[random_pick].walker;
    pnt_winner  = $('.the-winner').html(winner);

    $('.winner-name').removeClass('active');
    $('.overlay-confeti').removeClass('active');

    UIkit.notification('¡Aguarda mientras el universo escoge un ganador!', {status: 'primary', timeout: 2500});

    $('.randomize').html('Haciendo magia...');

    setTimeout(function(){
      $('.winner-name').addClass('active');
      $('.overlay-confeti').addClass('active');
      $('.randomize').html('¡Otra Vez!');
      confetti.start();
    }, 3000);

  } else {
    //console.log('No hay Participantes');
    UIkit.notification('No hay Participantes', {status: 'danger'});
  }
});


$(".overlay-confeti").click(function() {
    $('.winner-name').removeClass('active');
    $('.overlay-confeti').removeClass('active');
    confetti.stop();
});

//Add Walker
$('#walker-add').on('click',function(e){

  //Get walkers names
  var walker_names = $('#parcipant-name').val();

  if ( (walker_names != '') ){

    // Clean Div
    $('.walkers-list').fadeOut(50);
    $('.walkers-list').html('');

    setTimeout(function(){
      $('.winner-name').removeClass('active');
      $('.overlay-confeti').removeClass('active');
    }, 200);

    var lines = $('#parcipant-name').val().split(/\n/);
    for (var i=0; i < lines.length; i++) {
      if (/\S/.test(lines[i])) {

        //Set each walker name
        var walker_name = $.trim(lines[i]);

        //Push walker into the object
        walkers.push( {id: walker_id, walker: walker_name} );
        // console.log( walker_name + ' joined the contest!' );
      }

      walker_id ++;
    }

    $('.walkers-list').fadeIn(200);
    //Print walkers into a list
    for (var w=0; w < walkers.length; w++) {
      $('.walkers-list').append('<p>' + walkers[w].walker + '</p>');
    }


    //Clean form
    $('#parcipant-name').val('');

    if ( walkers.length > 8 ){
      $('.walkers-list').addClass('dudes');
    } else {
      $('.walkers-list').removeClass('dudes');
    }

  } else {
    //console.log('Walker info cant\'t be empty.');
    UIkit.notification('¡El campo de participantes no puede estar vacío!', {status: 'danger'});
  }

  e.preventDefault();
})

//UI Effects
// UIkit.util.ready(function () {
//     var bar = document.getElementById('js-progressbar');
//     var animate = setInterval(function () {
//         bar.value += 10;
//         if (bar.value >= bar.max) {
//             clearInterval(animate);
//         }
//     }, 1000);
// });


// $(function () {
//     $("#upload").bind("click", function () {
//         var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
//         if (regex.test($("#fileUpload").val().toLowerCase())) {
//             if (typeof (FileReader) != "undefined") {
//                 var reader = new FileReader();
//                 reader.onload = function (e) {
//                     var table = $("<table />");
//                     var rows = e.target.result.split("\n");
//                     for (var i = 0; i < rows.length; i++) {
//                         var row = $("<tr />");
//                         var cells = rows[i].split(",");
//                         if (cells.length > 1) {
//                             for (var j = 0; j < cells.length; j++) {
//                                 var cell = $("<td />");
//                                 cell.html(cells[j]);
//                                 row.append(cell);
//                             }
//                             table.append(row);
//                         }
//                     }
//                     $("#dvCSV").html('');
//                     $("#dvCSV").append(table);
//                 }
//                 reader.readAsText($("#fileUpload")[0].files[0]);
//             } else {
//                 alert("This browser does not support HTML5.");
//             }
//         } else {
//             alert("Please upload a valid CSV file.");
//         }
//     });
// });
