<template>
  <div class="plugins-container">
    <el-row>
      <el-col :span="6" :offset="0" v-for="plugin_stat in plugin_stats" :key="plugin_stat.name">
        <el-card shadow="hover">
          <h1 class="plugin-name">{{plugin_stat.name}}</h1>
          <div>
            <el-button type="primary" size="mini" round v-if="plugin_stat.enable === true">启用</el-button>
            <el-button type="danger" size="mini" round v-if="plugin_stat.enable === false">禁用</el-button>
          </div>
          <el-divider class="el-card-line"></el-divider>
          <el-tooltip effect="dark" content="启用规则条数">
            <el-button size="mini" icon="el-icon-success">
              <span>{{ plugin_stat.active_rule_count}}</span>
            </el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="禁用规则条数">
            <el-button size="mini" icon="el-icon-error">
              <span>{{ plugin_stat.inactive_rule_count }}</span>
            </el-button>
          </el-tooltip>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPlugins } from '@/api/plugins'

export default {
  name: 'Plugins',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      plugin_stats: [
        {
          name: 'stat',
          active_rule_count: 0,
          active_selector_count: 0,
          inactive_rule_count: 0,
          inactive_selector_count: 0
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getPlugins().then(response => {
        const {
          success,
          data
        } = response.data
        if (success !== true) {
          this.$message.error('插件统计数据请求失败。')
        } else {
          let plugins = data.plugins
          plugins = Object.values(plugins).filter(function(plugin) {
            return plugin.name !== 'stat'
          })
          this.plugin_stats = [...plugins]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .plugins {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .plugins-container  {
    .el-card {
      margin-right: 5px;
      margin-bottom: 5px;
      text-align: center;
    }
    .el-card-line {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .plugin-name {
      color: #676a6c;
      font-size: 20px;
      margin-bottom: 8px;
      margin-top: 0;
    }
    .fa-3x {
      height: 30px;
      width: 30px;
      color: #676a6c;
    }
    .fa-4x {
      height: 40px;
      width: 40px;
      color: #676a6c;
    }
    .m-xs {
      color: #aaa;
      font-size: 18px;
    }
    .no-margins {
      color: #aaa;
      font-size: 13px;
    }

  }
</style>
