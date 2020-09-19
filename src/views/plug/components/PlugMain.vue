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
               <div>
                   <h1 class="m-xs">选择器列表</h1>
                   <span class="no-margins"><v-icon name="hand-pointer" /> 拖动改变执行顺序</span>
                   <el-button icon="el-icon-menu" @click="oderSelectors">保存排序</el-button>
               </div>
               <ul style="padding-inline-start:0px">
                    <li class="plug-selectors-item" v-for="child in selectors" :key="child.id" @click="selectPlug(child)" >
                        <h6 class="plug-selectors-item-title">{{child.name}}</h6>
                        <div>
                            <b class="plug-selectors-item-time"><v-icon style="width: 13px;height: 13px;" name="regular/clock" /> {{child.time}}</b>
                            <el-button class="plug-selectors-item-button" @click="delSelectors(child)">删除</el-button>
                            <el-button class="plug-selectors-item-button">编辑</el-button>
                        </div>
                    </li>
               </ul>
            </el-card>
        </el-col>
      <el-col :span="18" :offset="0">
          <el-card>
              <div>
                  <h1 class="m-xs">选择器{{selectName}}规则列表</h1>
                  <span class="no-margins"><v-icon name="hand-pointer" /> 在列表之间拖动以改变规则顺序</span>
                  <el-button icon="el-icon-menu" @click="orderRules">保存排序</el-button>
                  <el-button icon="el-icon-menu" @click="dialogAddPlugRulesVisible = true">添加规则</el-button>
              </div>
              <ul style="padding-inline-start:0px">
                  <div v-show="rulesData.length === 0" class="alert alert-warning" style="margin: 25px 0 10px 0;">
                      <p class="p-class">该选择器下没有规则,请添加!</p>
                  </div>
                  <li class="plug-selectors-item" :class="{'info-element':item.enable}" v-for="item in rulesData" :key="item.id">
                      <table class="table table-hover single-rule-table">
                          <tbody>
                            <tr>
                                <td class="center rule-enable-td">
                                    <span v-show="item.enable" class="label label-primary">已启用</span>
                                    <span v-show="item.enable === false" class="label label-warning">已禁用</span>
                                </td>
                                <td class="rule-name-td">
                                    <b class="namep">{{item.name}}</b>
                                </td>
                                <td class="left rule-condition-td">
                                    <p v-show="item.judge.type == 0">
                                        <b>类型</b>: 单一条件匹配
                                    </p>
                                    <p v-show="item.judge.type == 1">
                                        <b>类型</b>: and匹配
                                    </p>

                                    <p v-show="item.judge.type == 2">
                                        <b>类型</b>: or匹配
                                    </p>

                                    <p v-show="item.judge.type == 3">
                                        <b>类型</b>: 复杂规则 <br/>
                                        <b>表达式</b>: {{item.judge.expression}}
                                    </p>

                                    <p class="conditionp" v-for="cd in item.judge.conditions"  :key="cd.key">{{cd.type}}:{{cd.operator}} {{cd.value}}</p>
                                </td>
                                <td class="left rule-extractor-td">
                                    <p class="extractorp">
                                        <span  v-show="item.extractor.type === 1"> <b>变量提取类型</b>:  索引式提取  </span>
                                        <span  v-show="item.extractor.type === 2"> <b>变量提取类型</b>:  模板式提取  </span><br>
                                        <span v-for="ec in item.extractor.extractions" :key="ec.key">
                                          {  {{ec.type}}:{{ec.name}}  }<br>
                                        </span>
                                    </p>
                                </td>
                                <td class="left rule-urltmpl-td">
                                    <b>URI模板</b>:                             <br>
                                    <p class="urltmplp"></p>
                                    <b>记录日志</b>: {{item.handle.log}}
                                </td>
                                <td class="left" title="变更时间">
                                    <small>{{item.time}}</small>
                                </td>
                                <td class="center rule-op-td">
                                    <el-button class="plug-selectors-item-button">编辑</el-button>
                                    <el-button class="plug-selectors-item-button" @click="delRules(item)">删除</el-button>
                                </td>
                            </tr>
                          </tbody>
                      </table>
                  </li>
              </ul>
          </el-card>
      </el-col>
    </el-row>
    <el-row v-show="initVisible === true">
      <el-col :span="8" :offset="16">

      </el-col>
      <el-col :span="24"  :offset="0">
          <el-card>
              <json-viewer class="json-viewer" :value="initData" :expand-depth=4 sort></json-viewer>
          </el-card>
      </el-col>
    </el-row>
    <el-dialog
              title="插件设置"
              :visible.sync="dialogPlugVisible"
              width="30%"
              :before-close="handleClose">
        <span>确定要开启{{titileName}}吗？</span>
        <span slot="footer" class="dialog-footer">
         <el-button @click="dialogPlugVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleEnable">确定</el-button>
        </span>
    </el-dialog>
    <!-- add selector start -->
    <el-dialog
              title="添加选择器"
              :visible.sync="dialogAddPlugVisible"
              width="50%"
              :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" class="demo-form" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
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
                <el-select prop="handleLog" v-model="form.handleLog" placeholder="请选择日志处理">
                    <el-option
                            v-for="item in selectorLogs"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" prop="enable">
                <el-checkbox v-model="form.enable" label="启用" name="enable"></el-checkbox>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button @click="dialogAddPlugVisible = false">取 消</el-button>
         <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
    </el-dialog>
    <!-- add selector end -->
    <!-- add rules start -->
    <el-dialog
          title="添加规则"
          :visible.sync="dialogAddPlugRulesVisible"
          width="50%"
          :before-close="handleClose">
      <el-form :model="formRules" :rules="rulesRule" ref="formRules" class="demo-form" label-width="80px">
          <el-form-item label="名称" prop="name">
              <el-input v-model="formRules.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="规则">
              <el-select v-model="formRules.judge.type" placeholder="请选择规则">
                  <el-option
                          v-for="item in ruleJudgeTypes"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key">
                  </el-option>
              </el-select>
              <el-input v-show="formRules.judge.type === 3" v-model="form.expression" style="width: 280px" placeholder="规则表达式，示例：(v[1] or v[2]) and v[3]">
              </el-input>
              <ul style="padding-inline-start:0px" class="conditions-row">
                  <li v-for="(conditions, index) in formRules.judge.conditions" :key="index">
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
                              @click="formRules.judge.conditions.push({
                        type: 'URI',
                        operator: 'match',
                        value: ''
                     })"></i>
                      <i class="el-icon-close"  @click="formRules.judge.conditions.length > 1 && formRules.judge.conditions.splice(index, 1)"></i>
                  </li>
              </ul>
          </el-form-item>
          <el-form-item label="变量">
              <el-select v-model="formRules.extractor.type" placeholder="请选择变量">
                  <el-option
                          v-for="item in ruleExtractorType"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key">
                  </el-option>
              </el-select>
              <i
                      class="el-icon-plus"
                      @click="formRules.extractor.extractions.push({
                        type: 'URI',
                        operator: 'match',
                        value: ''
                     })"></i>
              <ul style="padding-inline-start:0px" class="conditions-row">
                  <li v-for="(conditions, index) in formRules.extractor.extractions" :key="index">
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
                              @click="formRules.extractor.extractions.push({
                        type: 'URI',
                        operator: 'match',
                        value: ''
                     })"></i>
                      <i class="el-icon-close"  @click="formRules.extractor.extractions.splice(index, 1)"></i>
                  </li>
              </ul>
          </el-form-item>
          <el-form-item label="Header">
              <i
                      class="el-icon-plus"
                      @click="formRules.headers.push({
                        type: 'URI',
                        operator: 'match',
                        value: ''
                     })"></i>
              <ul style="padding-inline-start:0px" class="conditions-row">
                  <li v-for="(conditions, index) in formRules.headers" :key="index">
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
                              @click="formRules.headers.push({
                        type: 'URI',
                        operator: 'match',
                        value: ''
                     })"></i>
                      <i class="el-icon-close"  @click="formRules.headers.splice(index, 1)"></i>
                  </li>
              </ul>
          </el-form-item>
          <el-form-item label="处理">
              <el-select prop="handleLog" v-model="formRules.handle.log" placeholder="请选择日志处理">
                  <el-option
                          v-for="item in selectorLogs"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="" prop="enable">
              <el-checkbox v-model="formRules.enable" label="启用" name="enable"></el-checkbox>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogAddPlugRulesVisible = false">取 消</el-button>
         <el-button >预 览</el-button>
         <el-button type="primary" @click="submitRuleForm">确定</el-button>
      </span>
    </el-dialog>
    <!-- add rules end -->
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
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)
export default {
  name: 'PlugMain',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  props: ['titileName'],
  data() {
    return {
      selectors: [],
      rulesData: [],
      selectName: '-',
      selectorId: '',
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
      formRules: {
        name: '',
        judge: {
          type: 0,
          conditions: [
            {
              type: 'Random',
              operator: 'match',
              value: ''
            }
          ]
        },
        extractor: {
          type: 1,
          extractions: []
        },
        handle: {
          log: true
        },
        headers: [],
        enable: false
      },
      rulesRule: {},
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
      dialogAddPlugRulesVisible: false,
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
      ruleExtractorType: [
        {
          'key': 1,
          'value': '索引式提取'
        },
        {
          'key': 2,
          'value': '模板式提取'
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
    console.log(this.formRules)
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
          this.$emit('addSelectors', this, JSON.stringify(contentObj))
        }
      })
    },
    submitRuleForm() {
      this.$refs.formRules.validate(async valid => {
        if (valid) {
          const { name, judge, handle, extractor, headers, enable } = this.formRules
          const contentObj = {
            'name': name,
            'judge': judge,
            'handle': handle,
            'extractor': extractor,
            'headers': headers,
            'enable': enable
          }
          this.$emit('addRules', this, this.selectorId, JSON.stringify(contentObj))
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
    resetRulesForm() {
      this.formRules = {
        name: '',
        judge: {
          type: 0,
          conditions: [
            {
              type: 'Random',
              operator: 'match',
              value: ''
            }
          ]
        },
        extractor: {
          type: 1,
          extractions: []
        },
        handle: {
          log: true
        },
        headers: [],
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
      this.$emit('getSelectors', this)
    },
    handleSyncData() {
      this.$emit('syncPlugData', this)
    },
    handleSyncShow() {
      this.$emit('fetchConfig', this)
    },
    handleEnable() {
      this.$emit('enablePlug', this)
    },
    selectPlug(data) {
      this.selectName = '【' + data.name + '】'
      this.selectorId = data.id
      this.$emit('getRules', this, data.id)
    },
    addPlug(data) {
      this.selectName = '【' + data.name + '】'
      this.selectorId = data.id
      this.$emit('addRules', this, this.selectorId, data.id)
    },
    delSelectors(data) {
      this.$emit('delSelectors', this, data.id)
    },
    delRules(data) {
      this.$emit('delRules', this, this.selectorId, data.id)
    },
    oderSelectors() {
      this.$emit('oderSelectors', this, Object.keys(this.selectors).join(','))
    },
    orderRules() {
      var arr = []
      for (var rules in this.rulesData) {
        arr[rules] = this.rulesData[rules].id
      }
      this.$emit('orderRules', this, this.selectorId, arr.join(','))
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
    .plug-selectors-item{
        cursor: hand;
        padding: 6px;
        border: 1px solid #e7eaec;
        border-left: 3px solid #f8ac59;
        margin: 0px 0 10px 0;
        border-radius: 2px;
        list-style: none;
        font-size: 13px;
        color: #676a6c;
        cursor: pointer;
    }
    .selected-selector{
        background-color: #fcf8e3;
    }
    .plug-selectors-item-button {
        width: 40px;
        padding: 5px 5px;
    }
    .plug-selectors-item-title {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .plug-selectors-item-time {
        margin-right: 20px;
    }
    .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .alert-warning {
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
    }
    .warning-element {
        border-left: 3px solid #f8ac59;
        border: 1px solid #e7eaec;
        margin: 0px 0 10px 0;
        border-radius: 2px;
        padding: 2px;
    }
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
    }
    .table:hover{
        background-color: #F5F5F5;
    }
    .single-rule-table {
        margin-bottom: 0;
    }
    .label-primary {
        background-color: #337ab7 !important;
        color: white !important;
    }
    .label-warning {
        background-color: #f0ad4e !important;
        color: white !important;
    }

    .info-element {
        border-left: 3px solid #1c84c6 !important;
    }

    .label {
        background-color: #d1dade;
        color: #5e5e5e;
        font-size: 10px;
        font-weight: 600;
        padding: 3px 8px;
        text-shadow: none;
    }
    .rule-op-td {
        width: 130px;
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
