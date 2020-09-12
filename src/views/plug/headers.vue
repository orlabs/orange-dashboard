<template>
  <div class="plug-container">
    <el-row>
        <el-col :span="12"  :offset="14">
            <el-button icon="el-icon-tickets" @click="handleVisible">{{buttonViewTitle}}</el-button>
            <el-button type="primary" @click="dialogPlugVisible = true" icon="el-icon-caret-right">启动该插件</el-button>
            <el-button icon="el-icon-menu" @click="dialogAddPlugVisible = true">添加选择器</el-button>
            <el-button icon="el-icon-refresh" @click="handleSyncShow">同步配置</el-button>
        </el-col>
    </el-row>
    <el-row v-show="initVisible === false">
        <el-col :span="6" :offset="0">
            <el-card>
                <h1 class="m-xs">选择器列表</h1>
                <span class="no-margins"><v-icon name="hand-pointer" /> 拖动改变执行顺序</span>
            </el-card>
        </el-col>
      <el-col :span="18" :offset="0">
          <el-card>
              <h1 class="m-xs">选择器-规则列表</h1>
              <span class="no-margins"><v-icon name="hand-pointer" /> 在列表之间拖动以改变规则顺序</span>
          </el-card>
      </el-col>
    </el-row>
    <el-row v-show="initVisible === true">
      <el-col :span="8" :offset="16">

      </el-col>
      <el-col :span="24" :offset="0">
          <el-card>
              <json-viewer class="json-viewer" :value="initData" :expand-depth=4 sort></json-viewer>
          </el-card>
      </el-col>
    </el-row>
    <el-dialog
              title="headers设置"
              :visible.sync="dialogPlugVisible"
              width="30%"
              :before-close="handleClose">
        <span>确定要开启headers吗？</span>
        <span slot="footer" class="dialog-footer">
         <el-button @click="dialogPlugVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleEnable">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog
              title="添加选择器"
              :visible.sync="dialogAddPlugVisible"
              width="50%"
              :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" class="demo-form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="请选择类型">
                    <el-option
                            v-for="item in selectorType"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规则" v-show="form.type === 1">
                <el-select v-model="form.judgeType" placeholder="请选择规则">
                    <el-option
                            v-for="item in ruleJudgeTypes"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
                <el-input v-show="form.judgeType === 3" v-model="form.expression" style="width: 280px" placeholder="规则表达式，示例：(v[1] or v[2]) and v[3]"></el-input>
                <ul style="padding-inline-start:0px" class="conditions-row">
                    <li v-for="(conditions, index) in form.conditions" :key="index">
                        <el-select v-model="conditions.type" placeholder="请选择规则">
                            <el-option
                                    v-for="item in conditionTypes"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                        <el-select v-model="conditions.operator" placeholder="请选择规则">
                            <el-option
                                    v-for="item in conditionOperators"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                        <el-input v-model="conditions.value" placeholder="value" style="width: 30%"></el-input>
                        <i
                         class="el-icon-plus"
                         @click="form.conditions.push({
                            type: 'URI',
                            operator: 'match',
                            value: ''
                         })"></i>
                        <i class="el-icon-close"  @click="form.conditions.length > 1 && form.conditions.splice(index, 1)"></i>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="处理">
                <el-select v-model="form.handleContinue" placeholder="请选择处理方式">
                    <el-option
                            v-for="item in selectorContinues"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
                <el-select v-model="form.handleLog" placeholder="请选择日志处理">
                    <el-option
                            v-for="item in selectorLogs"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-checkbox v-model="form.enable" label="启用" name="enable"></el-checkbox>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button @click="dialogAddPlugVisible = false">取 消</el-button>
         <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog
          title="确定要从存储中同步配置吗?"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
      <json-viewer class="json-viewer" :value="syncData" :expand-depth=4 sort></json-viewer>
      <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisible = false">取 消</el-button>
     <el-button type="primary" @click="handleSyncData">确定同步</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as $http from '@/api/headers'
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

