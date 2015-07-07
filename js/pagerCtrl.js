var pagerCtrl = avalon.define('pagerCtrl', function (vm) {
    vm.totalPage = 1;//��ҳ��
    vm.totalCount = 0;//�ܼ�¼��
    vm.pageNo = 1;//��ǰҹ
    vm.pageSize = 10;//һҳ��ʾ��������
    vm.showCount = 0;//Ҫ��ʾ��ҳ
    vm.firstPage = true;//�Ƿ���ҳ
    vm.lastPage = false;//�Ƿ�ĩҳ
    vm.list = [];//����
    vm.fn = null;//��ȡ���ݵķ���
    vm.index=0;//��������λ�ã�Ϊ�˼���ʽ
    //��һҳ
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
    //��һҳ
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
    //���ĳһҳ
    vm.toNum = function (pageNo,index) {
        vm.index=index;
        vm.setClass();
        vm.fn(pageNo, vm.pageSize);
    };
    //��ҳ
    vm.toFirst = function () {
        vm.index=0;
        vm.pageNo=1;
        vm.setList(vm.showCount);
        vm.fn(1, vm.pageSize);
    };
    //���һҳ
    vm.toLast = function () {
        var n=Math.min(vm.totalPage,vm.showCount);
        vm.index=n-1;
        vm.pageNo=vm.totalPage;
        vm.setList(vm.showCount,vm.totalPage-n+1,vm.totalPage);
        vm.fn(vm.totalPage, vm.pageSize);
    };
    //���ط�ҳ����
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
    //�޸���ʽ
    vm.setClass=function(){
        for(var i=0;i<Math.min(vm.totalPage,vm.showCount);i++){
            vm.list[i]['style']='';
        }
        vm.list[vm.index]['style']='active';
    }
});
