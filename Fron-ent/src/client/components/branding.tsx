import React from 'react';
import { Row, Col } from 'antd';

const BannerSection: React.FC = () => {
    const paymentBanners = [
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/uu-dai-vppay-apple-080324_2_flkv9c.webp',
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940012/vib-update-01-04-2024_2_f3m4vw.webp',
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/uu-dai-thanh-toan-hsbc-0803-2024_j4w1an.webp',
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940010/momo-5-04-2024-slide_aopkxs.webp',
    ];

    const brandBanners = [
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/apple-chinh-hang-home_tb7oe9.webp',
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/SIS_asus_ihdv47.webp',
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940010/gian-hang-samsung-home_kai5jd.webp',
        'https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/xiaomi_alhqoi.webp',
    ];

    return (
        <div className="max-w-screen-xl w-[1200px] mb-5 mx-auto">
            <div className="mb-12">
                <div className="box-title mb-6">
                    <a href="/" className="title text-xl font-bold text-gray-800">
                        Ưu đãi thanh toán
                    </a>
                </div>
                <Row gutter={[16, 16]}>
                    {paymentBanners.map((banner, index) => (
                        <Col xs={12} sm={8} md={6} key={index}>
                            <a href="/" className="brand-banner__item block">
                                <img
                                    src={banner}
                                    alt=""
                                    className="brand-banner__img w-full rounded-lg shadow hover:scale-105 transition-transform"
                                />
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>

            <div>
                <div className="box-title mb-6">
                    <a href="/" className="title text-xl font-bold text-gray-800">
                        CHUYÊN TRANG THƯƠNG HIỆU
                    </a>
                </div>
                <Row gutter={[16, 16]}>
                    {brandBanners.map((banner, index) => (
                        <Col xs={12} sm={8} md={6} key={index}>
                            <a href="/" className="brand-banner__item block">
                                <img
                                    src={banner}
                                    alt=""
                                    className="brand-banner__img w-full rounded-lg shadow hover:scale-105 transition-transform"
                                />
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default BannerSection;
