// 判断字符串是否为空
const isStrNull = (str:string):boolean => {
    if (str === "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

export {isStrNull}