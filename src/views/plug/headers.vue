<template>
    <plug-main
            :titileName="title"
            @getSelectors="getSelectors"
            @addSelectors="addSelectors"
            @syncPlugData="syncPlugData"
            @fetchConfig="fetchConfig"
            @enablePlug="enablePlug"
            @getRules="getRules"
            @delSelectors="delSelectors"
            @delRules="delRules"
            @oderSelectors="oderSelectors"
            @orderRules="orderRules"
            @addRules="addRules"
            @updateRules="updateRules"
            @updateSelectors="updateSelectors"
    />
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
        if (response.data.success) {
          self.resetForm()
          this.getSelectors(self)
          self.dialogAddPlugVisible = false
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
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
        self.selectors = response.data.data.selectors
        for (var rule in response.data.data.selectors) {
          self.selectPlug(response.data.data.selectors[rule])
          return
        }
      })
    },
    getRules(self, id) {
      $http.getRules(id).then(response => {
        self.rulesData = response.data.data.rules
      })
    },
    delSelectors(self, id) {
      $http.deleteSelectors(id).then(response => {
        if (response.data.success) {
          this.getSelectors(self)
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    updateSelectors(self, data) {
      $http.updateSelectors(data).then(response => {
        if (response.data.success) {
          this.getSelectors(self)
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    delRules(self, selectorsId, id) {
      $http.deleteRules(selectorsId, id).then(response => {
        if (response.data.success) {
          this.getRules(self, selectorsId)
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    addRules(self, selectorsId, data) {
      $http.addRules(selectorsId, data).then(response => {
        if (response.data.success) {
          self.resetRulesForm()
          this.getRules(self, selectorsId)
          self.dialogAddPlugRulesVisible = false
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    updateRules(self, selectorsId, data) {
      $http.updateRules(selectorsId, data).then(response => {
        if (response.data.success) {
          this.getRules(self, selectorsId)
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    oderSelectors(self, order) {
      $http.oderSelectors(order).then(response => {
        if (response.data.success) {
          this.getSelectors(self)
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    },
    orderRules(self, selectorsId, order) {
      $http.orderRules(selectorsId, order).then(response => {
        if (response.data.success) {
          this.getRules(self, selectorsId)
          this.$message.success(response.data.msg)
        } else {
          this.$message.error(response.data.msg)
        }
      })
    }
  }
}
</script>
