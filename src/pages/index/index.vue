<template>
  <!--index.wxml-->
  <view class="container">
    <view @tap="bindViewTap" class="userinfo">
      <image class="userinfo-avatar" src="{{userInfo.avatarUrl}}" background-size="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </view>
    <view class="usermotto">
      <text class="user-motto">{{getText}}</text>
    </view>
    <view>
      <button type="primary" size="mini" @tap="setMotto">setMotto</button>
    </view>
    <view>
      <text class="user-motto">{{helloText}}</text>
    </view>
    <!-- sayHi Component start -->
    <sayHi :content="motto" @increment="incrementTotal"></sayHi>
    <!-- sayHi Component end -->
  </view>
</template>

<script>
import SayHi from '../../components/SayHi/SayHi'
export default {
  components: {
    sayHi: SayHi
  },
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      helloText: ''
    }
  },
  watch: {
    userInfo (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.helloText = `你好！${newVal.nickName} `
    }
  },
  computed: {
    getText () {
      return `Hello ${this.userInfo.nickName}!`
    }
  },
  methods: {
    //事件处理函数
    bindViewTap (e) {
      // console.log(this)
      this.hello(e)
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    setMotto (e) {
      this.motto = 'New World'
    },
    hello (e) {
      let userInfo = JSON.parse(JSON.stringify(this.userInfo))
      userInfo.nickName = 'Jack'
      this.userInfo = userInfo
    },
    incrementTotal (data) {
      console.log('total: ', data)
    }
  },
  onLoad () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.$root.getUserInfo(function(userInfo){
      //更新数据
      that.userInfo = userInfo
    })
  }
}
</script>

<style>
/**index.wxss**/
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 200px;
}
</style>
