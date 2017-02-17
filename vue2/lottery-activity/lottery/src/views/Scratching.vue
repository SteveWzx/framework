<template>
    <section class="obg pr">
	    <div class="ojndj pa zoomInDown">
	    	<img src="https://atths.jzb.com/website/fe/lottery/images/ojndj.png" alt="">
	    </div>
	    <div class="s-info pa">
	    	<div class="s-title">
	    		<img src="https://atths.jzb.com/website/fe/lottery/images/f1.png" alt="">
	    	</div>
	    	<p class="s-times">
	    		<span class="fc" :class="{bounceIn: fontAction}">{{ $store.state.user.rtimes }}</span>次
	    		<!-- <span class="cbtn">继续刮奖</span> -->
	    	</p>
	    	<p class="s-t" :class="{fbc: msgState != 0}" @click="dealByState">{{ sMsg }}</p>
	    	<p class="s-s"><span></span></p>
	    </div>
	    <div class="s-area pa">
	    	<div id="scratch" ref="scratch">
	    	   	<div id="card">
	    			<img :src="`https://atths.jzb.com/website/fe/lottery/images/gift/${giftId}.png?v=2`" alt="">
	    	   	</div>
	    	</div>
	    </div>
	    <div class="s-t pa" v-show='stShow' :class="{bounceInUp: stShow}">
	    	<p class="st-p">{{ `${giftMsg.f1}，${giftMsg.f2}` }}</p>
<!-- 	    	<p :class="{fbc: giftMsg.link}" @click="linkGiftDetail">{{ giftMsg.f2 }}</p> -->
	    </div>
    </section>
</template>

