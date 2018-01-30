<template>
	<view>
        <view>
		    <button type="primary" size="mini" @tap="showContent">showContent</button>
        </view>
        <view>
            <text class="user-motto">{{content}}</text>
        </view>
        <view>
            <button type="primary" size="mini" @tap="increment">+</button>
        </view>
    </view>
</template>

<script>
export default {
	props: {
        name: {
            type: String,
            default: 'jack'
        },
        content: {
            type: String,
            default: 'Hello!'
        }
    },
    data () {
        return {
            ref: this.content,
            counter: 0
        }
    },
    methods: {
        showContent (e) {
            console.log(this.ref)
        },
        increment (e) {
            ++this.counter
            this.$emit('increment', this.counter)
        }
    },
    onLoad () {
        this.$on('increment', function (data) {
            console.log('child increment: ', data)
        })
        console.log('sayHi onLoad!', this.content)
    }
}
</script>

<style>
.content {
    background: red
}
</style>
