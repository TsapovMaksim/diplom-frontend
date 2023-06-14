'use client';
import {
  useCharacteristicGroups,
  useCharacteristics,
  useProductCharacteristics,
} from '@/api/characteristicts/hooks';
import { useManufacturers } from '@/api/manufacturers/hooks';
import {
  useAddCharacteristicToProduct,
  useChangeProductPreview,
  useDeleteProductCharacteristicFromProduct,
  useDeleteProductImage,
  useGroupedProductCharacteristicsById,
  useProduct,
  useProductCharacteristicTypes,
  useUpdateProduct,
  useUploadProductImages,
} from '@/api/products/hooks';
import FormAddTovarCharacteristic from '@/features/tovars/FormAddTovarCharacteristic';
import TovarImages from '@/features/tovars/TovarImages';
import Carousel from '@/shared/ui/elements/carousel';
import getImagePath from '@/shared/utils/get-image-path';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
  message,
} from 'antd';
import Image from 'next/image';
import { useEffect } from 'react';

type Props = {
  params: { id: string; category_id: string; type_id: string };
};

type FormValue = {
  title: string;
  description: string;
  short_description: string;
  price: number;
  manufacturer: number;
};

type FormValue2 = {
  characteristicId: number;
  productCharacteristicId: number;
  characteristicGroupId: number;
};

export const revalidate = 0;

const GroupedProductChararcteristics = ({
  groupId,
  productId,
}: {
  groupId: number;
  productId: number;
}) => {
  const { data, isFetching } = useGroupedProductCharacteristicsById({
    groupId,
    id: productId,
  });
  const { mutateAsync: deleteProductCharacteristicFromProduct, isLoading } =
    useDeleteProductCharacteristicFromProduct({
      groupId: groupId,
      id: productId,
    });

  const handleDelete = async (productCharacteristicId: number) => {
    try {
      await deleteProductCharacteristicFromProduct({
        productCharacteristicId,
        productId: productId,
      });
    } catch (error) {
      message.error('Ошибка');
      console.error(error);
    }
  };

  return (
    <Spin spinning={isFetching}>
      <Space style={{ width: '100%' }} direction='vertical' size={8}>
        {data?.map(char => {
          return (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr 1fr',
                width: '100%',
                columnGap: '8px',
              }}
              key={char.id}
            >
              <Button
                size='small'
                onClick={() => {
                  const id = char.productCharacteristics[0]?.id;
                  if (id) {
                    handleDelete(id);
                  }
                }}
                loading={isLoading}
                danger
                icon={<DeleteOutlined />}
              />
              <div style={{ borderBottom: '1px solid black' }}>
                {char.title}
              </div>
              <div>{char.productCharacteristics[0]?.value}</div>
            </div>
          );
        })}
      </Space>
    </Spin>
  );
};

