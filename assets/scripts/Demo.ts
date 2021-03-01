import AudioManager from "./AudioManager";
import PopUI from "./PopUI";
import { Utils } from "./Utils";

const YellowConfigs = [
  `奥陶纪生命大灭绝——“有颌鱼类进化的序幕”`,
  `泥盆纪生物大灭绝——“两栖动物时代”`,
  `二叠纪生物大灭绝——“爬行动物繁盛时代”`,
  `三叠纪生物大灭绝——“恐龙时代”`,
  `白垩纪生物大灭绝——“哺乳动物时代”`,
];

const BlueConfigs = [
  "昆明鱼",
  "七鳃鳗",
  "初始全额鱼",
  "太平洋大鲵",
  "异齿龙",
  "沧龙",
  "达尔文翼龙",
  "三角龙",
  "猛犸象",
  "长颈鹿",
  "现代人",
];

const OrangeConfigs = [
  {
    name: "蓝藻",
    txt:
      "蓝藻是最早的单细胞生物，它靠光合作用维持生命，通过光合作用释放了大量的氧气，为地球上产生更多更复杂的生物提供了生存条件。",
  },
  {
    name: "三叶虫",
    txt:
      "三叶虫属于节肢动物，因背部的壳被两条“竖线”分成三部分而得名。它是最具有代表性的远古动物，最早出现在5.4亿年前的寒武纪，到约2.5亿年前的二叠纪末期才完全灭绝。",
  },
  {
    name: "鹦鹉螺",
    txt:
      "鹦鹉螺最早出现在5亿年前的海洋里，由于其独特的身体构造，较为进化的眼睛，以及聪明机敏的大脑，它逃过5次生物大灭绝，至今仍生活在海里，是最著名的“活化石”之一。",
  },
  {
    name: "提塔利克鱼",
    txt:
      "提塔利克鱼是最早登陆的海洋生物之一，它的“鳍”拥有原始的腕骨及单纯的趾头，虽然很可能无法使用“鳍”来行走，但是它们可能可以用来支撑身体，就像俯卧撑一样。它们拥有功能跟腮一样好的肺脏，类似于两栖动物。",
  },
  {
    name: "邓氏鱼",
    txt:
      "在没有颌骨的时候，生物的嘴就像吸管，这种进食方法很被动，所以鱼先进化出颌骨，像邓氏鱼一样，可以开合嘴巴增加撕咬的能力。它身长能够达到11米的大型古生物，那张巨大的嘴拥有超强咬合力，以至于带硬壳的三叶虫也是它的食物。",
  },
  {
    name: "蜥螈",
    txt: "生活在约2.7亿年前，是一种小型四足动物，两栖动物的代表。",
  },
  {
    name: "二齿兽",
    txt: "嘴里只有两颗突出的长牙，是一种以植物为食的似哺乳类爬行动物。",
  },
  {
    name: "蛇颈龙",
    txt:
      "大型的肉食性爬行动物，身长在11·18米之间。必须生活在干净的水中，有时会来陆地休息或产卵。",
  },
  {
    name: "盾龟龙",
    txt: "地球上最早的海洋爬行动物。",
  },
  {
    name: "始祖鸟",
    txt:
      "生活在1.45亿年前，是一种最早的鸟，同时拥有鸟类和恐龙的特征，是恐龙和鸟类之间的过渡物种。",
  },
  {
    name: "霸王龙",
    txt:
      "最广为人知的肉食性恐龙。特点是两只与身体极不相称的细小的上肢，长而锋利的牙齿用来捕食猎物。",
  },
  {
    name: "鸭嘴兽",
    txt: "最早出现在2500万年前，是卵生哺乳动物，现生活在澳大利亚。",
  },
  {
    name: "蓝鲸",
    txt:
      "古今最大的哺乳动物。蓝鲸被认为是已知的地球上生存过的体积最大的动物，长可达33米，重达181吨。所幸的是，由于海洋浮力的作用，它不需要像陆生动物那样费力地支撑自己的体重，另外庞大的身躯还有助于保持恒定的体温。",
  },
  {
    name: "森林古猿",
    txt:
      "森林古猿是人类和类人猿的共同祖先，它如何向人类的方向发展呢？有一种猜测是，经过长期的自然选择，体质特征发生了重大的变化：下肢更适于直立行走，双手日益灵巧，脑量逐渐增大，终于萌发了意识，产生了语言，促使他们从使用工具到制造工具，完成了从猿到人的过渡。",
  },
  {
    name: "中华曙猿",
    txt:
      "中华曙猿是已知的高级灵长类动物中最早的一种。它向人们暗示，高等灵长类的起源地更可能是在东方、在中国。所谓“曙猿”，意思就是“类人猿亚目黎明时的曙光”。",
  },
  {
    name: "匠人",
    txt:
      "匠人是属于人科的已经灭绝的物种，取此名的原因是在发现匠人的位点中，同时发现了很多不同的工具，如斧头及刀子，说明他们会使用先进的器具。",
  },
  {
    name: "智人",
    txt:
      "智人是人属下的唯一现存物种。分为早期智人和晚期智人。早期智人过去曾叫古人，生活在距今25万～4万年前，主要特征是脑容量大；晚期智人臂不过膝，体毛退化，有语言和劳动，有社会性和阶级性。",
  },
];

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
  @property(cc.Node)
  popUI: cc.Node = null;
  @property(cc.AudioSource)
  gameMusic: cc.AudioSource = null;
  private _tip: cc.Node = null;
  onLoad() {
    cc.resources.preloadDir("Audios", cc.AudioClip, (err, clip) => {
      cc.error("preload over");
      this.orangeBtns.children.forEach((node) => {
        node.on(
          "click",
          () => {
            AudioManager.playClickSound();
            this.popUI.active = true;
            for (let i = 0; i < OrangeConfigs.length; i++) {
              const tarName = node.name.substring(0, node.name.indexOf("-"));
              if (tarName == OrangeConfigs[i].name) {
                this._setMusicVolume(0.02);
                this.popUI.getComponent(PopUI).init(this, OrangeConfigs[i]);
                break;
              }
            }
          },
          this
        );

        cc.tween(node)
          .repeatForever(
            cc
              .tween()
              .to(Utils.getRangeRandom(0.5, 1), { scale: 0.9 })
              .to(Utils.getRangeRandom(0.5, 1), { scale: 1 })
          )
          .start();
      });

      this.blueBtns.children.forEach((node, index) => {
        node.on(
          "click",
          () => {
            AudioManager.playClickSound();
            for (let i = 0; i < BlueConfigs.length; i++) {
              if (BlueConfigs[i].indexOf(node.name) !== -1) {
                this._createTips(BlueConfigs[i]);
                break;
              }
            }
          },
          this
        );

        cc.tween(node)
          .repeatForever(
            cc
              .tween()
              .to(Utils.getRangeRandom(0.5, 1), { scale: 0.7 })
              .to(Utils.getRangeRandom(0.5, 1), { scale: 0.8 })
          )
          .start();
      });

      this.yellowBtns.children.forEach((node, index) => {
        node.on(
          "click",
          () => {
            AudioManager.playClickSound();
            this._createTips(YellowConfigs[index]);
          },
          this
        );
      });
    });
  }

  start() {
    this._setMusicVolume();
  }

  _setMusicVolume(n = 0.4) {
    this.gameMusic.volume = n;
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
