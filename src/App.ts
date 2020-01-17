import { Group, Scene, TextureLoader, WebGLRenderer, Fog } from 'three';
import style from './style';
import Ground from './Ground';
import Lighting from './Lighting';
import Cybertruck from './Cybertruck';
import Buildings from './Buildings';
import Navigation from './Navigation';

export class App {
  private readonly cybertruck: Cybertruck;
  private readonly buildings: Buildings;
  private readonly renderer = new WebGLRenderer({ antialias: true });
  private readonly scene = new Scene();
  private readonly textureLoader = new TextureLoader();
  private readonly navigation = new Navigation(this.renderer.domElement);

  constructor(cybertruckModel: Scene, buildingsModel: Group) {
    this.cybertruck = new Cybertruck(cybertruckModel);
    this.buildings = new Buildings(buildingsModel);

    this.scene.fog = new Fog(0x000, 10, 5000);
    this.renderer.physicallyCorrectLights = true;
    this.animate();
    this.addCanvasDomElement();
    this.addLighting();
    this.addGround();
    this.scene.add(this.cybertruck.object);
    // this.scene.add(this.cybertruck.frontWheel);
    // this.scene.add(this.cybertruck.backWheel);
    this.scene.add(this.buildings.object);
    this.navigation.camera.lookAt(this.cybertruck.object.position);
    this.navigation.orbitControls.target = this.cybertruck.object.position;
  }

  private addCanvasDomElement() {
    const webGlCanvasId = 'webglCanvas';
    const webglCanvas = document.getElementById(webGlCanvasId);

    if (!webglCanvas) {
      throw new Error(`Html element with id ${webGlCanvasId} not found.`);
    }

    style(webglCanvas, { height: '100%', width: '100%' });
    webglCanvas.appendChild(this.renderer.domElement);
    this.updateDimensions();
    window.addEventListener('resize', () => {
      this.updateDimensions();
    });
  }

  private updateDimensions() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.navigation.camera.aspect = window.innerWidth / window.innerHeight;
    this.navigation.camera.updateProjectionMatrix();
  }

  private addLighting() {
    const lighting = new Lighting();
    this.scene.add(lighting.ambientLight);
    this.scene.add(lighting.dirLight);
    this.scene.add(lighting.hemisphereLight);
    this.scene.add(lighting.sky);
  }

  private addGround() {
    const ground = new Ground(this.textureLoader);
    this.scene.add(ground.mesh);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.navigation.camera.lookAt(this.cybertruck.object.position);
    this.renderer.render(this.scene, this.navigation.camera);
  }
}