export default {
  name: 'Headers',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      form: {
        name: '',
        type: 0,
        judgeType: 0,
        conditions: [
          {
            type: 'URI',
            operator: 'match',
            value: ''
          }
        ],
        expression: '',
        handleLog: false,
        handleContinue: true,
        enable: false
      },
      rules: {
        name: [{ required: true, message: '请输入选择器名称', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        handleLog: [
          { required: true, message: '请选择是否记录日志', trigger: 'change' }
        ],
        handleContinue: [
          { required: true, message: '请选择是否继续后续选择器', trigger: 'change' }
        ],
        enable: [
          { required: true, message: '请选择选择器开关', trigger: 'change' }
        ]
      },
      initVisible: false,
      dialogVisible: false,
      dialogPlugVisible: false,
      dialogAddPlugVisible: false,
      syncData: '',
      initData: '',
      buttonViewTitle: '数据视图',
      conditionTypes: [
        {
          'key': 'Random',
          'value': 'Random'
        },
        {
          'key': 'URI',
          'value': 'URI'
        },
        {
          'key': 'Header',
          'value': 'Header'
        },
        {
          'key': 'Query',
          'value': 'Query'
        },
        {
          'key': 'Cookie',
          'value': 'Cookie'
        },
        {
          'key': 'PostParams',
          'value': 'PostParams'
        },
        {
          'key': 'IP',
          'value': 'IP'
        },
        {
          'key': 'UserAgent',
          'value': 'UserAgent'
        },
        {
          'key': 'Host',
          'value': 'Host'
        },
        {
          'key': 'Referer',
          'value': 'Referer'
        },
        {
          'key': 'Method',
          'value': 'HttpMethod'
        }
      ],
      conditionOperators: [
        {
          'key': 'match',
          'value': 'Match'
        },
        {
          'key': 'not_match',
          'value': 'Not Match'
        },
        {
          'key': '=',
          'value': '>='
        },
        {
          'key': '!=',
          'value': '!='
        },
        {
          'key': '>',
          'value': '>'
        },
        {
          'key': '>=',
          'value': '≥'
        },
        {
          'key': '<',
          'value': '<'
        },
        {
          'key': '<=',
          'value': '>≤'
        },
        {
          'key': '%',
          'value': '%'
        }
      ],
      selectorType: [
        {
          'key': 0,
          'value': '全流量'
        },
        {
          'key': 1,
          'value': '自定义流量'
        }
      ],
      ruleJudgeTypes: [
        {
          'key': 0,
          'value': '单一条件匹配'
        },
        {
          'key': 1,
          'value': 'and匹配'
        },
        {
          'key': 2,
          'value': 'or匹配'
        },
        {
          'key': 3,
          'value': '复杂匹配'
        }
      ],
      selectorContinues: [
        {
          'key': true,
          'value': '继续后续选择器'
        },
        {
          'key': false,
          'value': '略过后续选择器'
        }
      ],
      selectorLogs: [
        {
          'key': false,
          'value': '不记录日志'
        },
        {
          'key': true,
          'value': '记录日志'
        }
      ]
    }
  },
  created() {
    this.handleInitData()
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { name, type, judgeType, conditions, expression, handleLog, handleContinue, enable } = this.form
          const contentObj = {
            'name': name,
            'type': type,
            'judge': {
              'type': judgeType,
              'expression': expression,
              'conditions': conditions
            },
            'handle': {
              'continue': handleContinue,
              'log': handleLog
            },
            'enable': enable
          }

          if (type === 1) {
            if (!Array.isArray(conditions)) {
              this.$message.error('conditions是数组')
              return
            }

            if (judgeType === 0 && conditions.length > 1) {
              this.$message.error('单一条件匹配只能填写一条规则')
              return
            }
            if (judgeType !== 0 && conditions.length === 1) {
              this.$message.error('AND/OR/复杂匹配，需填写多条规则')
              return
            }
            contentObj.judge = {
              type: judgeType,
              conditions
            }

            if (judgeType === 3) {
              contentObj.judge.expression = expression
            }
          } else if (type === 0) {
            contentObj.judge = {}
          }
          $http.addSelectors(JSON.stringify(contentObj)).then(response => {
            this.resetForm()
            this.$message.success(`添加成功`)
          })
        }
      })
    },
    resetForm() {
      this.form = {
        name: '',
        type: 0,
        judgeType: 0,
        conditions: [
          {
            type: 'URI',
            operator: 'match',
            value: ''
          }
        ],
        expression: '',
        handleLog: false,
        handleContinue: true,
        enable: false
      }
    },
    handleVisible() {
      if (this.initVisible === true) {
        this.initVisible = false
        this.buttonViewTitle = '数据视图'
      } else {
        this.initVisible = true
        this.buttonViewTitle = '表格视图'
      }
    },
    handleInitData() {
      $http.getSelectors().then(response => {
        console.log(response)
        this.initData = response.data.data
      })
    },
    handleSyncData() {
      $http.syncPlugData().then(response => {
        if (response.data.success) {
          this.dialogVisible = false
        }
      })
    },
    handleSyncShow() {
      $http.fetchConfig().then(response => {
        this.dialogVisible = true
        this.syncData = response.data.data
      })
    },
    handleEnable() {
      $http.enablePlug().then(response => {
        this.dialogPlugVisible = false
      })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.plug {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
.plug-container {
    .el-card {
        margin-top: 10px;
        margin-left: 5px;
    }
}

a {
    color: #337ab7;
}
.hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #f8f8f8;
    -webkit-text-size-adjust: none;
}
.code {
    background-color: #F9F2F4;
    border-radius: 4px;
    color: #ca4440;
    font-size: 90%;
    padding: 2px 4px;
    white-space: nowrap;
}
.json-viewer {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
}
.conditions-row {
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .el-select {
            width: 120px;
        }

        .el-input {
            width: 100px;
        }

        i {
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>
