import { Sky } from 'three/examples/jsm/objects/Sky';
import {
  AmbientLight,
  HemisphereLight,
  ShaderMaterial,
  DirectionalLight,
} from 'three';

export default class Lighting {
  public readonly sky = new Sky();
  public readonly hemisphereLight = new HemisphereLight(0xfffcf2, 0xfffcf2, 2);
  public readonly ambientLight = new AmbientLight(0xfffcf2);
  public readonly dirLight = new DirectionalLight(0xfffcf2, 0.1);

  constructor() {
    this.configureSky();
    this.dirLight.position.set(0, 20, -20);
    this.dirLight.lookAt(0, 0, 0);
  }

  private configureSky() {
    const theta = Math.PI * (0.49 - 0.5);
    const phi = 2 * Math.PI * (0.25 - 0.5);
    const distance = 400000;

    this.sky.scale.setScalar(450000);
    const material = this.sky.material as ShaderMaterial;
    material.uniforms.turbidity.value = 10;
    material.uniforms.rayleigh.value = 2;
    material.uniforms.mieCoefficient.value = 0.005;
    material.uniforms.mieDirectionalG.value = 0.8;
    material.uniforms.luminance.value = 1;
    material.uniforms.sunPosition.value = {
      x: distance * Math.cos(phi),
      y: distance * Math.sin(phi) * Math.sin(theta),
      z: distance * Math.sin(phi) * Math.cos(theta),
    };
  }
}
