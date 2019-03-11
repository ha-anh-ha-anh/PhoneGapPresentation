/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
   // Application Constructor
   initialize: function () {
      this.bindEvents();
   },
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function () {
      document.addEventListener('deviceready', this.onDeviceReady, false);
   },
   // deviceready Event Handler
   //
   // The scope of 'this' is the event. In order to call the 'receivedEvent'
   // function, we must explicitly call 'app.receivedEvent(...);'
   onDeviceReady: function () {
      app.receivedEvent('deviceready');
   },
   // Update DOM on a Received Event
   receivedEvent: function (id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');
   }
};

function createFile(storageType) {
   var type = window.TEMPORARY;
   if (storageType === 1) {
      type = window.PERSISTENT;
   }
   var size = 5 * 1024 * 1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   //Callbacks
   function successCallback(fs) {
      fs.root.getFile('log.txt', { create: true, exclusive: true }, function (fileEntry) {
         alert('File creation successfull!' +
            "\nDirectory name: " + fs.root.fullPath
            + "\nFile: " + fileEntry.toURL());
      }, errorCallback);
   }
   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function writeFile(storageType) {
   var type = window.TEMPORARY;
   if (storageType === 1) {
      type = window.PERSISTENT;
   }
   var size = 5 * 1024 * 1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   //Callback
   function successCallback(fs) {
      fs.root.getFile('log.txt', { create: true }, successGetFileCallback, errorCallback);
   }

   //Callback for get file
   function successGetFileCallback(fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
         fileWriter.onwriteend = function (e) {
            alert('Write completed.');
         };

         fileWriter.onerror = function (e) {
            alert('Write failed: ' + e.toString());
         };
         var myText = document.getElementById("textarea").value;
         var blob = new Blob([myText], { type: 'text/plain' });

         fileWriter.write(blob);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}

function readFile(storageType) {
   var type = window.TEMPORARY;
   if (storageType === 1) {
      type = window.PERSISTENT;
   }
   var size = 5 * 1024 * 1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   //Callback
   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, successGetFileCallback, errorCallback);
   }

   function successGetFileCallback(fileEntry) {
      fileEntry.file(
         //success callback
         function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };
            reader.readAsText(file);
         },
         //error callback
         errorCallback)
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}

function listDir() {
   path = cordova.file.applicationDirectory + "www/audio/";
   // alert(path);
   window.resolveLocalFileSystemURL(path, successResolveLocalCallback, errorCallback);
   
   //Callback
   function successResolveLocalCallback(dirEntry) {
      var reader = dirEntry.createReader();
      reader.readEntries(successReadEntryCallback, errorCallback);
   }

   function successReadEntryCallback(entries) {
      var s = "Files in Directory:\n";
      for (i = 0; i < entries.length; i++) {
         s += entries[i].toURL() + "\n";
      }
      alert(s);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}

function removeFile(type) {
   var saveType = window.TEMPORARY;
   if (type === 1) {
      saveType = window.PERSISTENT;
   }
   var size = 5 * 1024 * 1024;
   window.requestFileSystem(saveType, size, successCallback, errorCallback)

   //Callback
   function successCallback(fs) {
      fs.root.getFile('log.txt', { create: false }, function (fileEntry) {

         fileEntry.remove(function () {
            alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}