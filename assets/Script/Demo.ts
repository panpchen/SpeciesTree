import { Utils } from "./Utils";

const { ccclass, property } = cc._decorator;

// 每小节时间配置(秒)
const TOTAL_TIME = 2400;
const SECTION_TIME_CONFIG = [
  { time: 180, infos: ["第1小节", "课程导入"] },
  { time: 480, infos: ["第2小节", "迷彩伪装"] },
  { time: 780, infos: ["第3小节", "士兵伪装"] },
  { time: 780, infos: ["第4小节", "迷彩服的原理"] },
  { time: 120, infos: ["第5小节", "我国迷彩服的发展"] },
  { time: 60, infos: ["第6小节", "结课"] },
];
const SMALL_SECTION_CONFIG = [
  [
    { type: "pic", time: 50, itemId: 1 },
    { type: "pic", time: 5, itemId: 2 },
    { type: "game", time: 39, itemId: 3 },
    { type: "game", time: 39, itemId: 4 },
    { type: "game", time: 39, itemId: 5 },
    { type: "pic", time: 8, itemId: 6 },
  ],
  [
    { type: "video", time: 123, itemId: 7 },
    { type: "pic", time: 5, itemId: 8 },
    { type: "game", time: 30, itemId: 9 },
    { type: "game", time: 12, itemId: 10 },
    { type: "pic", time: 20, itemId: 11 },
    { type: "pic", time: 282, itemId: 12 },
    { type: "game", time: 8, itemId: 13 },
  ],
  [
    { type: "game", time: 34, itemId: 14 },
    { type: "game", time: 40, itemId: 15 },
    { type: "pic", time: 300, itemId: 16 },
    { type: "game", time: 8, itemId: 17 },
    { type: "pic", time: 2, itemId: 18 },
    { type: "video", time: 113, itemId: 19 },
    { type: "pic", time: 3, itemId: 20 },
    { type: "pic", time: 3, itemId: 21 },
    { type: "pic", time: 267, itemId: 22 },
    { type: "game", time: 10, itemId: 23 },
  ],
  [
    { type: "pic", time: 15, itemId: 24 },
    { type: "pic", time: 15, itemId: 25 },
    { type: "game", time: 40, itemId: 26 },
    { type: "pic", time: 25, itemId: 27 },
    { type: "pic", time: 15, itemId: 28 },
    { type: "pic", time: 130, itemId: 29 },
    { type: "game", time: 31, itemId: 30 },
    { type: "pic", time: 25, itemId: 31 },
    { type: "game", time: 35, itemId: 32 },
    { type: "pic", time: 25, itemId: 33 },
    { type: "pic", time: 270, itemId: 34 },
    { type: "game", time: 26, itemId: 35 },
    { type: "game", time: 21, itemId: 36 },
    { type: "pic", time: 35, itemId: 37 },
    { type: "game", time: 57, itemId: 38 },
    { type: "pic", time: 15, itemId: 39 },
  ],
  [
    { type: "pic", time: 5, itemId: 40 },
    { type: "video", time: 98, itemId: 41 },
    { type: "pic", time: 17, itemId: 42 },
  ],
  [
    { type: "pic", time: 10, itemId: 43 },
    { type: "pic", time: 50, itemId: 44 },
  ],
];

@ccclass("CircleInfo")
class CircleInfo {
  @property(cc.Label)
  sectionNumLabel: cc.Label = null;
  @property(cc.Label)
  sectionTitleLabel: cc.Label = null;
  @property(cc.Label)
  sectionTimeLabel: cc.Label = null;
  @property(cc.ProgressBar)
  bar: cc.ProgressBar = null;
}
@ccclass
export default class Demo extends cc.Component {
  @property(cc.Label)
  timeLabel: cc.Label = null;
  @property(cc.Node)
  startBtn: cc.Node = null;
  @property([cc.Sprite])
  topProgressList: cc.Sprite[] = [];
  @property([cc.Node])
  topProgressBgList: cc.Node[] = [];
  @property(cc.VideoPlayer)
  videoPlayer: cc.VideoPlayer = null;
  @property(cc.Node)
  picContent: cc.Node = null;
  @property(CircleInfo)
  circleInfo: CircleInfo = null;
  private m_curTime: number = 0;
  private m_remainTime: number = 0;
  private m_curSectionId: number = 0;
  private m_sectionConfig = null;
  private m_smallCurTime: number = 0;
  private m_curSmallSectionId: number = 0;
  private m_smallSectionConfig = null;
  private _allAssets: cc.Asset[] = [];
  private _isPlaying: boolean = false;
  onLoad() {
    this.startBtn.active = false;
    this._preloadAllRes(() => {
      this._startGameCountDown(this._countDownCallback.bind(this));
      this._init();
    });
  }
  _init() {
    this.m_remainTime = TOTAL_TIME;
    this.m_curSectionId = 0;
    this.m_curSmallSectionId = 0;
    this.m_curTime = 0;
    this.m_smallCurTime = 0;
    this._updateTimeLabel(this.m_remainTime);
    this.topProgressList.forEach((sp) => {
      sp.fillRange = 0;
    });
    this._updateTopProgressColor();
    this.m_sectionConfig = SECTION_TIME_CONFIG[this.m_curSectionId];
    this.m_smallSectionConfig = SMALL_SECTION_CONFIG[this.m_curSectionId];
    this._updateSectionProgress();

    // 有缓存才执行
    if (this._allAssets.length > 0) {
      this._updateContent(this.m_curSmallSectionId);
    }
  }

