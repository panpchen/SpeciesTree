import AudioManager from "./AudioManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class Demo extends cc.Component {
  @property(cc.Node)
  orangeBtns: cc.Node = null;
  @property(cc.Node)
  blueBtns: cc.Node = null;
  onLoad() {
    this.orangeBtns.children.forEach((node) => {
      node.on(
        "click",
        () => {
          AudioManager.playClickSound();
        },
        this
      );
    });

    this.blueBtns.children.forEach((node) => {
      node.on(
        "click",
        () => {
          AudioManager.playClickSound();
        },
        this
      );
    });
  }
}
