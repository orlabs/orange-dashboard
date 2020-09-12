<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24"  :offset="0">
          <el-card>
              <h1 class="m-xs"></h1>
              <span class="no-margins">更多关于Orange的信息请参看官网<a href="http://orange.sumory.com/">Orange Documents & News</a> 和 <a href="https://github.com/orlabs/orange">Github</a></span>
              <h1 class="m-xs"></h1>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Help',
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
a {
    color: #337ab7;
}
</style>
