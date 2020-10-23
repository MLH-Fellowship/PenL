<template>
<div>
  <div class="row  px-5 text-center">
    <div class="col-12 col-md-6 ml-md-auto mr-md-auto">
      <div class="hero-text-first">
        <div class="card shadow my-5 px-5 light-green-bg">

            <div class="card-body">
                <h1 class="heading mt-3 card-title playful">
                   Hi <span class="color-purple ">{{ username }}</span> <span class="wave">👋</span>
                </h1>

                <h3 class="text-muted playful card-subtitle">
                    give your room a sexy name.
                </h3>

                <div class="card-text mt-5 mb-5">
                    <form @submit.prevent="createRoom">    
                        <div class="form-group">
                            <input 
                                type="text" 
                                required 
                                class="form-control" 
                                placeholder="Enter room name"
                                v-model="room_name"
                            >
                        </div>
                        <button 
                            type="submit" 
                            class="btn btn-lg mt-5 px-4 py-2 cta-btn"
                        >
                            Create Room
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { apiService } from "@/common/api.service.js";

export default {
  name: "CreateRoom",

  data(){
      return {
          username: window.sessionStorage.getItem('username'),
          room_name: null,
          host_id: parseInt(window.sessionStorage.getItem('user_id')),
          error: null
      }
  },

  methods: {
      createRoom() {
        let create_room_edpoint = `api/v1/room`;

        let method = "POST";
        let formData = new FormData();

        formData.append("room_name", this.room_name);
        formData.append("host_id", this.host_id);
        
        apiService(create_room_edpoint, method, formData)
            .then(data => {     
                this.$router.push({
                    name: "room-detail",
                    params: { room_slug: data.data.slug }
                        
                });   
            })
            .catch(error => {
                this.error = error;
            }
        );
      }
  },

  mounted: function() {
    document.title = "PenL | Create Room";
  }
}

</script>

<style scoped>
    .wave {
        animation-name: wave-animation;  
        animation-duration: 2.5s;      
        animation-iteration-count: infinite;  
        transform-origin: 70% 70%;       
        display: inline-block;
    }

    @keyframes wave-animation {
        0% { transform: rotate( 0.0deg) }
        10% { transform: rotate(14.0deg) }  
        20% { transform: rotate(-8.0deg) }
        30% { transform: rotate(14.0deg) }
        40% { transform: rotate(-4.0deg) }
        50% { transform: rotate(10.0deg) }
        60% { transform: rotate( 0.0deg) }  
        100% { transform: rotate( 0.0deg) }
    }

</style>
