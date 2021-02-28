// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager {
  public static playItemSound(name: string) {
    const path = `Audios/Items/${name}`;
    cc.resources.load(path, cc.AudioClip, (err: any, clip: cc.AudioClip) => {
      if (err) {
        cc.error(err);
        return;
      }
      cc.audioEngine.play(clip, false, 0.5);
    });
  }

  public static playClickSound() {
    const path = `Audios/Click`;
    cc.resources.load(path, cc.AudioClip, (err: any, clip: cc.AudioClip) => {
      if (err) {
        cc.error(err);
        return;
      }
      cc.audioEngine.play(clip, false, 1);
    });
  }
}
