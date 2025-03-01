import { upload } from '@/api/images'
import { addPro } from '@/api/products'
import { ArrowLeftOutlined, LoadingOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, message, Select } from 'antd'
import { UploadProps } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { RcFile, UploadFile } from 'antd/lib/upload'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate } from 'react-router-dom'

const { Option } = Select

const optionsByCategory1: any = {
  productTypes: [
    'dienthoai',
    'laptop',
    'tablet',
    'amthanh',
    'dongho',
    'nhathongminh',
    'phukien',
    'pc_manhinh',
    'tivi',
    'hangcu'
  ]
}

const typeDisplayNames: { [key: string]: string } = {
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
}

const optionsByCategory: any = {
  dienthoai: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Realme', 'Nokia', 'Oneplus', 'Asus'],
  laptop: ['Dell', 'HP', 'Lenovo', 'Apple'],
  tablet: ['iPad', 'Samsung', 'Huawei'],
  amthanh: ['Sony', 'JBL', 'Bose'],
  dongho: ['Rolex', 'Casio', 'Omega'],
  nhathongminh: ['Charger', 'Headphones', 'Cables'],
  phukien: ['Charger', 'Headphones', 'Cables'],
  pc_manhinh: ['Charger', 'Headphones', 'Cables'],
  tivi: ['Charger', 'Headphones', 'Cables'],
  hangcu: ['Used Phone', 'Used Laptop', 'Used Tablet']
}

