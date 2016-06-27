var data = [
    [
        "bluibiutloct01",
        "INT Patching",
        "CP-1.txt"
    ],
    [
        "co1mpbiutloct01",
        "DR Patching",
        "CP-2.txt"
    ]

]



$(document).ready(function() {
    var table = $('#example').DataTable(
  //      {data: data}
      {
        "columnDefs": [
          {"width": '300px', "targets":0},
          {"width": '300px', "targets":1},
          {"width": '300px', "targets":2}
        ]
      }
    );
    var socket = io.connect();
    //clear data first
    table.clear().draw();

    socket.on('message', function (message){

        table.row.add( [
          message.serverName,
          message.sequenceName,
          message.serverList
        ]);


    });

   socket.on('endMsg', function (message){

     table.draw();
     //Prevent server side reboot from loading duplicate data
     socket.disconnect();
   });





});//end of big jquery
