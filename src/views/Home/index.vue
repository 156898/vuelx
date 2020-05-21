<template>
	<div>
		<el-button type="primary" @click="adduser">添加</el-button>
		<el-input
		      v-model="input"
		      placeholder="请输入内容"
		      style="width:300px"
		    ></el-input>
		<el-button type="success" @click="Search">搜索</el-button>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="姓名" :label-width="formLabelWidth"><el-input v-model="form.name" autocomplete="off"></el-input></el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth"><el-input v-model="form.age" autocomplete="off"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addDataFn">确 定</el-button>
			</div>
		</el-dialog>
		<el-table :data="data" style="width: 90%">
			<el-table-column label="ID" width="180">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<div slot="reference" class="name-wrapper">{{ scope.row.id }}</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="姓名" width="180">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="年龄" width="180">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
						<div slot="reference" class="name-wrapper">{{ scope.row.age }}</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
	  return {
			dialogFormVisible: false,
			form: {
				name: '',
				age:'',
			},
			title:'添加',
			nameuse:'',
			formLabelWidth:'120px',
			input:''
	  }
	},
	created() {
		this.$store.dispatch('FECH_NAME_ACTION');
	},
	methods: {
		handleEdit(index, row) {
			this.$data.form.age = row.age
			this.$data.form.name = row.name
			this.$data.index = row.id
			this.$data.title = "修改"
			this.$data.dialogFormVisible = true
		},
		handleDelete(index, row) {
			let obj = { id: row.id };
			this.$store.dispatch("FECH_NAME_DELETE", obj)
		},
		addDataFn(){
			this.$data.dialogFormVisible = false
			if(this.$data.title==="添加"){
				this.$store.dispatch('FECH_NAME_ADD',this.$data.form)
			}else{
				let obj={...this.$data.form,id:this.$data.index}
				this.$store.dispatch('FECH_NAME_UPDATA',obj)
			}
		},
		adduser(){
			this.$data.form.name=""
			this.$data.form.age=""
			this.$data.title = "添加"
			this.$data.dialogFormVisible = true
		},
		Search(){
			this.$store.dispatch("FECH_NAME_SEARCH", this.$data.input)
		}
	},
	computed: {
		...mapState([['data']])
	}
};
</script>
<style lang="less" scoped>
.el-input{
	margin: 20px 0px 0px 50px;
}
.el-table{
	margin: 50px 0px;
}
</style>
