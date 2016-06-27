//use filesystem module
var myfs = require('fs');
var pathBaseline = 'd:/SourceSum/ServerListAudit/baseline';
//Read baseline
var dirList = myfs.readdirSync(pathBaseline);
var length = dirList.length;
//Convert Them into object

//create a class
var ServerRecord = function(serverName, sequenceName, serverList) {
  this.serverName = serverName;
  this.sequenceName = sequenceName;
  this.serverList = serverList;
};

ServerRecord.prototype.printObject = function () {
  console.log('{'+ 'servername:' + this.serverName + ','
                 + 'sequenceName:' + this.sequenceName + ','
                 + 'serverlist:' + this.serverList
             +'}'
  );
}




for (i = 0; i < length; i++)
{
  //dirList[0];
  if( myfs.statSync(pathBaseline + '/' + dirList[i]).isDirectory() )
  {
    //console.log(pathBaseline + '/' + dirList[i]);
    //go deeper
    var subDirList = myfs.readdirSync(pathBaseline + '/' + dirList[i]);
    var lengthSub = subDirList.length;
    for(j = 0; j < lengthSub; j++)
    {
      if( myfs.statSync(pathBaseline + '/' + dirList[i] + '/' + subDirList[j]).isFile && subDirList[j].match(/.*\.txt$/) )
      {
        //console.log(pathBaseline + '/' + dirList[i] + '/' + subDirList[j] );
        var srvList = myfs.readFileSync(pathBaseline + '/' + dirList[i] + '/' + subDirList[j], 'ucs-2').trim().split(`\r\n`);
        lengthSrvList = srvList.length;
        for(k = 0; k <lengthSrvList; k++)
        {
          //console.log(pathBaseline + '/' + dirList[i] + '/' + subDirList[j] + ':' + srvList[k] );
           new ServerRecord(srvList[k], dirList[i], subDirList[j]).printObject();
        }


      }
    }

  }
}


//use array push to generate listen
//test = []; test.push('some');
