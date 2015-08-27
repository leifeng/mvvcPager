var pagerCtrl = avalon.define('pagerCtrl', function (vm) {
    vm.t = -1;
    vm.n = 1;
    vm.show = true;
    vm.totalPage = 1;//��ҳ��
    vm.totalCount = 0;//�ܼ�¼
    vm.pageNo = 1;//��ǰҳ
    vm.pageSize = 10;//��ʾ�ļ�¼��
    vm.showPagers = 10;//��ʾ��ҳ��
    vm.list = []; //ҳ��
    vm.fn = null;//��ȡ���ݷ���
    vm.index = 0;//��ǰҳ������
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
