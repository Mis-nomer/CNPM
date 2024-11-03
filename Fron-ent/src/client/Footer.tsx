import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="cps-container">
          <div className="footer-top__box-one">
            <div className="box-one__store">
              <div className="store__title">
                <p>Tìm cửa hàng</p>
              </div>
              <div className="store__content">
                <ul className="list-link">
                  <li className="link">
                    <Link to="">Tìm cửa hàng gần nhất</Link>
                  </li>
                  <li className="link">
                    <Link to="">Mua hàng từ xa</Link>
                  </li>
                  <li className="link">
                    <Link to="">Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="box-one__pay">
              <div className="store__title">
                <p>Phương thức thanh toán</p>
              </div>
              <div className="pay-content">
                <div className="list-pay" style={{ display: 'flex' }}>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png"
                        alt="Alepay"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png"
                      />
                    </Link>
                  </div>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/zalopay-logo.png"
                        alt="Zalopay"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/zalopay-logo.png"
                      />
                    </Link>
                  </div>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/vnpay-logo.png"
                        alt="Vnpay"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/vnpay-logo.png"
                      />
                    </Link>
                  </div>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/moca-logo.png"
                        alt="Moca"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/moca-logo.png"
                      />
                    </Link>
                  </div>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/onepay-logo.png"
                        alt="Onepay"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/onepay-logo.png"
                      />
                    </Link>
                  </div>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/kredivo-logo.png"
                        alt="Kredivo"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/kredivo-logo.png"
                      />
                    </Link>
                  </div>
                  <div className="icon-pay">
                    <Link to="">
                      <img
                        data-src="https://image.cellphones.com.vn/x35/media/logo/payment/mpos-logo.png"
                        alt="Mpos"
                        src="https://image.cellphones.com.vn/x35/media/logo/payment/mpos-logo.png"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-top__box-one">
            <div className="box-one__store">
              <div className="store__content1">
                <ul className="list-link">
                  <li className="link">
                    <div data-v-78fbd3bf>
                      Gọi mua hàng
                      <Link to="">
                        <strong>1800.2097</strong>
                      </Link>
                      (8h00 - 22h00)
                    </div>
                  </li>
                  <li className="link">
                    <div data-v-78fbd3bf>
                      Gọi bảo hành
                      <Link to="">
                        <strong>1800.2064</strong>
                      </Link>
                      (8h00 - 21h00)
                    </div>
                  </li>
                  <li className="link">
                    <div data-v-78fbd3bf>
                      Gọi khiếu nại
                      <Link to="">
                        <strong>1800.2063</strong>
                      </Link>
                      (8h00 - 21h30)
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="warranty-logo">
              <Link to="" className="warranty-logo-dtv">
                <div className="box-left">
                  <p>
                    <strong>Đối tác dịch vụ bảo hành</strong> Điện Thoại - Máy tính
                  </p>
                </div>
                <div className="box-right">
                  <img src="https://cdn.dienthoaivui.com.vn/wp-content/uploads/2019/03/logo-DTV_cn1.png" />
                </div>
              </Link>
              <Link to="" className="warranty-logo-dtv-asp">
                <div className="box-left">
                  <p>
                    <strong className="font-10">Trung tâm bảo hành ủy quyền Apple</strong>
                  </p>
                </div>
                <div className="box-right">
                  <img
                    width="100%"
                    data-src="https://cdn2.cellphones.com.vn/230x/media/icon/logo_dtv-asp.png"
                    alt="dtv-asp"
                    src="https://cdn2.cellphones.com.vn/230x/media/icon/logo_dtv-asp.png"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="footer-top__box-one">
            <div className="box-one__store">
              <div className="store__content1">
                <ul className="list-link">
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Mua hàng và thanh toán Online
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Mua hàng trả góp Online
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Tra thông tin đơn hàng
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Tra điểm Smember
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Tra thông tin bảo hành
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Tra cứu hoá đơn điện tử
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Trung tâm bảo hành chính hãng
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Quy định về việc sao lưu dữ liệu
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Dịch vụ bảo hành điện thoại
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-top__box-one">
            <div className="box-one__store">
              <div className="store__content1">
                <ul className="list-link">
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Khách hàng doanh nghiệp (B2B)
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Ưu đãi thanh toán
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Quy chế hoạt động
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Chính sách Bảo hành
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Liên hệ hợp tác kinh doanh
                    </Link>
                  </li>
                  <li className="link">
                    <Link target="_blank" rel="noopener" to="">
                      Tuyển dụng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container">
          <p>
            Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD: 0316172372 do sở KH &amp; ĐT TP. HCM cấp
            ngày 02/03/2020. Địa chỉ: 350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.
            Điện thoại: 028.7108.9666.
          </p>
          <div className="icon-bottom">
            <Link target="_blank" to="" rel="nofollow noopener" className="icon-cps">
              <img
                data-src="https://cdn2.cellphones.com.vn/80x/media/logo/logoSaleNoti.png"
                alt=""
                src="https://cdn2.cellphones.com.vn/80x/media/logo/logoSaleNoti.png"
              />
            </Link>
            <Link
              target="_blank"
              rel="nofollow noopener"
              to=""
              title="DMCA.com Protection Status"
              className="icon-cps1"
            >
              <img
                data-src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022"
                alt="DMCA.com Protection Status"
                src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