const AddPro: React.FC = () => {
  const navigate = useNavigate()
  const [rawHTML, setRawHTML] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [mutiFileList, setMutiFileList] = useState<UploadFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [brands, setBrands] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form] = Form.useForm()

  const handleCategoryChange = (value: string) => {
    setBrands(optionsByCategory[value] || [])
    setSelectedCategory(value)
    form.setFieldsValue({ brand: undefined })
  }

  const handleChangeImage: UploadProps['onChange'] = ({ fileList }) => {
    setMutiFileList(fileList)
  }

  const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true)

      if (fileList.length === 0 || mutiFileList.length === 0) {
        message.error('Vui lòng tải lên đầy đủ hình ảnh!')
        return
      }

      const imgLink = await upload(fileList[0])
      const mutiImgLink = await upload(mutiFileList[0])

      const valueAdd = {
        name: values.name,
        type: values.type,
        brand: values.brand,
        description: rawHTML,
        battery: values.battery,
        cpu: values.cpu,
        operatingSystem: values.operatingSystem,
        ram: values.ram,
        screenReslution: values.screenReslution,
        screenSize: values.screenSize,
        storage: values.storage,
        image: mutiImgLink,
        thumbnail: imgLink,
        weight: values.weight,
        price: values.price,
        salePrice: values.salePrice,
        quantity: values.quantity,
        status: 1,
        productView: 0
      }

      const response = await addPro(valueAdd)

      if (response?.data?.code === '00') {
        message.success('Thêm mới sản phẩm thành công')
        setTimeout(() => {
          navigate('/admin/products')
        }, 1500)
      } else {
        message.error(response?.data?.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm sản phẩm')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thêm mới sản phẩm</h1>
          <p className="text-gray-500 mt-1">Điền đầy đủ thông tin sản phẩm bên dưới</p>
        </div>
        <Link
          to="/admin/products"
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeftOutlined className="mr-2" />
          Quay lại danh sách
        </Link>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Thumbnail Upload */}
            <Form.Item
              name="thumbnail"
              label={<span className="text-gray-700 font-medium">Hình ảnh thumbnail</span>}
              rules={[{ required: true, message: 'Vui lòng tải lên ảnh thumbnail!' }]}
            >
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-4 hover:border-blue-500 transition-colors">
                <Dragger
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                  onChange={handleChangeThumbnail}
                  onPreview={onPreview}
                  fileList={fileList}
                  className="bg-transparent"
                >
                  <div className="text-center p-4">
                    <PlusSquareOutlined className="text-4xl text-gray-400" />
                    <p className="mt-2 text-gray-500">Kéo thả hoặc click để tải ảnh</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG hoặc GIF</p>
                  </div>
                </Dragger>
              </div>
            </Form.Item>

            {/* Product Image Upload */}
            <Form.Item
              name="image"
              label={<span className="text-gray-700 font-medium">Hình ảnh chi tiết</span>}
              rules={[{ required: true, message: 'Vui lòng tải lên ảnh chi tiết!' }]}
            >
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-4 hover:border-blue-500 transition-colors">
                <Dragger
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                  onChange={handleChangeImage}
                  onPreview={onPreview}
                  fileList={mutiFileList}
                  className="bg-transparent"
                >
                  <div className="text-center p-4">
                    <PlusSquareOutlined className="text-4xl text-gray-400" />
                    <p className="mt-2 text-gray-500">Kéo thả hoặc click để tải ảnh</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG hoặc GIF</p>
                  </div>
                </Dragger>
              </div>
            </Form.Item>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="md:col-span-2">
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                  <Input
                    size="large"
                    className="rounded-lg"
                    placeholder="Nhập tên sản phẩm"
                  />
                </Form.Item>
              </div>

              {/* Price Fields */}
              <Form.Item
                name="price"
                label="Giá gốc"
                rules={[{ required: true, message: 'Vui lòng nhập giá gốc!' }]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập giá gốc"
                />
              </Form.Item>

              <Form.Item
                name="salePrice"
                label="Giá khuyến mãi"
                dependencies={['price']}
                rules={[
                  { required: true, message: 'Vui lòng nhập giá khuyến mãi!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('price') >= value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Giá khuyến mãi phải nhỏ hơn giá gốc!'));
                    },
                  }),
                ]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập giá khuyến mãi"
                />
              </Form.Item>

              {/* Category and Brand */}
              <Form.Item
                name="type"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select
                  size="large"
                  placeholder="Chọn danh mục"
                  onChange={handleCategoryChange}
                  className="w-full rounded-lg"
                >
                  {optionsByCategory1.productTypes.map((type: string) => (
                    <Option key={type} value={type}>{typeDisplayNames[type]}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
              >
                <Select
                  size="large"
                  placeholder="Chọn thương hiệu"
                  className="w-full rounded-lg"
                  disabled={!selectedCategory}
                >
                  {brands.map(brand => (
                    <Option key={brand} value={brand}>{brand}</Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Specifications */}
              {['dienthoai', 'laptop', 'tablet'].includes(selectedCategory) && (
                <>
                  <Form.Item
                    name="storage"
                    label="Bộ nhớ trong"
                    rules={[{ required: true, message: 'Vui lòng chọn bộ nhớ trong!' }]}
                  >
                    <Select size="large" placeholder="Chọn bộ nhớ trong" className="w-full rounded-lg">
                      {['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'].map(storage => (
                        <Option key={storage} value={storage}>{storage}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="ram"
                    label="RAM"
                    rules={[{ required: true, message: 'Vui lòng chọn RAM!' }]}
                  >
                    <Select size="large" placeholder="Chọn RAM" className="w-full rounded-lg">
                      {['4GB', '8GB', '16GB', '32GB'].map(ram => (
                        <Option key={ram} value={ram}>{ram}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              )}

              {/* Other Fields */}
              <Form.Item
                name="battery"
                label="Dung lượng pin"
                rules={[{ required: true, message: 'Vui lòng nhập dung lượng pin!' }]}
              >
                <Input
                  size="large"
                  placeholder="Nhập dung lượng pin"
                  className="w-full rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="operatingSystem"
                label="Hệ điều hành"
                rules={[{ required: true, message: 'Vui lòng chọn hệ điều hành!' }]}
              >
                <Select size="large" placeholder="Chọn hệ điều hành" className="w-full rounded-lg">
                  {['iOS', 'Android', 'Windows', 'macOS', 'Linux'].map(os => (
                    <Option key={os} value={os}>{os}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="screenReslution"
                label="Độ phân giải màn hình"
                rules={[{ required: true, message: 'Vui lòng chọn độ phân giải!' }]}
              >
                <Select size="large" placeholder="Chọn độ phân giải" className="w-full rounded-lg">
                  {[
                    'HD (1280x720)',
                    'Full HD (1920x1080)',
                    '2K (2560x1440)',
                    '4K (3840x2160)'
                  ].map(resolution => (
                    <Option key={resolution} value={resolution}>{resolution}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="screenSize"
                label="Kích thước màn hình"
                rules={[{ required: true, message: 'Vui lòng nhập kích thước màn hình!' }]}
              >
                <Input
                  size="large"
                  placeholder="Nhập kích thước màn hình (inch)"
                  className="w-full rounded-lg"
                  suffix="inch"
                />
              </Form.Item>

              <Form.Item
                name="weight"
                label="Trọng lượng"
                rules={[{ required: true, message: 'Vui lòng nhập trọng lượng!' }]}
              >
                <Input
                  size="large"
                  placeholder="Nhập trọng lượng"
                  className="w-full rounded-lg"
                  suffix="g"
                />
              </Form.Item>

              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  min={0}
                  placeholder="Nhập số lượng"
                />
              </Form.Item>

              <div className="md:col-span-2">
                <Form.Item
                  name="description"
                  label="Mô tả sản phẩm"
                >
                  <div className="border rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={rawHTML}
                      onChange={setRawHTML}
                      className="min-h-[200px]"
                    />
                  </div>
                </Form.Item>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
              <Link
                to="/admin/products"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors flex items-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
              >
                {isSubmitting && <LoadingOutlined className="mr-2" />}
                {isSubmitting ? 'Đang thêm...' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddPro;
