import Snake from "./Snake";
import Food from "./Food";
import ScorePannel from "./ScorePannel";
// 导入第三方弹框库
import Swal from "sweetalert2";

class GameControl {
  //定义三个属性
  //蛇
  snake: Snake
  food: Food
  scorePannel: ScorePannel
  direction: string
  isLive: boolean
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePannel = new ScorePannel()
    this.direction = ''
    this.isLive = true
    this.init()
  }

  // 游戏初始化
  init() {
    //绑定键盘按下事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run()
  }
  keydownHandler(event: KeyboardEvent) {
    //若蛇只有一节，可以往任意方向走
    if (this.snake.bodies.length === 1) {
      this.direction = event.key
      return
    }
    //若蛇身长度大于1，禁止蛇往反方向走
    switch (event.key) {
      case "ArrowUp":
      case "Up":
        if (this.direction === 'ArrowDown' || this.direction === 'Down') {
          return
        }
        this.direction = event.key
        break;
      case "ArrowDown":
      case "Down":
        if (this.direction === 'ArrowUp' || this.direction === 'Up') {
          return
        }
        this.direction = event.key
        break;
      case "ArrowLeft":
      case "Left":
        if (this.direction === 'ArrowRight' || this.direction === 'Right') {
          return
        }
        this.direction = event.key
        break;
      case "ArrowRight":
      case "Right":
        if (this.direction === 'ArrowLeft' || this.direction === 'Left') {
          return
        }
        this.direction = event.key
        break;
    }

  }
  //控制蛇移动的方法
  async run() {
    let X = this.snake.X
    let Y = this.snake.Y
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10
        break;
      case "ArrowDown":
      case "Down":
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10
        break;
      case "ArrowRight":
      case "Right":
        X += 10
        break;
    }
    this.checkEat(X, Y)
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e: any) {
      this.isLive = false
      const { isConfirmed } = await this.alertToast(
        `${e.message}`,
        `分数: ${this.scorePannel.score}`,
        '重新开始'
      )
      if (isConfirmed) {
        this.restart()
      }

    }
    // 游戏是否结束
    const maxDelay: number = 200
    const minDelay: number = 100
    const delay: number = maxDelay - (this.scorePannel.level - 1) * ((maxDelay - minDelay) / this.scorePannel.maxLevel)
    this.isLive && (setTimeout(this.run.bind(this), delay))
  }
  // 检查是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      //  重置食物位置
      this.food.change()
      //分数增加
      this.scorePannel.addScore()
      //蛇增加一截
      this.snake.addBody()
    }
  }
  // 重新开始游戏
  restart() {
    this.direction = ''
    this.isLive = true
    // 初始化计分板
    this.scorePannel.init()
    // 初始化蛇
    this.snake.init()
  }
  // 弹窗
  alertToast(title: string, text: string, confirmText: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonText: confirmText,
      background: '#b7d4a8',
      iconColor: '#000',
      confirmButtonColor: '#000',
      // 不允许点击弹框外部关闭弹框
      allowOutsideClick: false,
    })
  }

}

export default GameControl