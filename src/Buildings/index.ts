import { Group } from 'three';

export default class Buildings {
  public readonly object: Group;

  constructor(model: Group) {
    model.children[1].position.set(0, 0, -550);
    model.children[2].position.set(400, 0, -550);
    model.children[3].position.set(-300, 0, -550);
    model.children[4].position.set(400, 0, 550);
    model.children[5].position.set(0, 0, 550);
    model.children[6].position.set(-300, 0, 550);
    model.children[7].position.set(-600, 0, 550);
    model.children[8].position.set(800, 0, 550);
    this.object = model;
  }
}
