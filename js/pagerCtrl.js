var pagerCtrl = avalon.define('pagerCtrl', function (vm) {
    vm.totalPage = 1;//总页数
    vm.totalCount = 0;//总记录数
    vm.pageNo = 1;//当前夜
    vm.pageSize = 10;//一页显示几条数据
    vm.showCount = 0;//要显示几页
    vm.firstPage = true;//是否首页
    vm.lastPage = false;//是否末页
    vm.list = [];//数组
    vm.fn = null;//获取数据的方法
    vm.index=0;//数组索引位置，为了加样式
    //上一页
    vm.toPre = function () {
        if (!vm.firstPage) {
            vm.pageNo--;
            vm.index--;
            if(vm.index<0){
                vm.index=0;
                vm.list.unshift({index:vm.list[0].index-1,style:''});
                vm.list.pop();
            }
            vm.fn(vm.pageNo, vm.pageSize);
            vm.setClass();
        }
    };
    //下一页
    vm.toNext = function () {
        if (!vm.lastPage) {
            vm.pageNo++;
            vm.index++;
            if(vm.index>vm.showCount-1){
                vm.index=vm.showCount-1;
                vm.list.push({index:vm.pageNo,style:''});
                vm.list.shift();
            }
            vm.fn(vm.pageNo, vm.pageSize);
            vm.setClass();
        }
    };
    //点击某一页
    vm.toNum = function (pageNo,index) {
        vm.index=index;
        vm.setClass();
        vm.fn(pageNo, vm.pageSize);
    };
    //首页
    vm.toFirst = function () {
        vm.index=0;
        vm.pageNo=1;
        vm.setList(vm.showCount);
        vm.fn(1, vm.pageSize);
    };
    //最后一页
    vm.toLast = function () {
        var n=Math.min(vm.totalPage,vm.showCount);
        vm.index=n-1;
        vm.pageNo=vm.totalPage;
        vm.setList(vm.showCount,vm.totalPage-n+1,vm.totalPage);
        vm.fn(vm.totalPage, vm.pageSize);
    };
    //加载分页数组
    vm.setList=function(n,n1,n2){
        vm.showCount = n;
        vm.list=[];
        var i=n1||vm.pageNo;
        var x=n2||Math.min(vm.totalPage,n);
        for(;i<=x;i++){
            vm.list.push({index:i,style:''});
        }
        vm.setClass();
    };
    //修改样式
    vm.setClass=function(){
        for(var i=0;i<Math.min(vm.totalPage,vm.showCount);i++){
            vm.list[i]['style']='';
        }
        vm.list[vm.index]['style']='active';
    }
});
