import AudioManager from "./AudioManager";

const YellowConfigs = [];

const BlueConfigs = [
  `奥陶纪生命大灭绝——“有颌鱼类进化的序幕”`,
  `泥盆纪生物大灭绝——“两栖动物时代”`,
  `二叠纪生物大灭绝——“爬行动物繁盛时代”`,
  `三叠纪生物大灭绝——“恐龙时代”`,
  `白垩纪生物大灭绝——“哺乳动物时代”`,
];

const OrangeConfigs = [];

const { ccclass, property } = cc._decorator;
@ccclass
export default class Demo extends cc.Component {
  @property(cc.Node)
  orangeBtns: cc.Node = null;
  @property(cc.Node)
  blueBtns: cc.Node = null;
  @property(cc.Node)
  yellowBtns: cc.Node = null;
  @property(cc.Prefab)
  tipPrefab: cc.Prefab = null;
  private _tip: cc.Node = null;
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
          this._createTips(`"奥陶纪生命大灭绝——“有颌鱼类进化的序幕"`);
        },
        this
      );
    });

    this.yellowBtns.children.forEach((node, index) => {
      node.on(
        "click",
        () => {
          AudioManager.playClickSound();
          this._createTips(BlueConfigs[index]);
        },
        this
      );
    });
  }
  _createTips(content) {
    if (!this._tip) {
      this._tip = cc.instantiate(this.tipPrefab);
    }

    if (content) {
      this._tip.getComponent(cc.Animation).play();
      this._tip.getComponent("TipsCtrl").setContent(content);
    }
    this._tip.parent = cc.director.getScene();
  }
}
