img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    Model = ml5.objectDetector('cocossd', loaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status = true) {
        Model.detect(video, gotresult);
        r = random(255);
        g = random(255);
        b = random(255);
        console.log(r, g, b);


        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("object_no").innerHTML = "Number of Objects = " + objects.length;
            percent = floor(objects[i].confidence * 100);
            
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function loaded() {
    console.log("COCO Is Ready");
    status = true;
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    } 
    console.log(results);
    objects = results;
}