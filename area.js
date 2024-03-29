/* Surface area calculation of a 3D knot object */

// Solution using modules fs and vector-3
var fs = require('fs');
var vector3 = require('vector-3');

var vertices = [['0', '0', '0']]; // origin vertex of triangle

// Initializing x-, y-, and z-coordinates for any vertex
var xCoord = [0];
var yCoord = [0];
var zCoord = [0];

// Initially all the three vertices are empty
var vertexA = "";
var vertexB = ""; 
var vertexC = "";

var totalSurfaceArea = 0; // initially the surface are is 0
var file = process.argv;
var readFile = fs.readFile(file[2], 'utf8', (error, data) => {
    if(error) console.log(error.name, error.message);
    var tokens = data.split(/\s+/); 

    var fposV = tokens.indexOf('v'); // first oocurance of 'v' in the .obj file
    var fposF = tokens.indexOf('f'); // first occurance of 'f' in the .obj file

    // loop to store the vertex coordinates
    for(var i = fposV; i < tokens.length; i++) {
        if(tokens[i] == 'v')
            vertices.push([tokens[i+1], tokens[i+2], tokens[i+3]]);
        
    }
    
    // loop to map the face indices with their corresponding vertices 
    for(var j = fposF; j < tokens.length; j++) {
        if(tokens[j] === 'f') {
            for(var k = 1; k < vertices.length; k++) {
                if(tokens[ j + 1 ] == k) {
                    xCoord[1] = parseFloat(vertices[k][0]);
                    yCoord[1] = parseFloat(vertices[k][1]);
                    zCoord[1] = parseFloat(vertices[k][2]);
                    vertexA = new vector3(xCoord[1], yCoord[1], zCoord[1]);
                    //console.log(vertexA)
                }

                if(tokens[ j + 2 ] == k) {
                    xCoord[2] = parseFloat(vertices[k][0]);
                    yCoord[2] = parseFloat(vertices[k][1]);
                    zCoord[2] = parseFloat(vertices[k][2]);
                    vertexB = new vector3(xCoord[2], yCoord[2], zCoord[2]);
                }

                if(tokens[ j + 3 ] == k) {
                    xCoord[3] = parseFloat(vertices[k][0]);
                    yCoord[3] = parseFloat(vertices[k][1]);
                    zCoord[3] = parseFloat(vertices[k][2]);
                    vertexC = new vector3(xCoord[3], yCoord[3], zCoord[3]);
                }

                // Once three vertices are found, the lengths of the sides of triange are calculate
                if(vertexA != "" && vertexB != "" && vertexC != ""){
                    var xAB = vertexA['x'] - vertexB['x'];
                    var xAC = vertexA['x'] - vertexC['x'];
                    var xBC = vertexB['x'] - vertexC['x'];

                    var yAB = vertexA['y'] - vertexB['y'];
                    var yAC = vertexA['y'] - vertexC['y'];
                    var yBC = vertexB['y'] - vertexC['y'];

                    var zAB = vertexA['z'] - vertexB['z'];
                    var zAC = vertexA['z'] - vertexC['z'];
                    var zBC = vertexB['z'] - vertexC['z'];

                    var vectorAB = new vector3(xAB, yAB, zAB);
                    var vectorAC = new vector3(xAC, yAC, zAC);
                    var vectorBC = new vector3(xBC, yBC, zBC);

                    var lengthAB = vectorAB.length();
                    var lengthAC = vectorAC.length();
                    var lengthBC = vectorBC.length();


                    totalSurfaceArea += areaOfATriangle(lengthAB, lengthAC, lengthBC);

                    vertexA = vertexB = vertexC = ""; 

                } 
            }
        }
    }
  console.log(totalSurfaceArea);
})

// function to calculate the area of a triangle  
const areaOfATriangle = (a, b, c) => {
    var s = (a + b + c) / 2;
    var area = (s * (s - a)*(s - b)*(s - c))**(1/2);
    return area;
}
