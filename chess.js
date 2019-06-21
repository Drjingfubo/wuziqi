$(function () {
    let box = $('.box');
    let flag = true;
    let black = {}, white = {};
    let ai = true;
    let blank = {};
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            $('<div>').addClass('chess')
                .appendTo(box)
                .attr('id',i+'_'+j);
            blank[i +'_'+ j] = true
        }
    }
    box.on('click','.chess',function () {
        let _this = $(this);
        if (_this.hasClass('black')|| _this.hasClass('white')){
            return
        }
        flag = !flag;
        let coords = _this.attr('id');
        if (flag){
            black[coords] = true;
            delete blank[coords];
            $(this).addClass('black');
            if ( success(black,coords)>=5){
                console.log('black-success');
                box.off('click')
            }
        } else{
            white[coords] = true;
            $(this).addClass('white');
            delete blank[coords];
            if ( success(white,coords)>=5){
                console.log('white-success');
                box.off('click')
            }
            if (ai){
                let pos = aifn();
                blank[pos] = true;
                delete blank[pos];
                $('#' + pos).addClass('black');
                console.log(success(black, pos));
                if (success(black,pos) >= 5){
                    console.log('black-success');
                    box.off('click')
                }
                flag = !flag
            }
        }
    });
    
    function aifn() {
        let blankScore = 0 ,whiteScore = 0;
        let pos1 = '' , pos2 = '';
        for (let  i in blank){
            let score = success(black,i);
            if (score >= blankScore){
                blankScore = score;
                pos1 = i;
            }
        }
        for (let  i in blank){
            let score = success(white,i);
            if (score >= whiteScore){
                whiteScore = score;
                pos2 = i;
            }
        }
        return blankScore >= whiteScore ? pos1 : pos2;
    }

    function success(obj,coords) {
        let sp = 1, cz = 1, yx = 1, zx = 1;
        let [x,y] = coords.split('_');
        let i = x*1, j = y*1;
        while(obj[i +'_'+(++j)]){
            sp++;
        }
        j = y*1;
        while(obj[i + '_'+(--j)]){
            sp++;
        }
        j=y*1;
        while(obj[(++i) + '_' +  j]){
            cz++;
        }
        i= x*1;
        while (obj[(--i)+'_'+j]){
            cz++;
        }
        i = x*1;
        j = y*1;
        while(obj[--i +'_'+(++j)]){
            yx++;
        }
        i = x*1;
        j = y*1;
        while(obj[++i +'_'+(--j)]){
            yx++;
        }
        i = x*1;
        j = y*1;
        while(obj[--i +'_'+(--j)]){
            zx++;
        }
        i = x*1;
        j = y*1;
        while(obj[++i +'_'+(++j)]){
            zx++;
        }
        return Math.max(cz,sp,yx,zx);

    }

});