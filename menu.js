class StateMachine {
  constructor(scenes) {
    this.currentScene = {};
    this.scenes = scenes;
  }

  setup() {
    this.scenes.forEach((scene) => scene.setup());
  }

  draw() {
    this.currentScene.draw();
  }

  keyPressed() {
    this.currentScene.keyPressed();
  }

  keyTyped() {
    this.currentScene.keyTyped();
  }

  setScene(sceneKey) {
    this.currentScene = this.scenes.get(sceneKey);
  }
}
