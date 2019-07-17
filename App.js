navigator.getUserMedia = navigator.getUserMedia||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

const video = document.querySelector("#video");
const canvas = document.querySelector('#canvas');
const audio = document.querySelector('#audio');
const context = canvas.getContext('2d');
let model;

console.log("NAVIGATOR OBJECT: "+navigator);
handTrack.startVideo(video)
   .then(status=>{
       if(status){
           navigator.getUserMedia({video:{}},stream=>{
               video.srcObject = stream;
                setInterval(runDetection,1000);
           },
           err=>console.log(err))
       }
   })

   function runDetection() {
       model.detect(video).then(predictions =>{
           console.log(predictions);
           if(predictions[0]&&predictions[0].hasOwnProperty("score")&&predictions[0].score>0)
           {
               document.getElementById("audio").play();
               console.log("detected!!!");
               document.getElementById("video_div").style.backgroundColor = "lightsalmon";
           }
           else
           {
            document.getElementById("video_div").style.backgroundColor = "white";
           }
       })
   }

   const modelParams = {
       flipHorizontal: true, 
       imageScaleFactor: 0.7,  
       maxNumBoxes: 2,        
       iouThreshold: 0.5,      
       scoreThreshold: 0.81,   
    }

handTrack.load(modelParams).then(lmodel=>{
   model = lmodel;
})