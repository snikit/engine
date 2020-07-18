import {
  Scene,
  HemisphericLight,
  Light,
  Vector3,
  MeshBuilder,
  Material,
  GroundMesh,
  Mesh,
  StandardMaterial,
  Camera,
  ArcRotateCamera,
  TargetCamera,
  FreeCamera,
  Color3,
  Frustum,
} from 'babylonjs';
import { EngineAdapter } from './engine.adapter';

export class SceneAdapter {
  private scene: Scene;
  private light: Light;
  private ground: Mesh;
  private camera: TargetCamera;

  constructor(private engine: EngineAdapter) {
    this.scene = new Scene(this.engine.getEngine());
  }

  addTestStuff() {
    const frustumPlanes = Frustum.GetPlanes(this.scene.getTransformMatrix());

    let isInFrustum = true;
    let currentPos = 0;

    const addBox = (position) => {
      const box = MeshBuilder.CreateBox('box', { size: 0.8 }, this.scene);
      box.position.x = currentPos;
      box.position.y = 1;
      box.showBoundingBox = true;
      box.computeWorldMatrix(true);
      isInFrustum = box.isCompletelyInFrustum(frustumPlanes);

      if (isInFrustum === false) {
        box.visibility = 0.5;
      }
    };

    while (
      isInFrustum &&
      currentPos < 5 /* can break out of loop early, too */
    ) {
      addBox(currentPos);
      currentPos++;
    }

    currentPos = -1;
    isInFrustum = true;
    while (
      isInFrustum &&
      currentPos > -5 /* can break out of loop early, too */
    ) {
      addBox(currentPos);
      currentPos--;
    }

    return this;
  }

  setCamera() {
    this.camera = new FreeCamera(
      'camera1',
      new Vector3(0, 10, -10),
      this.scene
    );

    this.camera.setTarget(Vector3.Zero());


    return this;
  }

  addLight() {
    this.light = new HemisphericLight(
      'light1',
      new Vector3(0, 1, 0),
      this.scene
    );

    this.light.intensity = 0.7;

    return this;
  }

  addGround() {
    this.ground = Mesh.CreateGround('ground', 6, 6, 2, this.scene);

    // const material = new StandardMaterial('groundMaterial', this.scene);
    // material.alpha = 1;
    // material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);

    // this.ground.material = material;

    return this;
  }

  render() {
    this.scene.render();
  }
}
