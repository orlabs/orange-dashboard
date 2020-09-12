<template>
    <plug-main :titileName="title" @getSelectors="getSelectors" @addSelectors="addSelectors" @syncPlugData="syncPlugData" @fetchConfig="fetchConfig" @enablePlug="enablePlug" />
</template>
<script>
import * as $http from '@/api/headers'
import { PlugMain } from './components'
export default {
  name: 'Headers',
  data() {
    return {
      title: 'headers'
    }
  },
  components: {
    PlugMain
  },
  methods: {
    addSelectors(self, data) {
      $http.addSelectors(data).then(response => {
        self.resetForm()
        this.$message.success(`添加成功`)
      })
    },
    syncPlugData(self) {
      $http.syncPlugData().then(response => {
        if (response.data.success) {
          self.dialogVisible = false
        }
      })
    },
    fetchConfig(self) {
      $http.fetchConfig().then(response => {
        self.dialogVisible = true
        self.syncData = response.data.data
        this.$message.success(response.data.msg)
      })
    },
    enablePlug(self) {
      $http.enablePlug().then(response => {
        if (response.data.success) {
          self.dialogPlugVisible = false
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    getSelectors(self) {
      $http.getSelectors().then(response => {
        self.initData = response.data.data
      })
    }
  }
}
</script>
