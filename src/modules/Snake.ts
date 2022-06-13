class Snake {
  //表示蛇的元素
  head: HTMLElement
  // 蛇的身体
  bodies: HTMLCollectionOf<HTMLElement>
  //蛇的容器
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    this.bodies = this.element.getElementsByTagName('div')
  }
  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  set X(value) {
    if (this.X === value) return
    // 判定是否撞墙
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！')
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }
  set Y(value) {
    if (this.Y === value) return
    // 判定是否撞墙
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！')
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()

  }
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
  // 蛇身体移动方法
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let x = this.bodies[i - 1].offsetLeft
      let y = this.bodies[i - 1].offsetTop
      this.bodies[i].style.left = x + 'px';
      this.bodies[i].style.top = y + 'px';
    }
  }
  // 检查是否吃到自己
  checkHeadBody() {
    // 获取所有身体坐标，检查是否与蛇头坐标重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i]
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己了')
      }
    }
  }
  // 初始化蛇
  init() {
    console.log(this.bodies.length);

    while (this.bodies.length > 1) {
      this.bodies[this.bodies.length - 1].remove()
    }
    this.X = 0
    this.Y = 0
  }
}
export default Snake