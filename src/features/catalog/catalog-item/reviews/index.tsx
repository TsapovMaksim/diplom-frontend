import { useReviews } from '@/api/reviews/hooks';
import ModalAddReview from '@/features/review/ModalAddReview';
import { useAuth } from '@/shared/hooks/use-auth';
import useModal from '@/shared/hooks/use-modal';
import {
  Avatar,
  Empty,
  Spin,
  Result,
  Rate,
  Space,
  Typography,
  Button,
} from 'antd';
import React from 'react';

type Props = {
  productId: number;
};

const Comment = ({
  author,
  text,
  date,
  star,
}: {
  author: string;
  text: string;
  date: string;
  star: number;
}) => {
  return (
    <Space
      style={{
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        border: '1px solid rgb(217, 217, 217)'
      }}
      direction='vertical'
    >
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Typography.Title style={{ marginBottom: 0 }} level={5}>
          {author}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString()}
        </Typography.Text>
      </Space>
      <Rate
        disabled
        count={5}
        value={star}
        style={{ fontSize: 16 }}
        allowClear={false}
      />
      <Typography.Text style={{ whiteSpace: 'pre-line' }}>
        {text}
      </Typography.Text>
    </Space>
  );
};

const Reviews = (props: Props) => {
  const { isAuthenticated } = useAuth();
  const { data, isFetching } = useReviews({ productId: props.productId });
  const modal = useModal();

  if (isFetching) {
    return <Spin spinning />;
  }

  if (!data) {
    return <Result status={'error'} title={'Не удалось получить отзывы'} />;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <div style={{ marginBottom: 12 }}>
            <Button onClick={modal.open} type='primary'>
              Оставить отзыв
            </Button>
          </div>
          <ModalAddReview
            productId={props.productId}
            onOk={modal.close}
            onCancel={modal.close}
            open={modal.visible}
          />
        </>
      ) : (
        <>
          <Result
            status='warning'
            title='Только авторизованные пользователи могут оставлять отзывы'
          />
        </>
      )}

      {data.length ? (
        <Space size={16} style={{ width: '100%' }} direction='vertical'>
          {data.map(item => (
            <Comment
              key={item.id}
              date={item.date}
              author={`${item.user.name} ${item.user.surname}`}
              text={item.text}
              star={item.star}
            />
          ))}
        </Space>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Reviews;
