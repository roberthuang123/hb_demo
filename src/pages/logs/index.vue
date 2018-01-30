<template>
	<!--logs.wxml-->
	<view class="container log-list">
	  <view wx:for="{{logs}}" wx:for-item="log" wx:key="*this">
	    <text class="log-item">{{index + 1}}. {{log}}</text>
	  </view>
	</view>
</template>

<script>
import util from '../../utils/util.js'
export default {
	config: {
    	"navigationBarTitleText": "查看启动日志"
	},
	data () {
		return {
			logs: []
		}
	},
	onLoad () {
		this.logs = (wx.getStorageSync('logs') || []).map(function (log) {
			return util.formatTime(new Date(log))
		})
	}
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
.log-item {
  margin: 10rpx;
}
</style>