const AdminTovarPage = (props: Props) => {
  const [formProduct] = Form.useForm<FormValue>();
  const [form] = Form.useForm<FormValue2>();
  const id = Number(props.params.id);
  const productCategoryId = Number(props.params.type_id);
  const characteristicId = Form.useWatch('characteristicId', form);
  const characteristicGroupId = Form.useWatch('characteristicGroupId', form);
  const { data: productCharacteristicTypes } = useProductCharacteristicTypes({
    id,
  });

  const {
    data: characteristicGroup,
    isFetching: isCharacteristicGroupFetching,
  } = useCharacteristicGroups({ categoryId: productCategoryId });
  const { data: characteristics, isFetching: isCharacteristicsFetching } =
    useCharacteristics({
      groupId: characteristicGroupId,
      enabled: !!characteristicGroupId,
    });
  const {
    data: productCharacteristics,
    isFetching: isProductCharacteristicsFetching,
  } = useProductCharacteristics({
    characteristicId,
    enabled: !!characteristicId,
  });
  const {
    mutateAsync: addCharacteristicToProduct,
    isLoading: isAddToProductLoading,
  } = useAddCharacteristicToProduct({ revalidateGroups: true });

  const { data: manufacturers, isFetching: isManufacturersFetching } =
    useManufacturers({ productCategoryId });
  const { data: product, isFetching } = useProduct({ id });
  const { mutateAsync: updateProduct, isLoading: isUpdateLoading } =
    useUpdateProduct();

  const handleAddFinish = async (values: FormValue2) => {
    const characteristic = productCharacteristics?.find(
      item => item.id === values.productCharacteristicId
    );
    if (!characteristic) return;

    try {
      await addCharacteristicToProduct({ id, body: [characteristic] });
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };

  const handleUpdateFinish = async (values: FormValue) => {
    try {
      await updateProduct({ id, patch: values });
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };

  useEffect(() => {
    if (!product || isFetching) return;
    formProduct.setFieldsValue({
      description: product.description,
      short_description: product.short_description,
      price: product.price,
      title: product.title,
      manufacturer: product.manufacturer?.id,
    });
  }, [formProduct, product, isFetching]);

  const { mutateAsync: changeProductPreview } = useChangeProductPreview();
  const {
    mutateAsync: uploadProductImages,
    isLoading: isUploadProductImagesLoading,
  } = useUploadProductImages();
  const {
    mutateAsync: deleteProductImage,
    isLoading: isDeleteProductImageLoading,
  } = useDeleteProductImage();

  const handleDelete = async (imageId: number) => {
    try {
      await deleteProductImage({ productId: id, imageId });
    } catch (error) {
      console.error(error);
      message.error('Ошибка');
    }
  };

  return (
    <div style={{ paddingBottom: 50 }}>
      <Spin spinning={isFetching}>
        <Space
          style={{
            position: 'fixed',
            bottom: 10,
            zIndex: 1,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Button
            loading={isUpdateLoading}
            onClick={formProduct.submit}
            type='primary'
          >
            Сохранить
          </Button>
        </Space>
        <Typography.Title level={5}>Изображения</Typography.Title>
        <TovarImages productId={id} />
        <div style={{ margin: '12px 0' }}>
          <Upload
            disabled={isUploadProductImagesLoading}
            accept='image/png,image/jpeg,image/jpg, image/webp'
            directory={false}
            beforeUpload={file => {
              uploadProductImages({ productId: id, body: { files: [file] } });
              return false;
            }}
            fileList={[]}
          >
            <Button
              loading={isUploadProductImagesLoading}
              icon={<UploadOutlined />}
            >
              Загрузить
            </Button>
          </Upload>
        </div>
        <Form
          onFinish={handleUpdateFinish}
          form={formProduct}
          layout='vertical'
        >
          <Form.Item rules={[{ required: true }]} name='title' label='Название'>
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name='manufacturer'
            label='Производитель'
          >
            <Select
              loading={isManufacturersFetching}
              options={manufacturers?.map(item => ({
                value: item.id,
                label: item.title,
              }))}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name='description'
            label='Описание'
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name='short_description'
            label='Короткое описание'
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name='price' label='Цена'>
            <InputNumber min={0} />
          </Form.Item>
        </Form>

        <Typography.Title level={5}>Превью</Typography.Title>
        <Image
          style={{ minWidth: 160, minHeight: 160 }}
          width={160}
          height={160}
          alt='preview'
          src={getImagePath(product?.preview?.path)}
        />
        <div style={{ marginTop: 12 }}>
          <Upload
            onChange={info => {
              console.log('file', info.file.originFileObj);
            }}
            fileList={[]}
            beforeUpload={file => {
              changeProductPreview({ productId: id, body: { file } });
              console.log(' before upload file', file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </div>
        <Typography.Title level={4}>Добавление характеристики</Typography.Title>

        <Form onFinish={handleAddFinish} form={form} layout='vertical'>
          <Form.Item
            label='Группа характеристики'
            name='characteristicGroupId'
            rules={[{ required: true }]}
          >
            <Select
              onChange={() => {
                form.setFieldsValue({
                  characteristicId: undefined,
                  productCharacteristicId: undefined,
                });
              }}
              loading={isCharacteristicGroupFetching}
              options={characteristicGroup?.map(item => ({
                label: item.title,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label='Характеристика'
            name='characteristicId'
            rules={[{ required: true }]}
          >
            <Select
              onChange={() => {
                form.setFieldsValue({ productCharacteristicId: undefined });
              }}
              loading={isCharacteristicsFetching}
              options={characteristics?.map(item => ({
                label: item.title,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label='Значение характеристики'
            name='productCharacteristicId'
            rules={[{ required: true }]}
          >
            <Select
              loading={isProductCharacteristicsFetching}
              options={productCharacteristics?.map(item => ({
                label: item.value,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              loading={isAddToProductLoading}
              type='primary'
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
        <Typography.Title level={4}>Характеристики</Typography.Title>
        <Space style={{ width: '100%' }} direction='vertical' size={16}>
          {productCharacteristicTypes?.map(group => {
            return (
              <Collapse key={group.id}>
                <Collapse.Panel key={'1'} header={group.title}>
                  <Space style={{ width: '100%' }} direction='vertical'>
                    <GroupedProductChararcteristics
                      groupId={group.id}
                      productId={id}
                    />
                  </Space>
                  <FormAddTovarCharacteristic
                    characteristicGroupId={group.id}
                    tovarId={id}
                  />
                </Collapse.Panel>
              </Collapse>
            );
          })}
        </Space>
      </Spin>
    </div>
  );
};

export default AdminTovarPage;
