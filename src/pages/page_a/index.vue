<template>
  <image class="h_content" src="http://image.vdongchina.com/M00/0B/64/ZSUkmVpv7QuEH9kcAAAAAKhb5Mc622.jpg">
    <view class="h_headimg" @tap="clickEvent">
        <image class="h_img" src="{{userInfo.avatarUrl}}"></image>
    </view>
    <button class="h_btn" type="primary" size="{{primarySize}}" loading="{{loading}}" plain="{{plain}}" disabled="{{disabled}}" @tap="primary"> 查看你的当前位置 </button>
  </image>
</template>

<script>
export default {
  config: {
    	"navigationBarTitleText": "首页",
      "navigationBarBackgroundColor":"#262833",
      "navigationBarTextStyle":"white",
      "enablePullDownRefresh":true
	},
  data () {
    return {
      userInfo: {},
      defaultSize: 'default',
      primarySize: 'mini',
      warnSize: 'default',
      disabled: false,
      plain: false,
      loading: false
    }
  },
  onLoad () {
    let that = this
    wx.getUserInfo({
        success: function(res) {
          console.log(res)
          that.userInfo = res.userInfo
        }
    })
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res,"address")
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  },
  onPullDownRefresh(){
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },2000)
  },
  methods:{
    clickEvent:function(){
      wx.showActionSheet({
        itemList: ['小秋秋饿了', '小秋秋在吃饭', '小秋秋好困啊'],
        success: function(res) {
          var list = ['快去吃饭，小秋秋！', '多吃点啊，小秋秋！', '快点睡觉，小秋秋！']
          wx.showToast({
            title: list[res.tapIndex],
            icon: 'none'
          })
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    },
    primary:function(){
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
          })
        }
      })
    }
  }
}
</script>

<style scoped>
page{
  height:100%;
}
.h_content{
  z-index: 1;
  height:100%;
  width:100%;
  display: block;
  position: relative;
}
.h_headimg{
  position:absolute;
  top:190rpx;
  left:50%;
  margin-left:-74rpx;
  z-index: 9;
  height:148rpx;
  width:148rpx;
}
.h_img{
  height:100%;
  width:100%;
  border-radius: 50%;
  display: block;
  box-shadow: 0 2rpx 12rpx 0 rgba(0,0,0,0.5);
}
.h_btn{
  position: absolute;
  top:440rpx;
  left:50%;
  z-index: 9;
  width:300rpx;
  margin-left:-150rpx;
} 
</style>

