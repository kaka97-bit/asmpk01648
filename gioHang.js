var keyLocalStorageItemGioHang = 'danhSachItemGioHang';
// y/c theem sản phẩm vào giỏ hàng
// input : idSanPham, gio hàng cũ
// output:giỏ hàng sau khi đc thêm

function themSanPhamVaoGioHang(idSanPham, gioHang){
    /*thêm sp vào giỏ: in: id sanphaamr ............ out: giỏ hàng */
    var gioHangSauKhiDuocThem = gioHang;
    var itemGioHang =  taoDoiTuongitemGioHang(idSanPham, 1);   
    gioHangSauKhiDuocThem.push(itemGioHang);
    return gioHangSauKhiDuocThem;
}

// tạo ra đối tượng
function taoDoiTuongitemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;

    return itemGioHang;
}
// lấy d/s item giỏ hàng
// y/c lấy giỏ hàng từ local storage
function layDanhSachItemGioHang() {
    var danhSachItemGioHang = new Array();

    var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemGioHang);
    if (jsonDanhSachItemGioHang != null)
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);

    return danhSachItemGioHang;
}
// y/c luu trữ giỏ hàng xuống local
// input gioHang
function luuDanhSachItemGioHangVaoLocalStorege(danhSachItemGioHang) {
    // B1.chuyển giỏ hang thành json
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);

    localStorage.setItem(keyLocalStorageItemGioHang, jsonDanhSachItemGioHang);
}
function remove(idSanPham){
    var itemGioHang = this.layDanhSachItemGioHang();
    var xoaItemGioHang = new Array();
    for(let i =0; i< itemGioHang.length; i++){
        var item = itemGioHang[i];
        if(item.id != idSanPham){
            xoaItemGioHang.push(item);
        }
    }
    this.luuDanhSachItemGioHangVaoLocalStorege(xoaItemGioHang);
    return xoaItemGioHang;
}

