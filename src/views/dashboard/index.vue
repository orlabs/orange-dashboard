<template>
  <div class="dashboard-container">
    <div class="row content-header">
      <div class="col-md-12">
        <div class="pull-left">
          <h4 class="head_title">Orange概览</h4> <span id="node_tip">&raquo; 该节点启动于&nbsp;<span id="start_time_span"></span></span>
        </div>
        <div class="pull-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
