export default function format(value){
    return new Intl.NumberFormat('th-TH').format(value);
}