import { Scene } from 'babylonjs';
import { WallBuilder } from './wall.builder';
import { CustomMeshBuilder, MeshData } from './custom-mesh.builder';
import { Corner } from '../../architect/models/corner';
import { Wall } from '../../architect/models/wall';

export class PlanBuilder {
  private wallBuilder: WallBuilder;
  private customMeshBuilder: CustomMeshBuilder;

  constructor(scene: Scene) {
    this.wallBuilder = new WallBuilder();
    this.customMeshBuilder = new CustomMeshBuilder(scene);
  }

  addDemoMesh() {
    const testData = [-5, 0, 5, 0, 5, 6, 2, 6, 2, 9, -5, 9];

    const corners: Corner[] = [];

    for (let b = 0; b < testData.length / 2; b++) {
      corners.push(new Corner(testData[2 * b], testData[2 * b + 1]));
    }

    const walls: Wall[] = [];

    corners.forEach((corner) => {
      walls.push(new Wall(corner));
    });

    const meshData: MeshData = this.wallBuilder.getWall(walls, 0.3, 5);

    return this.customMeshBuilder.addCustomMesh('custom', meshData);
  }
}
