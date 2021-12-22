var control,
  container,
  renderer,
  scene,
  camera,
  mesh,
  start = Date.now(),
  fov = 30;

window.addEventListener("load", function () {
  container = document.getElementById("container");

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;
  camera.target = new THREE.Vector3(0, 0, 0);

  scene.add(camera);

  material = new THREE.ShaderMaterial({
    uniforms: {
      uScale: { type: "f", value: 8.0 },
      uEdge: { type: "f", value: 0.0 },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });

  var geo = new THREE.PlaneGeometry(30, 30, 32, 32, 32);
  mesh = new THREE.Mesh(geo, material);
  scene.add(mesh);

  control = new (function () {
    this.scale = 1.0;
    this.edge = 0.0;
  })();
  var gui = new dat.GUI();
  gui.add(control, "scale", 1.0, 10.0);
  gui.add(control, "edge", 0.0, 10.0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  render();
});

function render() {
  // Update uniform
  material.uniforms.uScale.value = control.scale;
  material.uniforms.uEdge.value = control.edge;
  // render
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  controls.update();
}