<script>
import LuckyCard from '../assets/js/lucky-card.min.js'
import { mapMutations } from 'vuex'
export default{
    data () {
        return {
            isContinue: false,
        	fontAction: false,
        	stShow: false,
        	giftId: 1,
        	logid: 0,
            firstTimeEnter: true,
            hasHashLogid: false,
        	sMsg: '点击下方刮奖',
        	msgState: 0,
        	giftMsgArrs: [{
        		f1: '将在10个工作日发送到您帐户',
        		f2: '请留意站内提醒',
        		link: false
        	},{
        		f1: '将在10个工作日发送到您帐户',
        		f2: '请留意提醒通知',
        		link: false
        	},{
        		f1: '已发放到帐户',
        		f2: '进入个人中心查看',
        		link: false
        	},{
        		f1: '手气差了一点点',
        		f2: '再接再厉',
        		link: false
        	}],
        	giftMsg: {
        		f1: '',
        		f2: '',
        		link: false
        	}
        }
    },
    methods: {
    	...mapMutations([
    	    'pushLoadStack',
    	    'completeLoad',
    	    'getUserRtimes'
    	]),
    	requestData (url, fn) {
    	    this.pushLoadStack()
    	    this.$http.jsonp(url).then(fn).then(this.completeLoad)
    	},
    	dealQrCodeBox() {
    		let winWidth = document.documentElement.clientWidth || document.body.clientWidth
    		let winHeight = document.documentElement.clentHeight || document.body.clientHeight
    		let scratchBoxWidth = 0.658 * winWidth
    		let scratchBoxHeight = 0.215 * winHeight
    		this.$refs.scratch.style.width = scratchBoxWidth + 'px'
    		this.$refs.scratch.style.height = scratchBoxHeight + 'px'
    		this.$refs.scratch.style.marginLeft = -scratchBoxWidth/2 + 'px'
    		this.$refs.scratch.style.marginTop = -scratchBoxHeight/2 + 'px'

    		let content = this
    		LuckyCard.case({
    		    coverColor: '#d05959',
    		    coverImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAADZCAMAAAC3m9+SAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAh1BMVEWwsLCxsbGysrK0tLS2tra3t7e1tbWzs7PFxcXW1ta7u7u+vr7JycnDw8PMzMzQ0NDZ2dnj4+O6urrd3d3g4ODCwsLT09O/v7/Ly8vAwMDb29vBwcHKysq5ubna2trY2Ni4uLjV1dXPz8/Nzc3S0tK9vb3R0dHGxsbX19e8vLzHx8fIyMgAAABj4TpRAAAAAWJLR0Qsut1xqwAAAAlwSFlzAAALEgAACxIB0t1+/AAAGNRJREFUeNrtXWt7mzoSRkhAEjt2SJz0crrNttue5uz+//+3umtGGhEjk8Rg5kOfxhiB52UujF5pqmqJwmouGictcx93TSTh0Iix3clCtF0NDtRg4KpS1xdm+NZ/LD5aMeckERqt02XdTAGTxl+0vFbnsrp2ozMwbl1x9aVOfdwh9FaxwkQOizaFqR49fN22vLMQ8VZei9sD4LLcPCmi6zi6mfFXW6wkKFnX0zECJlGgOAN617rr2IeAg1GRZUH0VnHCE+0ok6kbzhifBCYlwJHZEaBDZZUgQGraj1bN2QhjNEyddn2TwQTM0lkIGLQjLrTaEhDRVqRna82zPBVMyL/ZK0M4agKkNS45kVGJkyZjtEcdKlIe9m9VlMwJZFmrKcVS50zGuj6WvjaVWRO0HKbSPTQklamsUckLt1jkYBIkTN34C0EUhIiThSQwiYKkf7kinMlwMsvKHCqAqWuGhCOU2q7g9XnBwgIWOTWafC+W0WpkzZB03iMKvhpRLF7/QzBRh8YbU8ZWDTQml1gRogWUNgecnkQzPjRenbnIZzDnYnVzWYlMRmR0GMEkNTr+UgOBibsy0iqUoHfJnNMziXdtYdIzECU6zQWm1c29JtgLMfqBt7UCBZOegSh97NsVoTJBHk6/RRJOz5UA6q7MiJzET8AaiI4T7IRMrBlO51jd8ZKgpM9tV4RKBCHi6j6xNQmvT9ZxM0lUqGE7EbK6uXGCwpJnGUTpnFdpmC4sNCZtiSc5zUsUPEsbKtBdgAg6poDpWgd9R8FzOh08IBqbcMvHv7NHgH/86Dufl7CanxCGkzw8jGuzOVarQGRrqyDXWAPLsSKfch3Ly0v86AUm9mIqVXCFVusMg4Nc5+dIYZHJyDDs52hEaco1kG/bZA7zGYPtrXzGRJi2GWgyrEVxvxCmLjcGeLGptcHZJB3EsY/WyZlJIAcDmOLycpnTA6bRckYecHxG4+EASmtgCtKhyBHoBklFrIiJ0DmETDLHfIEu5TPqoMUQeqtYqXNYTEMYkX4zkIOVV23zfMZOVYbg9T5aN+cjXQaLyXg91nw8AEN8xqhutFYQnNQ0Fp0gCXTFZZt0KQpApKX5jGtgCkIzFtsM5adQcTAhp4j2FJ+xmC6+OGGc9myq+kZPqxZak0hGwIGJmL1b45KTOsNY1EqbjMxYoYzRFiCgDXfk/G2pe12ccINFhtdDHiqDqUOjqnQPjkkGphUkJ7ZGl4OJPlSiPhiYRNvGg6aBaSUHezGcnWHO6URP+RCfUQYmNA21TrQi6QY8mz9EwFRQFRjiM8qr+IusCCXigoPIOz360PhLDRLtubmTlXpKSXAzEos6D1N6aLwyB4n2KvNfEcpIjbHIqbCKYSpK8wYCU10VsyQvQGCsyDo9PSkEYFLU01MvhsZfA9GwxKxT0unZaR8bOHgx9ZQ01Vm5OVZ/BIMsJWFRMFnvxtoTENIyc4TUtIso2X7nRMFpl75+ndnjRN9ohfb4GX85MPZ5u7k4SrJAACnlf5QLJ9BIYQrfrzu0x89osTCJs6ae6r3HUOGjQ5WSdy/Uk6zTOJ0L3GB/s8UXlF7jvN2cJ4AALOLn9p1LV/jyPrlmMJ0DOg3l0XPWc7kwVAAOni3JTd/XmoiwZD6Hu80FOolIAV2SxLuOifwOfmOnQmXmUf5gZ1mnNW8N59isUuliOuMiefYJGI4SfeIcm6aeinIqArpwMop8AGxpyD5VC+fZE9mt+t1szIYhRG7og3khTOTqLzu6ZYfbKdTL4NnTlKmOXlZPxCaVeSD0apwblqXG9OqvSnEh3PAtoDMunGffZTwbz02/obPDvlQBJhZTOUq0BqOlwPzwcIBdCs+eCZrkwe3vTw+FczE5wCcKadZRkkN4hOLCDxjX7htsMEToLUzqQWIBVYn2p8aZujeZ/EL8EcLB5hd6VXidjm63Z2x1IEToLUzUjxvH//CnJhy1TH2gDCbmtlawhR//IkfsG9y2Iq6fL0pYntnmrSlSuj81nZHRa0t4R8JUvPI+XhV+xL7BSwtMNn8d4n/E1hTOJbFgKvVgk8EEnp7j9w3+gAL+m4pTAr1NH2lN7sya9mydVh4BU5nqIJ3RfoR4qOTk3dJScf8oDhALokNOV9Jk6pQ+bXJD8lARTPDKNikAI2d49gvLHmCBOZ9CcJQQ+DNpz2YG69K3pkKnF/HsWY18HMmzX5opwSc1D5N6NINtgDPzME3n9KDldKDw5C6TOuqlgYRjb8topyfgZLZASxJIk2nyhwomfHE9L8E9Qum8p8ILBa8srmj+h8WFCVgHaO3TnYeJU4fGW9PwvsEtWmV+1hOtxULMDhAwhWlSXQcw/3VTuzwfm0iYxrujQZ693915oQgpwQ7ObjuRaCX4EKZmJKIzRzq98WWBIZ69odkv0s0FSRyekhgmsBuZDt3xmXmYRFqgKJiUz70gmNG6ZSNUxcUD/5TXaNIgzEjYOJ2cyXMwKXwhTGXk4HxgKp4HnpVQDk9/LrxSGdjlug0oxWfSMJkRuRuslHpKB6ZZBSJ2AsUvx9JR3DZhCCC6IG31AWypi9EgYbKD8eLtt6nb1JDPys1p6mnpdryDe8OZWR3GahE8Cwu6T88kKuR+RJMbstLlJWxGCMU/MRBASt1zbstSdUjNuwmVGdTgmNsujj4zO91Uuc3mSkvVoSRy3m6u5pgyxTA5uKwmkrgtcDk3vKlmoo7EVSagxU4vYOLZKqVWrwc4b4Q89RT8xti9FP18tIgLAo06doId/DqHEsWzT9K5AFLGq45Swlm7OUQA8ZpMX/dLrKkNGkXdvfHLEKC8eZQyrtJak808GMFW+Wh9volEL3Qiz/8QBbMCXYMJIB4qNM3mKW+sc3Epw7OXIj2lcUw6EFmft3Q+Y5I3OSym4X90nCMCiO8fAIa1TwTnngAykMEbA1IrB41ZXQKfkSphcaPUifgfduWWz0SsEmHqWyc3EefhGCUDeGuc8gXwGSua/1GpZ7PLHSoQ4FZddB/sSJwNS5AcjPiMYIRzTtPKROY1FLFAA0QeKkuhko7EJOUNoIQmeKEp1dC1gRetRQemLsP/0E/pdPwPiELazSGlvPmjSeEH8X0A0Z4tOTDx1/gfE7GpANpaiQwFvSQw2ZBjSrGwUwfBZ1Quj9WY9LMwMUt03p7/AS2nrmMCSBKYVGnCb+5svpznM7acY3Lw0gKTeaJJz+ZhmsTpIRSS7t5JYPLnBXLwiH2DlzYlZLeN52P5H+MD9CCzQKBNm2AxDZx29L7Bi0MpLN8agKmaItPLDW+Hc7qPy53pvsF4w+eBmcHFCOxAN8qaxgfowR38OpMsELM66b7BOF0k+74uLC4BP5N3ejKHYtnFXkfLEOVNxpccWyEm2qNkzlUAk/tdlkDl85xX0tpBe2q0JW8k+cA0lIxAFHhdx+RgKjAtLSqxqO5MW5OBpPUIFdILMpS31+bdcJuq+Ow4MIn2nHdhKpOEdsooVdr+Kby8/7oWImk+hl4wuG+wvDeYmJ880Qonp66ur8sHur6+GXHVzXabOXQjB0p7PwJrut3tjCrZdq8GYYZJVL67aLRR1pF7jw3wGdU912G4cp1q4ZvdXb8Pf2/7vnywvt+8+p1ms7na7q7veiWZucuNHIiinbbNvfl7J0/Vn9/0vYPazLsV6gMsiRnx1A8S7VszF38SQhsp2+31g1bWIWgLoCSf6JxkTCaH0qM5yyDj5eFpm0fpE/rFbt7n82ELURLdXX8wxxxbpZRZYOaYxvqlgRctwRg/pY+slB1Q1mF/pX7o1XYTobTpsxLAQOD1/R3803+pQSffXe+3282Qb5RX/kKEn4of+v7rF4eSjER7MKz9arFO6m78U58PTFOk3DfmYZaW9Oh+1rVxHaktye95vR/s/4OK+wEBarfSKABeV6T80l/4ubQHGnk3/U6jpJ5TCJJD6V3TqExgmpbYCINQipLHYRt/CQ7h5a5XttQfwicVobF9//T6fT32/S128V5upTnt2m/qLv/1ve+/fzLwP/cP9rvv+kbC3hohreLTUfKy6++4dIVP/d7OT6rmzjaeXAXk+v56CyR7X+iXQ8033w//Vl9gW4nXj3vz1qmSiBTRd5DI5b0JsXE6lDbSkrjKHvhT/7AJzZ2NEq+PcIrRfeV9PN/U3ee+b/fK921/qmP8zpvSO1PewNvBm1FPJ0FJInLzJDVW2RzvP33/63e4d6VFb0tSs/vt67a0l1knRCm6nGh+Shi7p7+a277/W4MEPOT7VsqYnuR7U4b9yShp6untD5koPpqvSpTaP9IV/fJaQ4Ww6/4hcysoVzz0h2cgLyFb1AWIP88qWdDVTBmm7hoJ0tXHMQvYaTvi5+XKakPmeP4FaDRKevvt5vdOvXL9/DczX92oQvH9T5VA7n4nMG3zr739oPiv1c397sGmdLpi8OWg/tiCN5fFMAu2xAvQWJR02f72qzpZOTjt2dQ4Ojn9/Utn+ual5+UYAKAbVAn2152Uz5+/6Q+++bYAym7lBX8plDRt5FYmeocrhtmoy5CNVYeM6vZ/zViUTMn6/qE/2CCkTMZ4PP3n7510W6ae83ycmQR5VAi3mACi/djTwT4U+q2WV2KrnpKX33gT3KVN4QzGJfcmKgO++6/M5Nz/7cTC7VYiYcOHrj28XF+/qD+kGf35g5O0u2PKfEp2vUTjH/3fsExJIbZXjvTe1h7ud0/aYLdNJEujvA2i9EqkAG8K1HH0Vqph2vf5ly0sD/3T3lSAO2whze7GvO1rW1J29ONPk8jSNlo8ASXYa12m4bdKHr9s/pL/ftp8jlGSMEmQDttIaNOSr6hXj6aKGvMZKzv/qVG6fdneNIRclC1Z2aDaqjMHtWdSG1C6dVi0+lneJCjd/6Kgpm1L4smlPamDmDllruw/eX65IetoFxWXrMhQfhN/SeUOPFhTwMSokH+KUbr/qiMIlgcaJX5Q3u5KG1NCtIfJnHp8lm1KeFbiegAl9IFDqTbunzt1fX1G8j2qaX+RrziH/iW6h0y5yb5UPehqBlyiwljYYl0N2vefJmHjna8cj9JTf5cq1lCgnTVRzmwDHnpVF/2167//tUFyR6IkTUmXGq5AWm8NVfyEj4I0z+8mnzTys4k2sZ+/SJS2QVtDKD3A+XaHki+l6jcVhQGSX+oxdy8x9+pFdNvsjoxLOxcH7/oHHhEPB9+8ns97pX0hSj4nuB5CqUG6tF9y0yq2D0SSK9z2/aPfU/iPKULs5KvO7vW4JG/MTkDJVG8fTeBs4aPQq6TR//X529VH63R6ORqlLZpbtV/yT7iBiULpNnTy+PHDvIg+R1N0VFziD4GEsVUPSJbPuFOh7pv2hGe95cspcjRKDzAsuS+B0qZyekn28FXh1uLemrv+6+3tl9fi0rV8V0J/5JgF8j6fv0kYl+fmgKQopewUJVdQax4lmFJJk6FrD8puAExHxSU1/xT+UvNG/82CdGgwpguUFCUrGKXm4JhU7qtKsehdUsL0bZfKb1O7c2sfhfjcHyK62CFGie/7HnE25eX7LYGRSkgO/xgYnxb0fhTLcSgpLTzC067jikCj3zbJJSDmDAWTXoK67WPSbByX1NXusM5vJEw/E4x28tM7Hb34tUohFovTBlDnDlB/O4CSmgTdo9OMYtN9NLv85guuP82rKD0eCMO4kbfwfA/HvfpbTV94ZNS72GH/WC1S0rfa6kZFdKmqA1TbHT5NKxZmx9vnF430y3Ms8nMfM9SGIp+H41KjpiF26Y1yNcvnvN4//93rGaY9SDsbTco7PG1HUNTnIhtAE3kwKLnw7qznpo8tyaIE/RuVE0Qg2N0Gh7MHNfF3oC3iP2YeRObb5tE67KLZ2GZr59g/WqmTCxGXrqxdeaezPyQ5mEYJhqVb/6KKUwg9Fa6v4NYh7YbreHeOx5fKp4e/7RqIh/6Bdm43u7v+hLUi5yp8s/FKuclwtjmtttw+mt7E8Eb+3OP5v2igKzi/1AxM4/IwtzTwpeWZ0imC53Q6eEA0dq0X2FBk4S2J305YfcqSjXT5lx/XMtOYXmYiLqMl8ZuIa+5cXuIf2N7ZssNtoRVtHIy94ypAWGQyuv+6ix6TbG6N9iX27PDqUloSnyxmL2fc2hmvqT655yMeAxDb0cbBS99btlxqzyMEMMXl5TKnB5syoT04wfAcujyA0hqYguDu3mFZSboVTInWOoeQSeZCW4B0f8aks8AamLzUOSyIphYlfWZaEcjByqs6kyRaEndqszl4vY/WzflIl8GCTQRTZc3HAzDUkjiqwi54xm6k1DQWnWDEkuriPkssXYpyxBZ+a2DywknttJ7yM4ni8E5w8XUzW/gtbkerUmGc9myq+tZSh0oXdadb+OHARG1YscYlK7V6hyFg0kqjD5XBlG7hB22Y3sJvafuOFQs3WOS2d6YOlcHUoVFVugfHJAPTTEE6paddRmyNLgcTfahEfTAwibaNB00D0zzJwSf2tKPFcHboAOR0NdFTPrhxcMPQNNQ8iI3T97TLSDfg2fwhAqaCqsDgFn7Cbw43E4TepqddRnx7rrzTow+Nv9TgxsHc3MlM+q+/WU+7zOW8+iUWdR6mmthkdPS1hlBSmf/MEMImM01PO1rgLvJ1dsPKOukFVuR3BwJTfcLmnO8rb9vTjhbUNTLn9PSkEICprLt3PjDNJBBlfsSkPe1oiVmnpNOz0z42cBR396ZNdR5uLshb97QjJCVhUTC5ngztCQhpmTtCqcq83qbtaYeF6P2YwhRmwc0cUV3sn6BDnZWb8/JOPe2wUC2JU5jC921HqOInxMJ07Pbb5yfv1NMOC8k6jdM5/8wHtkrxBeuunaOb8/JePe2QzuiWxAymc0Cn4UGZsZ5Pk6KedideM9eS2Dgm224w0EkEuJvLlLKedprwUf5gZ1mnNW8N59jUD7uYzrik/UbGSFlPu4oLIcqpCNFjEB9Wm8/Xrj1ntfLsS3vaVSc5IMw6RYmxY4fbKdSVZ28UUNbTzqIkylJjnIfDu/FdtlrYkfjiefaFPe2qU7QG0xGB+eHhAFt59kEKe9qFmktJDuERigs/4BKm3bR1hwi9y5PSnnZVfHCUcNB/Xa0K9/YEN5kzZt7qdA+hd3lS3NOuOQUm5rZWcK3ABUVnNPfWtiKun1+cDPa08wqzOoQ97ZCplS4D4yB10ULw7Enve2FC97QbUIzraYc94snLwIZ49lgmKCLOTbDDcz3tIu2Al9fQ024K1cUdiauIh0pO3l1gKo714AIzggkQ8YAzjOfVimCq02sDlDI8+wvMHqhpnirAIQRayA8sL1FgkdOLePbSm8IhSZ79bE3pBEedy55UXFfpnPxvXXPuLCV8PX3MS6wJWk7Xxd29KZ79PEGCPe3GS3ZzEUsMV2tROYAAeLx8JjhCcD0vwT1Caa5T4bin3XgZqHrad5nWsKiT2jSVsI+/i0E6o0QJrjKfxUSrmnjBe7RA/1C4SoDKw/3lBHQ7cW2afK8ab9ODPPvOHZ4HQo56Ch/WSEdF1oQXG8CqJ5x2I2vTFVVMGl8WGOLZG5r9PNwcq8EK04BFEldLYPKmIWym4ATGK7QHjAemEsR71Xh95pjHZrRuFghVCRres6U/rwQmyDKAfDcYL2xtWmfKIC4p7wZhKiMH5wPTxOtw3lQSYojHggjeBY9yS/W0q6LadGe01sFl45W5GHcIlVJP6cA0j0DkhWX4nh31xle0v4j+F/e0q8jaNBZ3Og9V8iIhljjPxc0BScOrMplatfghNq4o/H1RT7vqiNq0P5eZKnnp8hL8BMwRIa0CEqYOtBSaAKZcTzsjZG0a3qR2lsWvbP4RmJmbC4J62gEsTE+7yWAa7GnnJk0zKNXOWZZGez3AbBGq4p52QJVGeyyzQ8x4RSH/VuGednRtOj21fA6VzdHNYe21+Ve/drK9rwZ62jV0bRreYuoEL0pwT7tUJtsGBve0i5OFJDCpuVobhy6ezxj3tKOtKT1UANPgUnsZmCBKNoSsfEYrUU87EqaaOjRxbdpXPWGmvPIZrUQ97XLW1BFqHStDtWlhconoXYbYN3i+adopEvW0y8BEtBQaHyGGatMyLBGzO87DXXxgikxGZHQYwVS0rdNAYOL0lL1LvdmFB6a4px2pybinXWFRLReY8iUbc2lWY9LP5UlRT7vS2NCOQUiJenI4x1n7JQamop52pRI/Aa+WbHLe98KEWtU4nM7p1QuFmoLT40cV1VaUtJD8ntiaANHR0dmKmfVHuDkgFEoXmOTRqxqjdC7sWxGvXhgtyhJHOE0qRl5eXCrsafdu63sIkC7QlM69p91SotKye9rh1F363hm6u+X3tIPE2llMtF5kTzt3sVnwSS62p91sELronnanxNx3lLWn3Qxk7Wk3B1l72s1B1p52s5C1p93Zy9rTbg6y9rSbg6w97eYga0+7Gcja024Osva0m4OsPe1mIGtPuznI2tNuDrL2tJuDrD3tZiBrT7s5yNrTbg6y9rSbg6w97arq//eJDuVDh2/WAAAAAElFTkSuQmCC',
    		    ratio: 0.01
    		}, function() {
    			content.stShow = true
    			content.$http.jsonp(`${window.mDomain}/event/reward/brngo${content.getUserIdentityKey()}&logid=${content.logid}`).then( (response) => {
    				let data = response.data
    				let rtimes = content.$store.state.user.rtimes
    				if (data.state === 1) {
                        if (content.hasHashLogid) {
                            content.hasHashLogid = true
                            if (rtimes <= 0 ) {
                                content.msgState = -1
                                content.sMsg = '返回邀请列表'
                            } else if (rtimes > 0) {
                                content.hasHashLogid = false
                                content.msgState = 1
                                content.sMsg = '继续刮奖'
                            }
                        } else {
                            if (rtimes-1 <= 0 ) {
                                content.msgState = -1
                                content.sMsg = '返回邀请列表'
                            } else if (rtimes-1 > 0) {
                                content.hasHashLogid = false
                                content.msgState = 1
                                content.sMsg = '继续刮奖'
                            }
                        }
    				}
    				return content.$http.jsonp(`${window.mDomain}/event/reward/result${content.getUserIdentityKey()}`)
    			}).then((response) => {
                    // console.log('result', response)
    				let data = response.data
                    content.isContinue = true
	    			content.getUserRtimes({ rtimes: data.rtimes})
	    			content.$nextTick(() => {
                        if (+data.rtimes != 0) {
                            content.fontAction = true
                        }
	    			})
	    		})
    		    this.clearCover();
    		})
    	},
    	getCookie (name) {
    	    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    	    if(arr=document.cookie.match(reg)) {
    	        return unescape(arr[2])
    	    } else {
    	        return null
    	    }
    	},
    	getUserIdentityKey () {
    	  let key = this.getCookie('api_key')
    	  if (!key) {
    	      key = window.userKey
    	  } else {
    	    key = '?api_key=' + encodeURIComponent(key)
    	  }
    	  return key
    	},
    	getHashLogidFn () {
    		let url = window.location.href
    		let reg = /logid\=(\d*)/
    		let hashLogid = ''
    		if (reg.test(url) && this.firstTimeEnter) {
                this.firstTimeEnter = false
                this.hasHashLogid = true
    			hashLogid = `&logid=${reg.exec(url)[1]}`
    		}
    		return hashLogid
    	},
    	refreshRtimes () {
    		this.requestData(`${window.mDomain}/event/reward/result${this.getUserIdentityKey()}`, (response) => {
    			let data = response.data
    			// console.log(data)
    			this.getUserRtimes({ rtimes: data.rtimes})
    		})
    	},
    	scratchAction () {
    		this.requestData(`${window.mDomain}/event/reward/go${this.getUserIdentityKey()}${this.getHashLogidFn()}`, (response) => {
    			let data = response.data
                // console.log(data)
    			if (data.state === 1) {
    				let gId = +data.result.id
    				this.logid = data.result.logid
    				this.giftId = gId
    				if (gId === 2 || gId === 3 || gId === 4 || gId === 5 || gId === 6) {
    					this.giftMsg = this.giftMsgArrs[0]
    				} else if (gId === 1) {
    					this.giftMsg = this.giftMsgArrs[1]
    				} else if (gId === 7 || gId === 8) {
    					this.giftMsg = this.giftMsgArrs[2]
    				} else {
    					this.giftMsg = this.giftMsgArrs[3]
    				}
                    window.gaFn(`刮奖页 - 刮奖/奖品${gId}`)
    			} else if (data.state === -4) {
                    window.JzbBridge.ready(function(api){
                      api.closeWebview()
                    })
                } else {
                    alert(data.msg)
    			}
    		}) 
    	},
    	dealByState (event) {
    		if (this.msgState > 0) {
                if (this.isContinue) {
                    this.isContinue = false
                    this.scratchAction()
                    this.dealQrCodeBox()
                    this.stShow = false
                    this.fontAction = false
                }
    		} else if (this.msgState < 0) {
    			this.$router.push('/me')
    		}
    	},
    	linkGiftDetail (event) {
    		if (event.target.className === 'fbc') {
    			console.log('查看详情')
    		}
    	}
    },
    created () {
        window.gaFn('刮奖页')
    	this.refreshRtimes()
    	this.scratchAction()
    },
    mounted () {
    	this.dealQrCodeBox()
    }
}
</script>

