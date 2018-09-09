import types from '~/domain/types';

const initData = {
  result: [],
};

export default (state = initData, { type, payload }) => {
  switch (type) {
    case types.city.searchSuccess:
      return {
        ...state,
        result: payload.cities,
      };
    default:
      return state;
  }
};