  _updateTopProgressColor() {
    this.topProgressBgList.forEach((node, index) => {
      if (index < this.m_curSectionId) {
        node.color = new cc.Color().fromHEX("#999999");

        const label_list = node.getComponentsInChildren(cc.Label);
        label_list.forEach((label) => {
          label.node.color = new cc.Color().fromHEX("#666666");
        });
      } else if (index == this.m_curSectionId) {
        node.color = new cc.Color().fromHEX("#FF9C33");

        const label_list = node.getComponentsInChildren(cc.Label);
        label_list.forEach((label) => {
          label.node.color = cc.Color.WHITE;
        });
      } else {
        node.color = cc.Color.WHITE;

        const label_list = node.getComponentsInChildren(cc.Label);
        label_list.forEach((label) => {
          label.node.color = new cc.Color().fromHEX("#333333");
        });
      }
    });
  }
  _playVideo() {
    this.videoPlayer.play();
  }
  _startGameCountDown(callback) {
    this.schedule(() => {
      this.m_curTime++;
      callback && callback();

      if (this.m_remainTime <= 0) {
        cc.error("游戏结束");
        this.unscheduleAllCallbacks();
        this._isPlaying = false;
      }
    }, 1);
  }

  _countDownCallback() {
    this._updateTimeLabel(--this.m_remainTime);
    this._updateSectionProgress();

    if (this._checkSectionIsComplete()) {
      cc.error(`第${this.m_curSectionId + 1}节完成`);
      if (this.m_curSectionId < SECTION_TIME_CONFIG.length - 1) {
        this.m_curSectionId++;
        this.m_sectionConfig = SECTION_TIME_CONFIG[this.m_curSectionId];
        this.m_smallSectionConfig = SMALL_SECTION_CONFIG[this.m_curSectionId];
        this.m_curSmallSectionId = 0;
        this.m_smallCurTime = 0;
        this.m_curTime = 0;
      }
    } else {
      if (this.m_curTime == 1) {
        this.startBtn.active = true;
        this._isPlaying = false;
        this._updateTopProgressColor();
        this._updateContent(this.m_curSmallSectionId);
      }

      this._updateContentProgress();
    }
  }
  _updateTimeLabel(time: number) {
    this.timeLabel.string = Utils.countDownFormat(time);
  }
  _checkSectionIsComplete() {
    if (this.m_curTime === this.m_sectionConfig.time) {
      return true;
    }
    return false;
  }
  _checkSmallSectionIsComplete() {
    if (
      this.m_smallCurTime ===
      this.m_smallSectionConfig[this.m_curSmallSectionId].time
    ) {
      return true;
    }
    return false;
  }
  _updateContentProgress() {
    this.m_smallCurTime++;
    cc.error(
      `${this.m_smallCurTime}秒, 共${
        this.m_smallSectionConfig[this.m_curSmallSectionId].time
      }秒`
    );
    if (this._checkSmallSectionIsComplete()) {
      if (this.m_curSmallSectionId < this.m_smallSectionConfig.length - 1) {
        cc.error(
          `第${this.m_curSectionId + 1}节的${this.m_curSmallSectionId}小节完成`
        );
        this.m_curSmallSectionId++;
        this.m_smallCurTime = 0;
      }
    } else {
      // 点击播放按钮才执行
      if (this._isPlaying) {
        this._updateContent(this.m_curSmallSectionId);
      }
    }
  }
  onClickBtn() {
    this._isPlaying = true;
    this.startBtn.active = false;
    // 读取当前小节第一个内容
    this.m_curSmallSectionId = 0;
    this.m_smallCurTime = 0;
    this._updateContent(this.m_curSmallSectionId);
    cc.error(
      `当前小节初始配置 ${JSON.stringify(
        this.m_smallSectionConfig[this.m_curSmallSectionId]
      )}`
    );
  }

  _updateContent(id: number) {
    const config = this.m_smallSectionConfig[id];
    const type = config.type;
    const itemId = config.itemId - 1;
    cc.error(`当前内容类型: , ${type}, itemId: ${itemId}`);

    this.picContent.active = type == "pic";
    this.videoPlayer.node.active = type == "video" || type == "game";

    if (this.videoPlayer.node.active) {
      this._setVideoClip(this._allAssets[itemId]);
      if (this._isPlaying) {
        this._playVideo();
      }
    } else if (this.picContent.active) {
      this.picContent.getComponent(cc.Sprite).spriteFrame = this._allAssets[
        itemId
      ] as cc.SpriteFrame;
    }
  }
  _updateSectionProgress() {
    this.topProgressList[this.m_curSectionId].fillRange =
      this.m_curTime / this.m_sectionConfig.time;

    this.circleInfo.sectionNumLabel.string = this.m_sectionConfig.infos[0];
    this.circleInfo.sectionTitleLabel.string = this.m_sectionConfig.infos[1];
    this.circleInfo.bar.progress = this.m_curTime / this.m_sectionConfig.time;
    this.circleInfo.sectionTimeLabel.string = `本小节剩余时长：${Utils.countDownFormat(
      this.m_sectionConfig.time - this.m_curTime
    )}`;
  }

  _preloadAllRes(callback?: Function) {
    cc.resources.preloadDir("Res", cc.Asset);
    cc.resources.loadDir("Res", cc.Asset, (err, assets) => {
      if (err) {
        cc.error(err);
      } else {
        assets.sort((a: any, b: any) => {
          return a.name - b.name;
        });
        assets = assets.filter((asset) => {
          return asset.name.length > 0;
        });
        this._allAssets = assets;
        cc.log(assets);

        callback && callback();
      }
    });
  }
  _setVideoClip(clip: cc.Asset) {
    this.videoPlayer.clip = clip;
  }
}
