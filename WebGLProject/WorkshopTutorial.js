/************************************************************************************
 *  This file contains code snippets that can be copied and pasted into
 *  the index.html file when working through the workshop. This code is not intended
 *  to be exemplary of good programming or web development practices. It has no
 *  error handling and a C like structure. It is the minimal code required for this
 *  demonstration.
 * 
 *  The complete code is available in WorkshopFinal.html 
 * **********************************************************************************/

// These first three lines are HTML, not JavaScript and should be pasted inside the
// <body> tag before the <script> tag. These lines source the required three.js libraries
// that will allow creation of a Collada file loader, a simple control set, and the core
// threejs library that will allow access to WebGL. These files are located in the three
// sub directory of this project.

    <script src="three/three.js"></script>
    <script src="three/OrbitControls.js"></script>
    <script src="three/ColladaLoader.js"></script>

// The rest of the source code in this document will be placed inside the <script> tags
// in index.html. Global variables must be declared first. These globals declare the
// scene into which all objects required for rendering will be placed, a camera, a
// renderer and a control set.

    var scene,
    cam,
    renderer,
    controls;

// The script needs an entry point, a function that is called directly. The script
// begins by calling main() which is defined after it is called.

    main();

// The definition of main(). main() calls two functions which also are defined in the
// script: initializeScene() which instantiates and initializes all the required objects,
// and updateLoop() which takes user input, updates the scene, and calls a render
// function.

    function main(){
        initializeScene();
        updateLoop();
    }

// The definition of initializeScene() is the most significant block in the script.
// Begin by creating a skeleton for the function definition. The subsequent numbered
// sections cover the function definition in chunks which will be pasted in between the
// braces.

    function initializeScene(){
        //subsequent sections pasted here
    }

// 1) Initialize the scene variable with a scene object.

    scene = new THREE.Scene();

// 2) Initialize the camera variable and set its position.
// The arguments supplied to the camera constructor are the field of view, aspect
// ratio, near clip plane, and far clip plane. Any surfaces that fall outside of the
// near and far clip planes will be discarded immediately.
// The position arguments are X, Y and Z.

    cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    cam.position.set(3, 2, 3);

// 3) Initialize the renderer and enable antialiasing
// Set the renderer size the same as the interior of the browser window.
// Set the pixel ratio. Different devices and displays have different pixel ratios. This
// line determines the pixel ratio for the current display device. An incorrect pixel
// ratio may result in an image that appears squashed or stretched.
// Set the clear color. Clear color is the background color of the renderer window.
// It is an RGB+Alpha value expressed here as a hex value for RGB and a float for Alpha.
// 0x525252 produces a middle grey color. An alpha value of 1 is opaque. Setting alpha to
// less that 1 will create a transparent background exposing the HTML document behind the
// renderer. 

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x525252, 1);

// 4) Initialize the controls, attach the controls to camera and add controls to the
// renderer DOM element.
// Enable damping adds weight and drag to the controls that makes the object being
// manipulated feel a bit more physical and tactile.
// Target is the origin around which the controls will orbit. Because the controls are
// attached to the camera on creation, the specified position also serves as a target for
// the camera. The position X=0, Y=1.16, Z=0 is not arbitrary. It is approximately the
// center of the hurricane object the will be placed in the scene.
// An event listener called change is added. When triggered, it will call a renderScene()
// function to be defined later in the script.

    controls = new THREE.OrbitControls(cam, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0.0, 1.16, 0.0);
    controls.addEventListener('change', renderScene);

// 5) Create two lights and add them to the scene.
// Only one light is required to illuminate a scene, however, to avoid casting a dark
// shadow over one side of the model, an ambient light is also created.
// Ambient lights have no origin or direction and will light an object uniformly from any
// angle. The ambient light color is a middle gray expressed in hexadecimal.
// A point light casts light in all directions from a specific position and can create
// sharp highlights given a material with strong reflectance. The ambient light's
// arguments are color (pure white here), intensity, distance and decay. With these
// settings, the point light will fall off to 0 over 50 world units, linearly.

    var ambLight = new THREE.AmbientLight(0xB8B8B8);
    scene.add(ambLight);
    var keyLight = new THREE.PointLight(0xFFFFFF, 1, 50, 1);
    keyLight.position.set(0,5,3);
    scene.add(keyLight);

