<template>
  <div class="my-footer text-center">
    <div class="row py-3">
      <div class="col-12">
        <p>Designed and Implemented with<i class="fa fa-heart" aria-hidden="true"></i> by team PenL</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.my-footer {
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: white !important;
  width: 100%;
  margin-top: 10rem;
  position: relative;
  bottom: 0px;
}

ul li {
  margin: 0rem 1.5rem;
}
.fa-heart{
  color: #64ffda;
}
</style>
