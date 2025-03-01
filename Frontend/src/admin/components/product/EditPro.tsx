import { ProductType } from '@/type/Product'
import { ArrowLeftOutlined, LoadingOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, message, Select, UploadFile } from 'antd'
import { UploadProps } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { RcFile } from 'antd/lib/upload'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { upload } from '../../../api/images'
import { editPro, listOnePro } from '../../../api/products'

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
  nhathongminh: ['Smart Home Hub', 'Smart Light', 'Smart Lock'],
  phukien: ['Charger', 'Headphones', 'Cables'],
  pc_manhinh: ['Monitor', 'PC Parts', 'Desktop'],
  tivi: ['Samsung TV', 'LG TV', 'Sony TV'],
  hangcu: ['Used Phone', 'Used Laptop', 'Used Tablet']
}

const EditPro = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()

  const [pro, setPro] = useState<ProductType>()
  const [rawHTML, setRawHTML] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [mutiFileList, setMutiFileList] = useState<UploadFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [brands, setBrands] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleCategoryChange = (value: string) => {
    if (pro && pro.type === value) {
      setBrands(optionsByCategory[pro.type] || [])
    } else {
      setBrands(optionsByCategory[value] || [])
    }
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

  useEffect(() => {
    const getPro = async (id: number) => {
      try {
        setIsLoading(true)
        const { data } = await listOnePro(id)
        setPro(data?.data)
        form.setFieldsValue(data?.data)
        setRawHTML(data?.data?.description)

        if (data?.data?.type) {
          handleCategoryChange(data?.data?.type)
        }

        if (data?.data?.thumbnail) {
          setFileList([{
            uid: '-1',
            name: 'thumbnail.png',
            status: 'done',
            url: data?.data?.thumbnail
          }])
        }

        if (data?.data?.image) {
          setMutiFileList([{
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: data?.data?.image
          }])
        }
      } catch (error) {
        message.error('Không thể tải thông tin sản phẩm')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      getPro(Number(id))
    }
  }, [id])

  const onFinish = async (values: any) => {
    try {
      setIsSubmitting(true)
      let thumbnailUrl = pro?.thumbnail
      let imageUrl = pro?.image

      if (fileList[0]?.originFileObj) {
        thumbnailUrl = await upload(fileList[0].originFileObj)
      }

      if (mutiFileList[0]?.originFileObj) {
        imageUrl = await upload(mutiFileList[0].originFileObj)
      }

      const updateData: any = {
        id: Number(id),
        name: values.name,
        type: values.type,
        brand: values.brand,
        description: rawHTML || pro?.description,
        battery: values.battery,
        cpu: values.cpu,
        operatingSystem: values.operatingSystem,
        ram: values.ram,
        screenReslution: values.screenReslution,
        screenSize: values.screenSize,
        storage: values.storage,
        weight: values.weight,
        price: values.price,
        salePrice: values.salePrice,
        quantity: values.quantity,
        status: values.status || pro?.status,
        image: imageUrl,
        thumbnail: thumbnailUrl,
        productView: values.productView || pro?.productView
      }

      await editPro(updateData)
      message.success('Cập nhật sản phẩm thành công')
      navigate('/admin/products')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingOutlined className="text-4xl text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cập nhật sản phẩm</h1>
          <p className="text-gray-500 mt-1">Chỉnh sửa thông tin sản phẩm</p>
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
        initialValues={pro}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Form.Item
              label={<span className="text-gray-700 font-medium">Hình ảnh thumbnail</span>}
              className="mb-6"
            >
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-4 hover:border-blue-500 transition-colors">
                <Dragger
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleChangeThumbnail}
                  onPreview={onPreview}
                  fileList={fileList}
                  className="bg-transparent"
                >
                  <div className="text-center p-4">
                    <PlusSquareOutlined className="text-4xl text-gray-400" />
                    <p className="mt-2 text-gray-500">Thay đổi ảnh thumbnail</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG hoặc GIF</p>
                  </div>
                </Dragger>
              </div>
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Hình ảnh chi tiết</span>}
            >
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-4 hover:border-blue-500 transition-colors">
                <Dragger
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleChangeImage}
                  onPreview={onPreview}
                  fileList={mutiFileList}
                  className="bg-transparent"
                >
                  <div className="text-center p-4">
                    <PlusSquareOutlined className="text-4xl text-gray-400" />
                    <p className="mt-2 text-gray-500">Thay đổi ảnh chi tiết</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG hoặc GIF</p>
                  </div>
                </Dragger>
              </div>
            </Form.Item>
          </div>

          {/* Right Column - Form Fields */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="md:col-span-2">
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                  <Input size="large" className="rounded-lg" disabled />
                </Form.Item>
              </div>

              {/* Prices */}
              <Form.Item
                name="price"
                label="Giá gốc"
                rules={[{ required: true, message: 'Vui lòng nhập giá gốc!' }]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  formatter={value => `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
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
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Giá khuyến mãi phải nhỏ hơn giá gốc!'))
                    }
                  })
                ]}
              >
                <InputNumber
                  className="w-full rounded-lg"
                  size="large"
                  formatter={value => `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              {/* Category & Brand */}
              <Form.Item
                name="type"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select
                  size="large"
                  disabled
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
                  disabled
                  className="w-full rounded-lg"
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
                    <Select
                      size="large"
                      className="w-full rounded-lg"
                      disabled
                    >
                      {['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'].map(storage => (
                        <Option key={storage} value={storage}>{storage}</Option>))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="ram"
                    label="RAM"
                    rules={[{ required: true, message: 'Vui lòng chọn RAM!' }]}
                  >
                    <Select
                      size="large"
                      className="w-full rounded-lg"
                      disabled
                    >
                      {['4GB', '8GB', '16GB', '32GB', '64GB'].map(ram => (
                        <Option key={ram} value={ram}>{ram}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="cpu"
                    label="Chipset"
                    rules={[{ required: true, message: 'Vui lòng nhập chipset!' }]}
                  >
                    <Input size="large" disabled className="rounded-lg" />
                  </Form.Item>
                </>
              )}

              {/* Other Specifications */}
              <Form.Item
                name="battery"
                label="Dung lượng pin"
                rules={[{ required: true, message: 'Vui lòng nhập dung lượng pin!' }]}
              >
                <Input size="large" disabled className="rounded-lg" />
              </Form.Item>

              <Form.Item
                name="operatingSystem"
                label="Hệ điều hành"
                rules={[{ required: true, message: 'Vui lòng chọn hệ điều hành!' }]}
              >
                <Select
                  size="large"
                  className="w-full rounded-lg"
                  disabled
                >
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
                <Select
                  size="large"
                  className="w-full rounded-lg"
                  disabled
                >
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
                <Input size="large" disabled className="rounded-lg" suffix="inch" />
              </Form.Item>

              <Form.Item
                name="weight"
                label="Trọng lượng"
                rules={[{ required: true, message: 'Vui lòng nhập trọng lượng!' }]}
              >
                <Input size="large" disabled className="rounded-lg" suffix="g" />
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
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>

              {/* Description */}
              <div className="md:col-span-2">
                <Form.Item
                  name="description"
                  label="Mô tả sản phẩm"
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                >
                  <div className="border rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={rawHTML}
                      onChange={setRawHTML}
                      className="min-h-[200px]"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </Form.Item>
              </div>
            </div>
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
                className={`px - 6 py - 2 bg - blue - 600 text - white rounded - lg transition - colors flex items - center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
              >
                {isSubmitting && <LoadingOutlined className="mr-2" />}
                {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditPro;

