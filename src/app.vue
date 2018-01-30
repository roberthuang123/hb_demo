<script>
export default {
	config: {
		"pages":[
			"pages/page_a/page_a",
			"pages/index/index",
			"pages/logs/logs"
		],
		"window":{
			"backgroundTextStyle":"light",
			"navigationBarBackgroundColor": "#fff",
			"navigationBarTitleText": "WeChat",
			"navigationBarTextStyle":"black"
		}
	},
	data () {
		return {
			globalData: {
				userInfo:null,
		  		datas: []
			}
		}
	},
	methods: {
		getUserInfo (cb) {
			var that = this
			if(this.globalData.userInfo){
			  typeof cb == "function" && cb(this.globalData.userInfo)
			} else {
				this.globalData.userInfo = {
					avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKAeEsECeBuIl0Bx4Z1yWfD7szuNXHW5uJB9SGoz4ibKK67MXn0aF1m4qic5dwBxvsO7p3ffZOem3HQ/0",
					city:"Ningbo",
					country:"CN",
					gender:1,
					language:"zh_CN",
					nickName:"Mr.Hu",
					province:"Zhejiang"
				}
				typeof cb === 'function' && cb(this.globalData.userInfo)
			  //调用登录接口
			  /*wx.login({
			    success: function () {
			      wx.getUserInfo({
			        success: function (res) {
			          that.globalData.userInfo = res.userInfo
			          typeof cb == "function" && cb(that.globalData.userInfo)
			        }
			      })
			    }
			  })*/
			}
		}
	},
	onLaunch () {
		//调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
	}
}
</script>

<style>
/**app.wxss**/
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
</style>