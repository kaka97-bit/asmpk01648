function taoId(){

    // lấy t/g hiện tại theo milisecond
    var thoiGianHienTai = new Date().getTime();
    var id = Math.random().toString().substr(2,10) + "_" + String(thoiGianHienTai);    
    return id;
}
function loadDuLieu(tendata){
    let data = JSON.parse(localStorage.getItem(tendata));

    if(data == null){
        data = new Array();
    }
    
    return data;
}

function ghiDuLieu(arrayDulieu,tendata){
    localStorage.setItem(tendata,JSON.stringify(arrayDulieu));
}