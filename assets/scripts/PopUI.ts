// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./AudioManager";
import Demo from "./Demo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopUI extends cc.Component {
  @property(cc.Label)
  nameLabel: cc.Label = null;
  @property(cc.Label)
  infoLabel: cc.Label = null;
  @property(cc.Sprite)
  sp: cc.Sprite = null;
  @property([cc.SpriteFrame])
  spList: cc.SpriteFrame[] = [];
  private _demo: Demo = null;

  init(demo, data) {
    this.node.opacity = 0;
    cc.tween(this.node)
      .to(0.2, { opacity: 255 })
      .call(() => {
        this._demo = demo;
        this.nameLabel.string = data.name;
        this.infoLabel.string = data.txt;
        for (let i = 0; i < this.spList.length; i++) {
          const spName = this.spList[i].name.substring(
            0,
            this.spList[i].name.indexOf("-")
          );
          if (data.name === spName) {
            this.sp.spriteFrame = this.spList[i];
            break;
          }
        }
      })
      .start();

    AudioManager.playItemSound(data.name);
  }

  onClickClose() {
    this.node.active = false;
    this.sp.spriteFrame = null;
    this.nameLabel.string = "";
    this.infoLabel.string = "";
    this.node.opacity = 0;
    AudioManager.stopAllItemSound();
    this._demo._setMusicVolume();
  }
}
