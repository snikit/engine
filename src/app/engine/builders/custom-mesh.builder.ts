import { Mesh, Scene, VertexData } from 'babylonjs';

export interface MeshData {
  positions: number[];
  indices: number[];
  normals: number[];
  uvs: any[];
}

export class CustomMeshBuilder {
  constructor(private scene: Scene) {}

  addCustomMesh(name: string, data: MeshData) {
    const customMesh = new Mesh(name, this.scene);

    const vertexData = new VertexData();
    vertexData.positions = data.positions;
    vertexData.indices = data.indices;
    vertexData.normals = data.normals;
    vertexData.uvs = data.uvs;


    console.log(this.scene)
  }
}
