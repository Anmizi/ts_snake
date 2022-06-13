class ScorePannel {
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number
  upScore: number
  score: number
  level: number
  constructor(maxLevel: number = 10, upScore: number = 2) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
    this.score = 0
    this.level = 1
  }
  addScore() {
    // 加分  
    this.setScoreAndLevel(this.score + 1, this.level)
    // 根据分数提升等价
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  // 提升等级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.setScoreAndLevel(this.score, this.level + 1)
    }
  }
  setScoreAndLevel(score: number, level: number) {
    this.score = score
    this.level = level
    this.scoreEle.innerHTML = this.score + ''
    this.levelEle.innerHTML = this.level + ''
  }
  // 清空分数和等级
  init() {
    this.setScoreAndLevel(0, 1)
  }
}
export default ScorePannel