import {
  Mesh,
  MeshStandardMaterial,
  PlaneBufferGeometry,
  RepeatWrapping,
  TextureLoader,
} from 'three';
import colTex from './asphalt/col.jpg';
import dispTex from './asphalt/disp.jpg';
import nrmTex from './asphalt/nrm.jpg';
import rghTex from './asphalt/rgh.jpg';

export default class Ground {
  public readonly mesh: Mesh;

  constructor(textureLoader: TextureLoader) {
    const map = textureLoader.load(colTex);
    const displacementMap = textureLoader.load(dispTex);
    const normalMap = textureLoader.load(nrmTex);
    const roughnessMap = textureLoader.load(rghTex);

    [map, displacementMap, normalMap, roughnessMap].forEach(tex => {
      tex.wrapS = tex.wrapT = RepeatWrapping;
      tex.repeat.set(80, 80);
    });

    const groundMaterial = new MeshStandardMaterial({
      map,
      displacementMap,
      normalMap,
      roughnessMap,
    });

    this.mesh = new Mesh(new PlaneBufferGeometry(20000, 20000), groundMaterial);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
  }
}
