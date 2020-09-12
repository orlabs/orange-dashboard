<template>
  <div class="status-container">
    <el-row>
      <el-col :span="4" :offset="0">
          <el-card>
              <v-icon name="circle-notch" class="fa-4x"/>
              <h1 class="m-xs">{{status.orange_version}}</h1>
              <span class="no-margins">Orange</span>
          </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
          <el-card>
              <v-icon name="circle-notch" class="fa-4x"/>
              <h1 class="m-xs">{{status.nginx_version}}</h1>
              <span class="no-margins">OpenResty</span>
          </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
          <el-card>
              <v-icon name="user-shield" class="fa-4x"/>
              <h1 class="m-xs">{{status.ngx_lua_version}}</h1>
              <span class="no-margins">ngx_lua</span>
          </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
          <el-card>
              <v-icon name="cogs" class="fa-4x"/>
              <h1 class="m-xs">{{status.worker_count}}</h1>
              <span class="no-margins">Workers</span>
          </el-card>
      </el-col>
      <el-col :span="4" :offset="0">
          <el-card>
              <v-icon name="at" class="fa-4x"/>
              <h1 class="m-xs">{{status.address}}</h1>
              <span class="no-margins">Address</span>
          </el-card>
      </el-col>
      <el-col :span="4" >
          <el-card>
              <v-icon name="user-clock" class="fa-4x"/>
              <h1 class="m-xs">{{status.load_timestamp}}</h1>
              <span class="no-margins">Uptime</span>
          </el-card>
      </el-col>
    </el-row>

    <el-row>
        <el-col :span="12">
          <el-card>
              <div class="m-b-md" style="display:inline-block;width:28%;">
                  <v-icon name="ellipsis-h" class="fa-3x"/>
                  <h1 class="m-xs">{{status.total_count}}</h1>
                  <span class="no-margins">Total Requests</span>
              </div>
              <div class="m-b-md" style="display:inline-block;width:28%;">
                  <v-icon name="circle" class="fa-3x"/>
                  <h1 class="m-xs">{{status.total_success_count}}</h1>
                  <span class="no-margins">Success</span>
              </div>
              <div class="m-b-md" style="display:inline-block;width:28%;">
                  <v-icon name="hourglass-half" class="fa-3x"/>
                  <h1 class="m-xs">{{status.qps}}</h1>
                  <span class="no-margins">Req/s</span>
              </div>
          </el-card>
        </el-col>
        <el-col :span="12">
            <el-card>
                <div class="m-b-md" style="display:inline-block;width:23%;">
                    <v-icon name="check" class="fa-3x" style="color: #3c763d;"/>
                    <h1 class="m-xs">{{status.request_2xx}}</h1>
                    <span class="no-margins">
                            2xx Req
                    </span>
                </div>
                <div class="m-b-md" style="display:inline-block;width:24%;">
                    <v-icon name="check" class="fa-3x"/>
                    <h1 class="m-xs">{{status.request_3xx}}</h1>
                    <span class="no-margins">
                            3xx Req
                    </span>
                </div>
                <div class="m-b-md" style="display:inline-block;width:24%;">
                    <v-icon name="exclamation-triangle" class="fa-3x" style="color: #ed5565;"/>
                    <h1 class="m-xs">{{status.request_4xx}}</h1>
                    <span class="no-margins">
                            4xx Req
                    </span>
                </div>
                <div class="m-b-md" style="display:inline-block;width:24%;">
                    <v-icon name="times-circle" class="fa-3x" style="color: #ed9855;"/>
                    <h1 class="m-xs">{{status.request_5xx}}</h1>
                    <span class="no-margins">
                            5xx Req
                    </span>
                </div>
            </el-card>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
          <el-card>
              <div class="widget text-center" style="width:100%;display:inline-block">
                  <div class="m-b-md" style="display:inline-block;width:28%;">
                    <v-icon name="clock" class="fa-3x"/>
                    <h1 class="m-xs">{{status.total_request_time}}</h1>
                    <span class="no-margins">
                            Total Request Time(seconds)
                    </span>
                  </div>

                  <div class="m-b-md" style="display:inline-block;width:29%;">
                    <v-icon name="arrow-down" class="fa-3x"/>
                    <h1 class="m-xs">{{status.traffic_read/1024/1024}}</h1>
                    <span class="no-margins">
                            Total Read Traffic(mbytes)
                    </span>
                  </div>

                  <div class="m-b-md" style="display:inline-block;width:29%;">
                    <v-icon name="arrow-up" class="fa-3x"/>
                    <h1 class="m-xs">{{status.traffic_write/1024/1024}}</h1>
                    <span class="no-margins">
                            Total Write Traffic(mbytes)
                    </span>
                  </div>
              </div>
          </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
          <el-card>
              <div class="widget text-center" style="width:100%;display:inline-block">
                  <div class="m-b-md" style="display:inline-block;width:23%;">
                    <v-icon name="circle" class="fa-3x"/>
                    <h1 class="m-xs">{{status.con_active}}</h1>
                    <span class="no-margins">
                            Conn Active
                    </span>
                  </div>

                  <div class="m-b-md" style="display:inline-block;width:24%;">
                    <v-icon name="dot-circle" class="fa-3x"/>
                    <h1 class="m-xs">{{status.con_idle}}</h1>
                    <span class="no-margins">
                            Conn Idle
                    </span>
                  </div>

                  <div class="m-b-md" style="display:inline-block;width:24%;">
                    <v-icon name="arrow-circle-down" class="fa-3x"/>
                    <h1 class="m-xs">{{status.con_reading}}</h1>
                    <span class="no-margins">
                            Conn Reading
                    </span>
                  </div>

                  <div class="m-b-md" style="display:inline-block;width:24%;">
                    <v-icon name="arrow-circle-down" class="fa-3x"/>
                    <h1 class="m-xs">{{status.con_writing}}</h1>
                    <span class="no-margins">
                            Conn Writing
                    </span>
                  </div>
              </div>
          </el-card>
      </el-col>
    </el-row>
    <el-row>
      <div class="widget text-center">
         <el-card>
            <v-icon name="folder-open" class="fa-4x"/>
            <h1 class="m-xs">{{status.ngx_prefix}}</h1>
            <span class="no-margins">
                    Nginx Prefix
            </span>
         </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStatus } from '@/api/status'

