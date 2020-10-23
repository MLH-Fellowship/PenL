<template>
<div>
  <div class="row  px-5 txt-center">
    <div class="col-12 col-md-6">
      <div class="hero-text-first">
        <small
          class="color-purple glegoo mb-3 ml-1 typewrite "
          data-period="1500"
          data-type='[ " Hi there developer😊 on PenL yo can..." ]'
        >
          <span class="wrap"></span>
        </small>
        <h1 class="heading mt-3 playful">Play and learn</h1>
        <h1 class="sub-heading text-muted mt-3 playful">
         Learn in a Fun Way.
        </h1>
        <h3 class="mt-5 text-muted text-justify">
          PenL allows you to learn core programming concepts along with 
          friends in a fun way.
          All you have to do is create a room, invite your friends, 
          and you know how this goes...
        </h3>
        <router-link :to="{ name: 'join' }">
            <button class="btn btn-lg mt-5 px-4 py-2 cta-btn">
                Create Room
            </button>
        </router-link>
      </div>
    </div>

    <div class="col-12 col-md-6 hero-text-second text-center py-md-5 px-5">
      <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
        <circle cx="170" cy="170" r="160" stroke="#E2007C"/>
        <circle cx="170" cy="170" r="135" stroke="#64ffda"/>
        <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
        <circle cx="170" cy="170" r="85" stroke="#64ffda"/>
         <circle cx="170" cy="170" r="60" stroke="#E2007C"/>
	    </svg>
    </div>
  </div>

  <div class="row px-5 hero-text-second text-center">
    <div class="col-12 text-center">
      <h1 class="heading mt-3 playful">How Does PenL Works ?!</h1>
    </div>
    <div class="col-12">


    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "home",

  mounted: function() {
    document.title = "PenL | Home";
  }
};
</script>

<style lang='scss' scoped>
  
.loader {
	max-width: 30rem;
	width: 100%;
	height: auto;
	stroke-linecap: round;
}

circle {
	fill: none;
	stroke-width: 3.5;
	animation-name: preloader;
	animation-duration: 3s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
	transform-origin: 170px 170px;
	will-change: transform;
}

circle:nth-of-type(1) {
	stroke-dasharray: 550px;
}

circle:nth-of-type(2) {
	stroke-dasharray: 500px;
}

circle:nth-of-type(3) {
	stroke-dasharray: 450px;
}

circle:nth-of-type(4) {
	stroke-dasharray: 300px;
}

@keyframes preloader {
	50% {
		transform: rotate(360deg);
	}
}

@for $i from 1 through 4 {
		&:nth-of-type(#{$i}) {
			animation-delay: -#{$i * 0.15}s;
		}
	}

</style>
