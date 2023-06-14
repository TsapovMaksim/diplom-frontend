'use client';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import {
  Carousel as AntdCarousel,
  CarouselProps as AntdCarouselProps,
} from 'antd';
import './style.scss';

type CarouselProps = AntdCarouselProps;

const Carousel = (props: CarouselProps) => {
  return (
    <AntdCarousel
      dots={false}
      arrows
      nextArrow={<RightCircleOutlined />}
      prevArrow={<LeftCircleOutlined />}
      swipeToSlide
      draggable
      slidesToScroll={1}
      {...props}
    />
  );
};

export default Carousel;
