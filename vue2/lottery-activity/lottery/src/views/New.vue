<template>
    <section class="obg">
       	<div class="ojndj pa zoomInDown">
       		<img src="https://atths.jzb.com/website/fe/lottery/images/ojndj.png" alt="">
       	</div>
       	<div class="n-title pa">
   			<img src="https://atths.jzb.com/website/fe/lottery/images/f4.png" alt="">
   		</div>
   		<div class="n-gift pa">
   			<img src="https://atths.jzb.com/website/fe/lottery/images/ngif.png" alt="">
   		</div>
   		<div class="n-t pa">
   			<p>春节期间奖品将在10个工作日发放并通知</p>
   		</div>
        <div class="n-f pa fc">
            <router-link to="/">
                <p>邀请好友，赢取电视机/游戏机等新年礼品！></p>
            </router-link>
        </div>
    </section>
</template>

<script>
export default{
    data () {
        return {
        }
    },
    created () {
      window.gaFn('新用户领奖页')
    }
}
</script>

<style>
.n-title {
	width: 72.7%;
	height: 4.16%;
	left: 50%;
	top: 30%;
	margin-left: -36.35%;
}
.n-gift {
	width: 80.5%;
	height: 31.5%;
	left: 50%;
	top: 40%;
	margin-left: -40.25%;
}
.n-t {
	width: 80.5%;
	left: 50%;
	top: 75%;
	margin-left: -40.25%;
	font-size: 13px;
	font-size: 4.06vmin;
	color: #555;
	line-height: 20px;
	line-height: 6.25vmin;
}
.n-f {
    width: 86%;
    left: 50%;
    top: 85%;
    margin-left: -43%;
    font-size: 13px;
    font-size: 4.06vmin;
    text-decoration: underline;
}
</style>
