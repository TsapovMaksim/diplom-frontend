export type Manufacturer = {
  id: number;
  title: string;
};

export type Category = {
  id: number;
  title: string;
  productCategories: ProductCategory[];
};

export type ProductCategory = {
  id: number;
  title: string;
};

export type CharacteristicGroup = {
  id: number;
  title: string;
};

export type Characteristic = {
  id: number;
  title: string;
  productCharacteristics: ProductCharacteristic[];
};

export type ProductCharacteristic = {
  id: number;
  value: string;
  characteristic: Characteristic;
};

export type Filter = {
  id: number;
  title: string;
  characteristic: Characteristic;
  filterValues: FilterValue[];
};

export type FilterValue = {
  id: number;
  title: string;
  filter: Filter;
  productCharacteristic: ProductCharacteristic;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  raiting: number;
  reviewsCount: number;
  category: ProductCategory;
  manufacturer: Manufacturer;
  preview: Image | null;
};

export type Image = {
  id: number;
  name: string;
  path: string;
};

export type GroupedProductCharacteristic = {
  id: number;
  title: string;
  characteristics: {
    id: number;
    productCharacteristics: { id: number; value: string }[];
    title: string;
  }[];
};

export type CatalogProduct = Pick<
  Product,
  'id' | 'price' | 'raiting' | 'short_description' | 'title'
> & {
  category: { id: number; category: { id: number } };
  reviewsCount: number;
  preview: null | Pick<Image, 'path'>;
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  basket: {
    id: number;
  };
  favorite: {
    id: number;
  };
};

export type Basket = {
  id: number;
  basketProducts: {
    id: number;
    count: number;
    product: {
      id: number;
      title: string;
      price: number;
      preview: {
        path: string;
      };
      raiting: number;
      reviewsCount: number;
      category: {
        id: number;
        category: {
          id: number;
        };
      };
    };
  }[];
};

export type Favorite = {
  id: number;
  favoriteProducts: {
    id: number;
    product: {
      id: number;
      title: string;
      price: number;
      raiting: number;
      reviewsCount: number;
      preview: {
        path: string;
      };
      category: {
        id: number;
        category: {
          id: number;
        };
      };
    };
  }[];
};

export type CatalogReview = {
  date: string;
  id: number;
  star: number;
  text: string;
  user: Pick<User, 'name' | 'surname'>;
};

export type UserWithToken = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type PaginatedResponse<T> = {
  total: number;
  page: number;
  nextPage: number | null;
  content: T[];
};
