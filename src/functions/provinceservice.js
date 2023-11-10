import * as province from './province.json';

export class Province {

    constructor(context){
        this.context = context;
        this.province = province.default;
        this.getAmphure(1);
    }

    getProvince(){
        return this.province;
    }

    getAmphure(provinceId){
        this.amphure = this.province.find(el=>el.id === provinceId).amphure;
        return this.amphure;
    }

    getTambon(proviceId,amphureId){
       const tambon = this.getAmphure(proviceId).find(el=>el.id === amphureId).tambon;
      
       return tambon;
    }
   
}