export default {
  name: 'Status',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      status: {
        address: '-',
        con_active: '-',
        con_idle: '-',
        con_reading: '-',
        con_rw: 0,
        con_writing: '-',
        load_timestamp: '-',
        nginx_version: '0.0.0',
        ngx_lua_version: '0.0.0',
        ngx_prefix: '-',
        orange_version: '0.0.0',
        request_2xx: 0,
        request_3xx: 0,
        request_4xx: 0,
        request_5xx: 0,
        start_time: 0,
        timestamp: 0,
        total_count: 0,
        total_request_time: 0,
        total_success_count: 0,
        traffic_read: 0,
        traffic_write: 0,
        worker_count: 0,
        qps: 0
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getDays(loadTimestamp) {
      var timemiles = (new Date()).getTime() / 1000 - loadTimestamp
      var days = Math.floor(timemiles / (3600 * 24))
      timemiles -= days * 3600 * 24
      var hours = Math.floor(timemiles / 3600)
      timemiles -= hours * 3600
      var minutes = Math.floor(timemiles / 60)
      return days + '天 ' + hours + '小时 ' + minutes + '分'
    },
    fetchData() {
      this.listLoading = true
      getStatus().then(response => {
        const {
          address,
          con_active,
          con_idle,
          con_reading,
          con_rw,
          con_writing,
          load_timestamp,
          nginx_version,
          ngx_lua_version,
          ngx_prefix,
          orange_version,
          request_2xx,
          request_3xx,
          request_4xx,
          request_5xx,
          start_time,
          timestamp,
          total_count,
          total_request_time,
          total_success_count,
          traffic_read,
          traffic_write,
          worker_count,
          qps
        } = response.data.data

        this.status = {
          address: address,
          con_active: con_active,
          con_idle: con_idle,
          con_reading: con_reading,
          con_rw: con_rw,
          con_writing: con_writing,
          load_timestamp: this.getDays(load_timestamp),
          nginx_version: nginx_version,
          ngx_lua_version: ngx_lua_version,
          ngx_prefix: ngx_prefix,
          orange_version: orange_version,
          request_2xx: request_2xx,
          request_3xx: request_3xx,
          request_4xx: request_4xx,
          request_5xx: request_5xx,
          start_time: start_time,
          timestamp: timestamp,
          total_count: total_count,
          total_request_time: total_request_time,
          total_success_count: total_success_count,
          traffic_read: traffic_read,
          traffic_write: traffic_write,
          worker_count: worker_count,
          qps: qps == null ? 0 : qps
        }
        console.log(this.status)
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
.status-container  {
    .el-card {
        margin-right: 5px;
        margin-bottom: 5px;
        text-align: center;
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