<style>
.obg .fbc {
	color: #d44201;
	text-decoration: underline;
}
.cbtn {
	display: inline-block;
	background-color: #d44100;
	width: 80px;
	/*width: ;*/
	height: 18%;
	height: 25px;
	line-height: 25px;
	border-radius: 3px;
	font-size: 14px;
	color: #fff;
}
.s-info {
	width: 73.4%;
	height: 4.0%;
	top: 29%;
	left: 50%;
	margin-left: -36.7%;
}
.s-times {
	font-size: 20px;
	font-size: 6.25vmin;
	margin-top: 8%;
	text-align: center;
}
.s-t {
	margin-top: 10%;
	color: #555;
	font-size: 13px;
	font-size: 4.06vmin;
	text-align: center;
}
.st-p {
    box-sizing: border-box;
    padding: 0 5%;
}
.s-s {
	text-align: center;
	margin-top: 2%;
}
.s-s span {
	display: inline-block;
	border-top: 8px solid #555555;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 0px;
}
.s-area {
	width: 85.5%;
	height: 36.8%;
	left: 50%;
	top: 52%;
	margin-left: -42.75%;
	background-image: url('https://atths.jzb.com/website/fe/lottery/images/sbg.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
#scratch {
	/*width: 210px;*/
	width: 65.8%;
	height: 21.5%;
	margin: 0px;
	position: absolute;
	left: 50%;
	top: 50%;
}
.s-t {
	width: 100%;
	top: 83%;
	text-align: center;
	font-size: 13px;
	font-size: 4.06vmin;
	color: #555;
	line-height: 18px;
	line-height: 5.625vmin;
}
@-webkit-keyframes bounceIn {
    0% {
        opacity: 0;
        -webkit-transform: scale(.3);
        transform: scale(.3)
    }
    50% {
        opacity: 1;
        -webkit-transform: scale(1.05);
        transform: scale(1.05)
    }
    70% {
        -webkit-transform: scale(.9);
        transform: scale(.9)
    }
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
    }
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        -webkit-transform: scale(.1);
        -ms-transform: scale(.1);
        transform: scale(.1)
    }
    50% {
        opacity: 1;
        -webkit-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3)
    }
    70% {
        -webkit-transform: scale(.7);
        -ms-transform: scale(.7);
        transform: scale(.7)
    }
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1)
    }
}

.bounceIn {
	display: inline-block;
    -webkit-animation: bounceIn .9s;
    animation: bounceIn .9s;
}

</style>
