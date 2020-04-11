import { action } from '@storybook/addon-actions';

import NumberCard from '../src/design-system/NumberCard.svelte';

export default {
  title: 'NumberCard',
  component: NumberCard,
};

export const basicUsage = () => ({
  Component: NumberCard,
  props: {value: 999, name: "Total Records"}
});
