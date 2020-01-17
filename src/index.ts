import { App } from './App';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import buildings from './Buildings/model.fbx';
import cybertruck from './Cybertruck/model.gltf';
import { Group, Scene } from 'three';

const fbxLoader = new FBXLoader();
const gltfLoader = new GLTFLoader();
let buildingsModel: Group;
let cybertruckModel: Scene;
fbxLoader.load(buildings, object => {
  buildingsModel = object;
});
gltfLoader.load(cybertruck, object => {
  cybertruckModel = object.scene;
});

const readyCheckLoop = setInterval(() => {
  if (buildingsModel && cybertruckModel) {
    new App(cybertruckModel, buildingsModel);
    clearInterval(readyCheckLoop);
  }
}, 500);
