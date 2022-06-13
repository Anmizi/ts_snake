class Food{
  //定义一个属性表示食物所对应的元素
  element:HTMLElement
  constructor(){
    this.element = document.getElementById('food')!
  }
  get X(){
    return this.element.offsetLeft
  }
  get Y(){
    return this.element.offsetTop
  }
  //修改食物位置
  change(){
    // 生成随机位置
    let top = Math.round(Math.random() * 29) * 10
    let left =  Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}

export default Food