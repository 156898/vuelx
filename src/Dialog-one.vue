<template>
  <div class="do">
      <el-dialog
        :visible.sync="dialogVisible1"
        width="80%"
        :before-close="handleClose"
        :show-close="false">
        <TabHeader />
        <el-row :gutter="20">
          <el-col :span="4"><div @click="showAll">全部({{totle}})</div></el-col>
          <el-col :span="4">已选({{checkedNum}})</el-col>
          <el-col :span="12">
            <ul class="ulbox">
              <li v-for="item in list" :key="item.id" @click="selectDesk(item.id)">{{item.name}}</li>
            </ul>
          </el-col>
        </el-row>
        <div class="checkboxdesk">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedParther">
            <el-checkbox v-for="item in desk" :label="item.id" :key="item.id" @change="handlePatherChecked(item.id)">
              {{item.name}}
                <el-checkbox-group v-model="checkedChildren">
                  <el-checkbox @change="handleChildChecked(item.id, every.id)" v-for="every in item.children" :label="every.id" :key="every.id">
                    {{every.name}}
                  </el-checkbox>
                </el-checkbox-group>
            </el-checkbox>
          </el-checkbox-group>
          {{checkedParther}}
          {{checkedChildren}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">返回</el-button>
          <el-button type="primary" @click="nextStep">下一步</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import TabHeader from '../../components/TabHeader'
import { mapActions } from 'vuex'
export default {
  name: 'do',
  props: ['dialogVisible1', 'dialogVisible2'],
  data(){
    return{
      checkAll: false,
      checkedParther: [],
      checkedChildren: [],
      list: [
        {
          id: 1,
          name:'A'
        },
        {
          id: 2,
          name: 'B'
        },
        {
          id: 3,
          name: 'C'
        }
      ],
     desk: [
        {
          id: 1,
          name:'A',
          children: [
            {
              id: 'A1',
              name: 'A1'
            },
            {
              id: 'A2',
              name: 'A2'
            },
            {
              id: 'A3',
              name: 'A3'
            }
          ]
        },
        {
          id: 2,
          name: 'B',
           children: [
            {
              id: 'B1',
              name: 'B1'
            },
            {
              id: 'B2',
              name: 'B2'
            },
            {
              id: 'B3',
              name: 'B3'
            }
          ]
        },
        {
          id: 3,
          name: 'C',
          children: [
            {
              id: 'C1',
              name: 'C1'
            },
            {
              id: 'C2',
              name: 'C2'
            },
            {
              id: 'C3',
              name: 'C3'
            }
          ]
        }
     ],
     deskCopy: [
        {
          id: 1,
          name:'A',
          children: [
            {
              id: 'A1',
              name: 'A1'
            },
            {
              id: 'A2',
              name: 'A2'
            },
            {
              id: 'A3',
              name: 'A3'
            }
          ]
        },
        {
          id: 2,
          name: 'B',
           children: [
            {
              id: 'B1',
              name: 'B1'
            },
            {
              id: 'B2',
              name: 'B2'
            },
            {
              id: 'B3',
              name: 'B3'
            }
          ]
        },
        {
          id: 3,
          name: 'C',
          children: [
            {
              id: 'C1',
              name: 'C1'
            },
            {
              id: 'C2',
              name: 'C2'
            },
            {
              id: 'C3',
              name: 'C3'
            }
          ]
        }
     ]
    }
  },
  watch: {
   checkedParther(newValue, oldValue){
     if(newValue.length == this.desk.length){
        this.checkAll = true
     }else{
        this.checkAll = false
     }
   },
   checkedChildren(newValue, oldValue){
     let arr = []
     this.desk.forEach((item)=>{
       item.children.forEach((ev)=>{
         arr.push(ev)
       })
     })
     if(arr.length == newValue.length){
       this.checkAll = true
     }else{
        this.checkAll = false
     }
   }
  },
  computed: {
    totle(){
       let num = [];
       this.desk.forEach((item) => {
          item.children.forEach((ev)=>{
            num.push(ev)
          })
       })
       return num.length
    },
    checkedNum(){
      return this.checkedChildren.length;
    }
  },
  methods:{
    ...mapActions(['setDesk']),
    selectDesk(id){
        let newArr = this.deskCopy.filter(i => i.id == id)
        this.desk = JSON.parse(JSON.stringify(newArr))
    },
    showAll(){
      this.desk = JSON.parse(JSON.stringify(this.deskCopy))
    },
    handleClose(){
      this.$emit('update:dialogVisible1', false)
    },
    nextStep(){
      this.$emit('update:dialogVisible1', false)
      this.$emit('update:dialogVisible2', true)
      this.setDesk(this.checkedChildren)
    },
    handleCheckAllChange(){
      if(this.checkAll){
        this.checkedChildren = []
        this.checkedParther = []
         this.desk.forEach((item) => {
           this.checkedParther.push(item.id)
           item.children.forEach((ev)=>{
             this.checkedChildren.push(ev.id)
           })
         })
      }else{
        this.checkedChildren = []
        this.checkedParther = []
      }
    },
    handlePatherChecked(pId){
      let arr = this.desk.filter(i => i.id == pId)
      if(this.checkedParther.indexOf(pId) !== -1){
         arr[0].children.forEach((item) => {
           if(this.checkedChildren.indexOf(item.id) == -1) this.checkedChildren.push(item.id)
         })
      } else {
         let newArr = this.checkedChildren.filter(i => arr[0].children.every(j => j.id !== i))
         this.checkedChildren = newArr
      }
    },
    handleChildChecked(pId, cId){
      let arr = this.desk.filter(i => i.id == pId)
      if(this.checkedChildren.indexOf(cId) !== -1){
         let newArr = this.checkedChildren.filter(i => arr[0].children.some(j =>j.id == i))
         if(newArr.length == arr[0].children.length){
           this.checkedParther.push(pId)
         }
      }else{
        let arr1 = this.checkedParther.filter(i => i !== pId)
        this.checkedParther = arr1
      }
    }
  },
  components:{
    TabHeader
  }
}
</script>


<style lang="less">
.do{
  .el-checkbox__label{
    display: inline;
  }
  .el-dialog__header{
    padding: 0;
  }
  .el-dialog__body{
    padding-top: 0;
    padding-left: 0;
  }
  .checkboxdesk{
    border: 1px dashed #ccc;
    padding: 10px;
    margin-top: 10px;
  }
  .ulbox{
    li{
      list-style: none;
      float: left;
      padding: 0 15px;
      cursor: pointer;
    }
  }
}
</style>
