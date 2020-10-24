<template>
  <div>
    <div class="row  px-5 text-center">
      <div class="col-12 col-md-6 ml-md-auto mr-md-auto">
        <div class="hero-text-first">
          <div class="card shadow my-5 px-5 light-green-bg">
            <div class="card-body">
              <h1 class="heading mt-3 card-title playful">
                Create a Sleek Username
              </h1>

              <h3 class="text-muted playful card-subtitle">
                This is how you will be known in the room
              </h3>

              <div class="card-text mt-5 mb-5">
                <form @submit.prevent="createUser">
                  <div class="form-group">
                    <input
                      type="text"
                      required
                      class="form-control"
                      placeholder="Enter username"
                      v-model="name"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-lg mt-5 px-4 py-2 cta-btn"
                  >
                    Submit
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
  name: "Continue",

  data() {
    return {
      name: null,
      error: null
    };
  },

  methods: {
    createUser() {
      let create_user_edpoint = `api/v1/user`;

      let method = "POST";
      let formData = new FormData();

      formData.append("username", this.name);

      apiService(create_user_edpoint, method, formData)
        .then(data => {
          window.sessionStorage.setItem("username", data.data.username);
          window.sessionStorage.setItem("user_id", data.data.id);

          if (Object.keys(this.$route.query).length > 0) {
            var room_slug = this.$route.query.room_slug;
            var join_room_endpoint = `api/v1/room/${room_slug}/join`;

            apiService(join_room_endpoint, method, { user_id: data.data.id })
              .then(data => {
                this.$router.push({
                  name: "room-detail",
                  params: { room_slug: data.slug }
                });
              })
              .catch(error => {
                this.error = error;
              });
          } else {
            this.$router.push({
              name: "create-room"
            });
          }
        })
        .catch(error => {
          this.error = error;
        });
    }
  },

  mounted: function() {
    document.title = "PenL | Join Room";
  }
};
</script>

<style scoped></style>
