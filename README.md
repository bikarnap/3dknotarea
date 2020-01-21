# Area calculation of a 3D knot object
This project presents a JavaScript script to calculate the surface area of a 3D-knot. It is very simple, and the scripts are mainly manipulation of strings.

* Enter the command node area.js <file.obj> to calculate the area of a 3D-knot represented by an .obj file
* For example: node area.js mygoodknot.obj

## Area calculated using Heron's formula
* First one-half of the perimeter is calculated as s = (a + b + c)/2 ; where a, b, and c are the three sides of a triangle.
* Then Area of a triangle is given as A = (s(s-a)(s-b)(s-c))^(1/2)
* Total surface area = A x total number of triangles in the knot

# Node Modules
* fs
* vector-3
