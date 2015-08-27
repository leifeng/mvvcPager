var pagerCtrl = avalon.define('pagerCtrl', function (vm) {
    vm.t = -1;
    vm.n = 1;
    vm.show = true;
    vm.totalPage = 1;//总页数
    vm.totalCount = 0;//总记录
    vm.pageNo = 1;//当前页
    vm.pageSize = 10;//显示的记录数
    vm.showPagers = 10;//显示的页数
    vm.list = []; //页码
    vm.fn = null;//获取数据方法
    vm.index = 0;//当前页码索引
    vm.lock=false;
    vm.toPre = function () {
        if (vm.pageNo >1) {
            vm.pageNo--;
            vm.index--;
            if(vm.index<0){
                vm.n--;
            }
            if (vm.index <=0) {
                vm.index = 0;
            }
            vm.getData();
        }
    };
    vm.toNext = function () {
        if (vm.pageNo < vm.totalPage) {
            vm.pageNo++;
            vm.index++;
            if(vm.index>vm.showPagers-1){
                vm.n++;
            }
            if (vm.index >= vm.showPagers) {
                vm.index = vm.showPagers - 1;
            }
            vm.getData();
        }

    };
    vm.toNum = function (pageNo, index) {
        vm.pageNo = pageNo;
        vm.index = index;
        vm.getData();
    };
    vm.toFirst = function () {
        vm.pageNo = 1;
        vm.index = 0;
        vm.n=1;
        vm.getData();
    };
    vm.toLast = function () {
        vm.pageNo =vm.totalPage ;
        vm.index = vm.showPagers - 1;
        vm.n=vm.totalPage-vm.showPagers+1;
        vm.getData();
    };
    vm.setList = function (totalPage) {
        if(!vm.lock){
            vm.lock=true;
            pagerCtrl.totalPage=totalPage;
            vm.showPagers = Math.min(totalPage, vm.showPagers);
            for (var i = 0; i < vm.showPagers; i++) {
                vm.list.push(0);
            }
        }

    };
    vm.getData=function(pangNo){
        clearTimeout(vm.t);
        vm.t=setTimeout(function(){
            var index=pangNo||vm.pageNo;
            pagerCtrl.fn(index,vm.pageSize);
        },500);
    };
    vm.init = function (num, pagesize, fn) {
        vm.pageSize = pagesize;
        vm.showPagers = num;
        vm.fn = fn;
    }
});