// 6) Create an axis at the center of the world.
// This axis, commonly called a jack, is a marker placed at the center of the world with
// color coded lines delineating the X, Y and Z axes of the space.
// This object is unnecessary and only added for the purposes of illustrating the
// coordinate space of this visualization.

    var jack = new THREE.AxesHelper(3);
    scene.add(jack);

// 7) Lastly for the initializeScene() function, the renderer is added to the page

    document.body.appendChild(renderer.domElement);

// In the main() function definition a function called updateLoop() was called. updateLoop()
// needs to be defined as well.
// updateLoop() first calls requestAnimationFrame() with itself as a callback.
// requestAnimationFrame() is a browser function to sequence animation. This loop
// repeatedly requests animation frames and updates the input from controls. This
// is required for the drag effect on the controls to allow the camera to slow to a stop
// after input.

    function updateLoop(){
        requestAnimationFrame(updateLoop);
        controls.update();
    }

// When controls were initialized, a callback function called renderScene() was specified
// for the eventListener. Anytime a change is detected in input, renderScene() will be
// called. renderScene() should be defined next.
// renderScene() simply calls the render function from the renderer object and specifies the
// scene object to be rendered using the camera as it's projection.

    function renderScene(){
        renderer.render(scene, cam);
    }

// At this point the index.html can be loaded into a browser and a full window grey
// background should display with a red green and blue axis in the center.
// A user should be able to orbit, pan and zoom the scene with the left, right and middle
// mouse buttons.

// The final task is to load the hurricane data to be visualized. The data is a file in the
// Data directory of this project called Katrina.dae. This is a Collada file. Collada is an
// open xml based format for storing 3D scene data.
// A function needs to be defined to load the data and the function will need to be called
// from within initializeScene().

// Frist provide a skeleton for loadMesh()

    function loadMesh(){
        // Next 3 sections will be pasted here
    }

// 1) Declare a loader object to load the data. Because the data is stored in a Collada
// file the ColladaLoader is used.

    var loader = new THREE.ColladaLoader();

// 2) Create a material for the object. It is possible to write Vertex and Fragment
// shaders and create specialized materials, but for this application using a basic
// Lambert material supplied by three.js is sufficient.
// The new material is named hurricaneMaterial and vertexColors on the material are set to
// 1. This enables the material to show color data that is applied to the vertices of the
// model. The Katrina.dae model has wind magnitude data encoded 

    var hurricaneMaterial = new THREE.MeshLambertMaterial();
    hurricaneMaterial.vertexColors = 1;

// 3) Load the Katrina.dae file.
// From the loader object the load() function is called. The Katrina.dae file in Data is
// specified as the object to be loaded. The second argument to load() is an inline function.
// This function produces an object named collada that holds the contents of the Katrina.dae
// Collada file. The collada object holds an array of the objects the Collada file
// contains. These objects may be lights, cameras, animations, entire scenes, not just meshes.
// In this example the only object in the Katrina.dae Collada file is the hurricane mesh
// object. The mesh object can be accessed by getting the first child [0] of the array
// contained in the collada object because it is the only object in the file.
// The material on child[0] is set to the hurricaneMaterial created earlier.
// child[0] is added to the scene and then the scene is rendered.
// If the render function is not called immediately the mesh will not appear until a
// user supplies input.

    loader.load('Data/Katrina.dae', function(collada) {
                            collada.scene.children[0].material = hurricaneMaterial;
                            scene.add(collada.scene.children[0]);
                            renderScene();
                        }
    );

// Having defined the loadMesh() function, it now needs to be called from within
// initializeScene(). Placing it just above the line that appends the renderer to the
// document body is a likely place to call the loadMesh() function.

    loadMesh();

// Loading index.html in a browser should now display the hurricane model, color coded
// with wind magnitude. A user should be able to orbit, pan and zoom the scene using the
// left, right and middle mouse buttons.