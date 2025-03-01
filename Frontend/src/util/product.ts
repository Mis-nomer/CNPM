export const PRODUCT_CATEGORIES = {
    dienthoai: 'Điện thoại',
    laptop: 'Laptop',
    tablet: 'Máy tính bảng',
    amthanh: 'Âm thanh',
    dongho: 'Đồng hồ',
    nhathongminh: 'Nhà thông minh',
    phukien: 'Phụ kiện',
    pc_manhinh: 'PC-Màn hình',
    tivi: 'Tivi',
    hangcu: 'Hàng cũ'
} as const

export const PRODUCT_BRANDS = {
    dienthoai: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Realme', 'Nokia', 'Oneplus', 'Asus'],
    laptop: ['Dell', 'HP', 'Lenovo', 'Apple'],
    tablet: ['iPad', 'Samsung', 'Huawei'],
    amthanh: ['Sony', 'JBL', 'Bose'],
    dongho: ['Rolex', 'Casio', 'Omega'],
    nhathongminh: ['Xiaomi', 'Samsung', 'LG'],
    phukien: ['Apple', 'Samsung', 'Sony'],
    pc_manhinh: ['Dell', 'HP', 'Asus'],
    tivi: ['Samsung', 'LG', 'Sony'],
    hangcu: ['iPhone', 'Samsung', 'Laptop']
} as const

export const STORAGE_OPTIONS = [
    { value: '16GB', label: '16GB' },
    { value: '32GB', label: '32GB' },
    { value: '128GB', label: '128GB' },
    { value: '256GB', label: '256GB' },
    { value: '512GB', label: '512GB' },
    { value: '1TB', label: '1TB' },
    { value: '2TB', label: '2TB' }
] as const

export const RAM_OPTIONS = [
    { value: '4GB', label: '4GB' },
    { value: '6GB', label: '6GB' },
    { value: '8GB', label: '8GB' },
    { value: '12GB', label: '12GB' },
    { value: '16GB', label: '16GB' },
    { value: '24GB', label: '24GB' },
    { value: '32GB', label: '32GB' },
    { value: '64GB', label: '64GB' }
] as const

export const OS_OPTIONS = [
    { value: 'Windows', label: 'Windows' },
    { value: 'Mac OS', label: 'Mac OS' },
    { value: 'Linux', label: 'Linux' },
    { value: 'Android', label: 'Android' },
    { value: 'iOS', label: 'iOS' },
    { value: 'Chrome OS', label: 'Chrome OS' }
] as const

export const SCREEN_RESOLUTIONS = [
    { value: 'HD (1280x720)', label: 'HD (1280x720)' },
    { value: 'Full HD (1920x1080)', label: 'Full HD (1920x1080)' },
    { value: 'WUXGA (1920x1200)', label: 'WUXGA (1920x1200)' },
    { value: '2K QHD (2560x1440)', label: '2K QHD (2560x1440)' },
    { value: '4K (3840x2160)', label: '4K (3840x2160)' }
] as const
