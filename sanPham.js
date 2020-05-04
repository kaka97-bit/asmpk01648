/*mục tiêu hàm này để tạo ra đối tượng từ các thuộc tính truyền vào:
        input: các thuộc tính
        output: một đối tượng sanPham
        */
       
function taoDoiTuongSanPham(hinhAnh, ten, giaGoc, phanTramGiamGia, khuVuc, id) {
    var sanPham = new Object();
    //Tạo thuộc tính và phương thức:
    /*b1. gắn các thuộc tính*/
    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten;
    sanPham.giaGoc = giaGoc;
    sanPham.phanTramGiamGia = phanTramGiamGia;
    sanPham.khuVuc = khuVuc;

    // tạo định danh cho đối tượng
    if(id == null){
        sanPham.id = taoId();
    }else{
        sanPham.id = id;
    }

    /*b2. viết phương thức*/
    sanPham.tinhGiaBan = function () {
        //logic xử lí
        var giaBan = this.giaGoc * (1 - this.phanTramGiamGia);
        return giaBan;
    }
    /*hàm chuyển đối tượng sản phẩm thành JSON */
    sanPham.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    }

    /*Từ Json chuyển thành đối tượng đầy đủ các funtions 
    input: json
    output: đối tượng đầy đủ
    */
    sanPham.fromJSON = function () {
        var doiTuongDayDu = new Object();

        /*b1. chuyển từ json thành đối tượng */
        var doiTuong = JSON.parse(json);

        /*b2. chuyển thành đối tượng đầy đủ các phương thức */
        var doiTuongDayDu = taoDoiTuongSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.giaGoc, doiTuong.phanTramGiamGia, doiTuong.khuVuc);
        return doiTuongDayDu;
    }

    /*Vì không thể hiện hàm tính giá bán của sản phẩm nên ta làm bước này: */
    sanPham.fromJSONs = function (jsonDanhSachSanPham) {
        /*từ JSON danh sách sản phẩm trả về danh sách đầy đủ thuộc tính
        input = Json của danh sách sản phẩm
        output = danh sách sản phẩm đầy đủ
         */
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

        for (var i = 0; i < danhSachSanPham.length; i++) {
            var sanPham = danhSachSanPham[i];
            var sanPhamDayDu = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }

        return danhSachSanPhamDayDu;
    }
    return sanPham;
}
/*Chuyển 1 danh sách đối tượng thành HTML và hiển thị lên màn hình
input = Danh sách sản phẩm
output = Đoạn HTML hiển thị danh sách sản phẩm */

function chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham) {
    var HTMLDanhSachSanPham = '<div class="items">';
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var htmlSanPham = chuyenDoiTuongSanPhamThanhHTML(sanPham);
        HTMLDanhSachSanPham = HTMLDanhSachSanPham + htmlSanPham;
    }
    HTMLDanhSachSanPham = HTMLDanhSachSanPham + '</div>';

    return HTMLDanhSachSanPham;
}

/*chuyển 1 đối tượng thành 1 html
input = sản phẩm
output = đọan html sản phẩm */
function chuyenDoiTuongSanPhamThanhHTML(sanPham) {
    sanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);
    console.log(sanPham);
    var html = '';

    html += '<div class="item">'
    html += '<div class="item-hinhAnh">'
    html += '<img src="' + sanPham.hinhAnh + '" alt="">'
    html += '</div>'
    html += '<h2 class="item-ten">' + sanPham.ten + '</h2>'
    html += '<div class="item-gia">'
    html += '<span class="item-gia-ban">' + themChamVaoSo(sanPham.tinhGiaBan()) + ' đ</span>'
    html += '<span class="item-gia-goc">' + themChamVaoSo(sanPham.giaGoc) + ' đ</span>'    
    html += '</div>'
    html += '<button onclick="clickThemVaoGiohang(\'' + sanPham.id + '\')" class="btn btn-primary">Thêm vào giỏ hàng</button>'
    html += '</div>'
    return html;
    
}

function themChamVaoSo(so) {
    return so.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// mục tiêu dựa vào id sp để lấy lại sp(lưu trữ trong danh sách local storage)
    // input : id sản phẩm
    // output: đối tượng sản phẩm

function laySanPhamTheoId(idSanPham){
    var sanPham = new Object();
    // b1. lấy toàn bộ danh sách sản phẩm từ local
    var danhSachSanPham = layDanhSachSanPhamTuLocalStorage();
    // b2. tìm ra đối tương
    for (var i = 0; i < danhSachSanPham.length; i++){
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == idSanPham){
            sanPham = sanPhamHienTai;
        }
    }
    // b3. chuyển đối tương thành đố tượng đầy đủ
    sanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id)
    return sanPham;
}
// lấy toang bộ danh sác dưới local
function layDanhSachSanPhamTuLocalStorage(){
    // b1. load json
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    // b2 chuyển json thành đối tượng
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

    return danhSachSanPham;
}