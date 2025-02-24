import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper }from './style';
import pic from '../../../../statics/logo.png';
import CarouselNav from './CarouselNav.js';
import ButtonGroup from './ButtonGroup.js';
import CarouselImage from './CarouselImage.js'

class Topic extends PureComponent {
  constructor (props) {
    super(props);
    /* 存放图片地址及当前展示的图片索引 */
    this.state = {
      imageSrc: [
        'https://upload.jianshu.io/admin_banners/web_images/4697/be549894d00e999e878881fdddb2ccc4465e97a6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540',
        'https://upload.jianshu.io/admin_banners/web_images/4688/b566e8cd6e7c0b15b1cc510fdc596ac501e97a96.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540',
        'https://upload.jianshu.io/admin_banners/web_images/4698/a5988a97c54f6fad9e080cea83106f3989a4e745.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540',
        'https://upload.jianshu.io/admin_banners/web_images/4703/395cd984142fc757af96125e4f0f8603a9db91cb.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540',
        'https://upload.jianshu.io/admin_banners/web_images/4680/f3832b8ec185f3772a31960a2494964132f29ce0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
      ],
      currentIndex: 0,
    };
    /* 定时器引用 */
    this.timer = null;

    /* 绑定事件中this */
    this.prevImage = this.prevImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this._updateIndex = this._updateIndex.bind(this);
  }

  /**
   * 组件加载完毕后，图片自动播放
   */
  componentDidMount() {
    const len = this.state.imageSrc.length;
    this.timer = setInterval(
      () => {
        this.setState({
          currentIndex: (this.state.currentIndex + 1) % len
        });
      },
      4000
    );
  }

  /**
   * 组件卸载时，清理定时器
   */
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  /**
   * 展示前一张图片
   */
  prevImage(){
    let currentIndex = this.state.currentIndex;
    const len = this.state.imageSrc.length;
    /* 计算下一张图片索引 */
    currentIndex = (currentIndex - 1) >= 0 ?
      (currentIndex - 1) % len : len - 1;
    /* 调用更新函数，更新当前显示的图片，并刷新定时器 */
    this._updateIndex(currentIndex, len);
  }

  /**
   * 展示下一张图片
   */
  nextImage(){
    let currentIndex = this.state.currentIndex;
    const len = this.state.imageSrc.length;
    /* 计算下一张图片索引 */
    currentIndex = (currentIndex + 1) % len;
    /* 调用更新函数，更新当前显示的图片，并刷新定时器 */
    this._updateIndex(currentIndex, len);
  }

  /**
   * 展示选中索引图片
   * @param  {number} index 索引值
   */
  selectImage(index) {
    const len = this.state.imageSrc.length;
    this._updateIndex(index, len);
  }

  /**
   * 工具函数，用于更新state，以及刷新定时器
   * @param  {number} index 将要展示图片的索引
   * @param  {number} len   展示图片总张数
   * @param  {number} delay 动画持续时间
   */
  _updateIndex(index, len, delay=4000) {
    /* 清除定时器 */
    this.timer && clearInterval(this.timer);
    /* 设置当前展示图片 */
    this.setState({
      currentIndex: index
    });
    /* 打开定时器 */
    this.timer = setInterval(
      () => {
        let currentIndex = this.state.currentIndex;
        this.setState({
          currentIndex: (currentIndex + 1) % len
        });
      },
      delay
    );
  }
  render() {
    console.log(1,this.state.imageSrc);
    return (
      <TopicWrapper >
        <CarouselImage
          imageSrc={this.state.imageSrc}
          currentIndex={this.state.currentIndex}
          enterDelay={1500}
          leaveDelay={1500}
          component={"li"}
          name={"carousel-image-item"}
        />
        <CarouselNav
          carouselNavItems={this.state.imageSrc}
          currentIndex={this.state.currentIndex}
          selectImage={this.selectImage}
        />
        <ButtonGroup
          prevImage={this.prevImage}
          nextImage={this.nextImage}
        />
      </TopicWrapper>
    )
  }
}

// const mapState = (state) => ({
//   list: state.getIn(['home','topicList'])
// });

export default connect(null, null)(Topic);