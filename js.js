$(function () {
    let box=$('.box');
    let AI=true;
    let black={} , white={},blank={};
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            $('<div>').addClass('chess').appendTo(box)
                .attr('id',i+'_'+j);
            blank[i+'_'+j]=true;
        }
    }
    let flag=true;
    box.on('click','.chess',function () {
        let _this=$(this);
        let coords=_this.attr('id');
        if(_this.hasClass('black') || _this.hasClass('white')){
            return;
        }
        flag=!flag;
        if(flag){
            black[coords]=true;
            delete blank[coords];
            // console.log(1);
            _this.addClass('black');
            if(iswin(black,coords)==5){
                alert('black Win');
                box.off('click');
            }
        }
        if(!flag){
            white[coords]=true;
            _this.addClass('white');
            delete blank[coords];
            console.log(blank[coords]);
            if(iswin(white,coords)==5){
                alert('white Win');
                box.off('click');
            }
            if(AI){
                let pos=aifn();
                console.log(pos);
                blank[pos]=true;
                $('#'+pos).addClass('black');
                delete blank[pos];
                if(iswin(black,pos)==5){
                    alert('black Win');
                    box.off('click');
                }
                flag=!flag
            }
        }

        function aifn(){
            let blankScore=0 ,whiteScore=0;
            let pos1='',pos2='';
            for (let i in blank){
                let score = iswin(black,i);
                if (score>blankScore){
                    blankScore=score;
                    pos1=i;
                }
            }
            for (let i in blank){
                let score = iswin(white,i);
                if (score>whiteScore){
                    whiteScore=score;
                    pos2=i;
                }
            }
            return whiteScore>blankScore ? pos2 : pos1;
        }
    })

    function iswin(obj,coords) {
        let sp=1, cz=1, zx=1, yx=1;
        let [x , y]=coords.split("_");
        let i=x*1,j=y*1;
        //sp
        while(obj[i+'_'+(++j)] ){
            sp++;
        }
        j=y*1;
        while(obj[i+'_'+(--j)] ){
            sp++
        }

        //    cz
        j=y*1;
        while(obj[++i +'_'+j]){
            cz++;
        }
        i=x*1;
        while (obj[--i +'_'+j]){
            cz++;
        }
        //    zx
        i=x*1;
        while (obj[++i +'_'+ (--j)]){
            zx++;
        }
        i=x*1;j=y*1;
        while (obj[--i +'_'+ (++j)]) {
            zx++;
        }
        //yx
        i=x*1;j=y*1;
        while (obj[--i +'_'+ (--j)]){
            yx++;
        }
        i=x*1;j=y*1;
        while (obj[++i +'_'+ (++j)]){
            yx++;
        }
        // i=x*1,j=y*1;
        return Math.max(sp,cz,zx,yx);
    }


})