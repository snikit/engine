// https://doc.babylonjs.com/snippets/house#walls-mesh

import { Vector3, VertexData } from 'babylonjs';
import { Wall } from '../../architect/models/wall';
import { MeshData } from './custom-mesh.builder';

export class WallBuilder {
  getWall(walls: Wall[], thickness: number, height: number): MeshData {
    const outerData: Vector3[] = [];
    let angle = 0;
    let direction = 0;
    let lineNormal = Vector3.Zero();
    let line = Vector3.Zero();
    let nextLine = Vector3.Zero();

    walls[1].corner.data.subtractToRef(walls[0].corner.data, line);
    walls[2].corner.data.subtractToRef(walls[1].corner.data, nextLine);

    const nbWalls = walls.length;

    for (let w = 0; w <= nbWalls; w++) {
      angle = Math.acos(
        Vector3.Dot(line, nextLine) / (line.length() * nextLine.length())
      );

      direction = Vector3.Cross(nextLine, line).normalize().y;

      lineNormal = new Vector3(line.z, 0, -1 * line.x).normalize();

      line.normalize();

      outerData[(w + 1) % nbWalls] = walls[(w + 1) % nbWalls].corner.data
        .add(lineNormal.scale(thickness))
        .add(line.scale((direction * thickness) / Math.tan(angle / 2)));
      line = nextLine.clone();
      walls[(w + 3) % nbWalls].corner.data.subtractToRef(
        walls[(w + 2) % nbWalls].corner.data,
        nextLine
      );
    }

    const positions: number[] = [];
    const indices: number[] = [];

    for (let w = 0; w < nbWalls; w++) {
      // inner corners base
      positions.push(
        walls[w].corner.data.x,
        walls[w].corner.data.y,
        walls[w].corner.data.z
      );
    }

    for (let w = 0; w < nbWalls; w++) {
      // outer corners base
      positions.push(outerData[w].x, outerData[w].y, outerData[w].z);
    }

    for (let w = 0; w < nbWalls; w++) {
      // base indices
      indices.push(
        w,
        (w + 1) % nbWalls,
        nbWalls + ((w + 1) % nbWalls),
        w,
        nbWalls + ((w + 1) % nbWalls),
        w + nbWalls
      );
    }

    let currentLength = positions.length;

    // inner and outer top corners
    for (let w = 0; w < currentLength / 3; w++) {
      positions.push(positions[3 * w]);
      positions.push(height);
      positions.push(positions[3 * w + 2]);
    }

    currentLength = indices.length;
    // top indices
    for (let i = 0; i < currentLength / 3; i++) {
      indices.push(
        indices[3 * i + 2] + 2 * nbWalls,
        indices[3 * i + 1] + 2 * nbWalls,
        indices[3 * i] + 2 * nbWalls
      );
    }

    for (let w = 0; w < nbWalls; w++) {
      // inner wall indices
      indices.push(
        w,
        w + 2 * nbWalls,
        ((w + 1) % nbWalls) + 2 * nbWalls,
        w,
        ((w + 1) % nbWalls) + 2 * nbWalls,
        (w + 1) % nbWalls
      );
      // outer wall indices
      indices.push(
        ((w + 1) % nbWalls) + 3 * nbWalls,
        w + 3 * nbWalls,
        w + nbWalls,
        ((w + 1) % nbWalls) + nbWalls,
        ((w + 1) % nbWalls) + 3 * nbWalls,
        w + nbWalls
      );
    }

    let normals = [];
    let uvs = [];

    VertexData.ComputeNormals(positions, indices, normals);

    return {
      positions,
      indices,
      normals,
      uvs,
    };
  }
}
